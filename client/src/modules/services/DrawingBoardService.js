class DrawingBoardService {

  constructor(stage, paintProps) {
    console.log("initializing service");
    this._stage = stage;
    this.fitStageIntoParentContainer(this._stage);
    this._layer = new Konva.Layer();
    this._stage.add(this._layer);
    this._canvas = document.createElement('canvas');
    this._originalWidth = this._stage.width();
    this._originalHeight = this._stage.height();
    this._canvas.width = this._stage.width();
    this._canvas.height = this._stage.height();
    var context = this._canvas.getContext('2d');
    context.lineJoin = "round";
    context.strokeStyle = paintProps.color;
    context.lineWidth = paintProps.lineWidth;
    this._context = context;
    this._image = new Konva.Image({
      image: this._canvas,
      x: 0,
      y: 0
    });
    this._layer.add(this._image);
    this._stage.draw();

    this.bindEvents(this._stage);
    // adapt the stage on any window resize
    window.addEventListener('resize', () => {
      this.fitStageIntoParentContainer(this._stage, this._originalWidth, this._originalHeight );
    });
  }

  bindEvents(stage) {
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

  updatePaintProps(newPaintProps) {
    if (newPaintProps.color) {
      this._context.strokeStyle = newPaintProps.color;
    }
    if (newPaintProps.lineWidth) {
      this._context.lineWidth = newPaintProps.lineWidth;
    }
  }


  fitStageIntoParentContainer(stage, stageWidth, stageHeight) {
    var container = document.querySelector('.drawing-board');
    if (!container){
      return;
    }

    // now we need to fit stage into parent
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;
    // to do this we need to scale the stage
/*    if (!stageWidth){
      stageWidth = containerWidth - 50;
      stageHeight = containerHeight / 2;
      stage.width(stageWidth );
      stage.height(stageHeight);
    } else {
      var scale = containerWidth / stageWidth;
      stage.width(stageWidth * scale);
      stage.height(stageHeight * scale);
      stage.scale({ x: scale, y: scale });
    }*/
    stageWidth = containerWidth - 50;
    stageHeight = containerHeight / 2;
    stage.width(stageWidth );
    stage.height(stageHeight);
    console.log("stage.width: ",stage.width());
    console.log("stage.height(): ", stage.height());
    //console.log("scale: ", scale);

    // this._layer.draw();
    stage.draw();
  }


}

export default DrawingBoardService;
