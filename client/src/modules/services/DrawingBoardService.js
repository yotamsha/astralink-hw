
class DrawingBoardService {

  constructor(stage) {
    console.log("initializing service");

    this._layer = new Konva.Layer();
    stage.add(this._layer);
    this._canvas = document.createElement('canvas');
    this._canvas.width = stage.width();
    this._canvas.height = stage.height();
    var context = this._canvas.getContext('2d');
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    this._context = context;
    var image = new Konva.Image({
      image: this._canvas,
      x: 0,
      y: 0
    });
    this._layer.add(image);
    stage.draw();

    this.bindEvents(stage)
  }
  init(stage) {

  }
  bindEvents(stage){
    let self = this;
    stage.on('contentMousedown.proto contentTouchstart', function () {
      self.onMouseDown(stage);
    });
    stage.on('contentMousemove.proto contentTouchmove', function () {
      self.onMouseMove(stage);
    });
    stage.on('contentMouseup.proto contentTouchend', function () {
      self.onMouseUp(stage);
    });
  }

  onMouseDown(stage) {
    console.log("mousedown: ", stage.getPointerPosition());
    this._lastPointerPosition = stage.getPointerPosition();
    this._isPaint = true;
  }

  onMouseUp(stage) {
    console.log("onMouseUp: ", stage.getPointerPosition());
    this._isPaint = false;
    this.dataURL = this._canvas.toDataURL();

  }

  onMouseMove(stage) {
    // console.log("onMouseMove: ", stage.getPointerPosition());
    if (!this._isPaint) {
      return;
    }
    this._context.globalCompositeOperation = 'source-over';

    this._context.beginPath();
    let localPos = {
      x: this._lastPointerPosition.x,
      y: this._lastPointerPosition.y
    };
    this._context.moveTo(localPos.x, localPos.y);
    let pos = stage.getPointerPosition();
    localPos = {
      x: pos.x,
      y: pos.y
    };
    this._context.lineTo(localPos.x, localPos.y);
    this._context.closePath();
    this._context.stroke();
    this._lastPointerPosition = pos;
    this._layer.draw();
  }

  getDrawingData() {
    return {
      image: this._canvas.toDataURL()
    }
  }

}

export default DrawingBoardService;
