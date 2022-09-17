import Konva from "konva";

function fitStageIntoParentContainer() {
  var container = document.querySelector('#field-container')! as HTMLElement;

  var containerWidth = container.offsetWidth;
  var scale = containerWidth / sceneWidth;

  stage.width(sceneWidth * scale);
  stage.height(sceneHeight * scale);
  stage.scale({ x: scale, y: scale });
}

const sceneWidth = 1000;
const sceneHeight = 1000;

export const feildBounds = [];

export var stage = new Konva.Stage({
  container: 'field',
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
  var field = new Konva.Image({
    x: 0,
    y: 0,
    image: imageObj,
    width: sceneWidth,
    height: sceneHeight,
  });

  // add the shape to the layer
  imagelayer.add(field);
};
imageObj.src = '/assets/spinup_field.png';

var container = stage.container();

imagelayer.listening(false);

layer.add(line);
stage.add(imagelayer);
stage.add(layer);
stage.add(pointslayer);

fitStageIntoParentContainer();

window.addEventListener('resize', fitStageIntoParentContainer);