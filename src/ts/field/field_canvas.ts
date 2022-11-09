import Konva from "konva";

export const sceneWidth = 1000;
export const sceneHeight = 1000;

export let stage = new Konva.Stage({
  container: 'field',
  width: sceneWidth,
  height: sceneHeight,
});

function fitStageIntoParentContainer() {
  var container = document.querySelector('#field-container')! as HTMLElement;

  var containerWidth = container.offsetWidth;
  var scale = containerWidth / sceneWidth;

  stage.width(sceneWidth * scale);
  stage.height(sceneHeight * scale);
  stage.scale({ x: scale, y: scale });
}

var container = stage.container();

fitStageIntoParentContainer();

window.addEventListener('resize', fitStageIntoParentContainer);