class DrawingBoardService {

  constructor(stage, paintProps) {
    console.log("initializing service");
    this._stage = stage;
    this.fitStageIntoParentContainer(this._stage);
    this._layer = new Konva.Layer();
    this._stage.add(this._layer);
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._stage.width();
    this._canvas.height = this._stage.height();
    var context = this._canvas.getContext('2d');
    this._context = context;
    this._context.lineJoin = "round";
    this.updatePaintProps(paintProps);
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
      this.fitStageIntoParentContainer(this._stage);
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
    this._lastPointerPosition = stage.getPointerPosition();
    this._isPaint = true;
    if (!this._startTime){
      this._startTime = new Date();
    }
  }

  onMouseUp(stage) {
    this._isPaint = false;
    this.dataURL = this._canvas.toDataURL();

  }

  onMouseMove(stage) {
    if (!this._isPaint) {
      return;
    }

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

  stopDrawingTime() {
    if (!this._startTime){
      this._totalDrawingTime = 0;
    } else {
      this._totalDrawingTime = (new Date().getTime() - this._startTime.getTime()) / 1000;
    }
  }

  getDrawingData() {
    return {
      durationInSecs: this._totalDrawingTime,
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
    if (newPaintProps.mode){
      if (newPaintProps.mode === 'brush') {
        this._context.globalCompositeOperation = 'source-over';
      }
      if (newPaintProps.mode === 'eraser') {
        this._context.globalCompositeOperation = 'destination-out';
      }
    }
  }


  fitStageIntoParentContainer(stage) {
    var container = document.querySelector('.drawing-board');
    if (!container){
      return;
    }
    // now we need to fit stage into parent
    let containerWidth = container.offsetWidth;
    // to do this we need to scale the stage
    let stageWidth = containerWidth;
    let stageHeight = (containerWidth) *0.75;
    //let scale = stageWidth / stage.width();
    stage.width(stageWidth);
    stage.height(stageHeight);

    //stage.scale({ x: scale, y: scale });

    stage.draw();
  }


}

export default DrawingBoardService;
