let _layer, _context, _lastPointerPosition, _isPaint, _canvas;

class DrawingBoardService {

  constructor(stage) {
    console.log("initializing service");

    _layer = new Konva.Layer();
    stage.add(_layer);
    _canvas = document.createElement('canvas');
    _canvas.width = stage.width();
    _canvas.height = stage.height();
    var context = _canvas.getContext('2d');
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    _context = context;
    var image = new Konva.Image({
      image: _canvas,
      x: 0,
      y: 0
    });
    _layer.add(image);
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
    _lastPointerPosition = stage.getPointerPosition();
    _isPaint = true;
  }

  onMouseUp(stage) {
    console.log("onMouseUp: ", stage.getPointerPosition());
    _isPaint = false;
    var dataURL = _canvas.toDataURL();
    // console.log("dataURL: ", dataURL);

  }

  onMouseMove(stage) {
    // console.log("onMouseMove: ", stage.getPointerPosition());
    if (!_isPaint) {
      return;
    }
    _context.globalCompositeOperation = 'source-over';

    _context.beginPath();
    let localPos = {
      x: _lastPointerPosition.x,
      y: _lastPointerPosition.y
    };
    _context.moveTo(localPos.x, localPos.y);
    let pos = stage.getPointerPosition();
    localPos = {
      x: pos.x,
      y: pos.y
    };
    _context.lineTo(localPos.x, localPos.y);
    _context.closePath();
    _context.stroke();
    _lastPointerPosition = pos;
    _layer.draw();
  }


}

export default DrawingBoardService;
