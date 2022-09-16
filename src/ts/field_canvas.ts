import Konva from "konva";

function fitStageIntoParentContainer() {
  var container = document.querySelector('#feild-container')! as HTMLElement;

  var containerWidth = container.offsetWidth;
  var scale = containerWidth / sceneWidth;

  stage.width(sceneWidth * scale);
  stage.height(sceneHeight * scale);
  stage.scale({ x: scale, y: scale });
}

var sceneWidth = 1000;
var sceneHeight = 1000;

export var stage = new Konva.Stage({
  container: 'feild',
  width: sceneWidth,
  height: sceneHeight,
});

export var layer = new Konva.Layer();
export var imagelayer = new Konva.Layer();
export var pointslayer = new Konva.Layer();

export var line = new Konva.Line({
  points: [],
  stroke: 'red',
  strokeWidth: 5,
  lineCap: 'round',
  lineJoin: 'round',
});

var imageObj = new Image();
imageObj.onload = function () {
  var feild = new Konva.Image({
    x: 0,
    y: 0,
    image: imageObj,
    width: sceneWidth,
    height: sceneHeight,
  });

  // add the shape to the layer
  imagelayer.add(feild);
};
imageObj.src = '/assets/spinup_feild.png';

var container = stage.container();

layer.add(line);
stage.add(imagelayer);
stage.add(layer);
stage.add(pointslayer);

fitStageIntoParentContainer();

window.addEventListener('resize', fitStageIntoParentContainer);