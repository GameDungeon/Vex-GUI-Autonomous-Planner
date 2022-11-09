import Konva from "konva";
import { stage } from "./field_canvas";

export var layer = new Konva.Layer();
export var pointslayer = new Konva.Layer();

export var line = new Konva.Line({
    points: [],
    stroke: 'red',
    strokeWidth: 5,
    lineCap: 'round',
    lineJoin: 'round',
  });

layer.add(line);

stage.add(layer);
stage.add(pointslayer);
