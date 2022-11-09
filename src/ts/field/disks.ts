import Konva from "konva";
import { stage } from "./field_canvas";
import { tile_size } from "./field_properties";

import { milimeters, pixels, convertToUnit } from "../units";

export let disks = new Konva.Layer();

function createDisk(x, y: undefined | number = undefined, three_stack: boolean = false) {
    if(y == undefined) {
        y = x;
    }

    let disk_radius = convertToUnit(milimeters, pixels, 140) / 2;
    let outer_thickness = convertToUnit(milimeters, pixels, 25) / 2;

    let color = three_stack ? '#CD272F' : '#FDCF00'
    let circle = new Konva.Circle({
        x: x * tile_size,
        y: y! * tile_size,
        radius: disk_radius,
        fill: color,
        stroke: 'black',
        strokeWidth: 1,
    });

    let inner = new Konva.Circle({
        x: x * tile_size,
        y: y! * tile_size,
        radius: disk_radius - outer_thickness,
        stroke: 'black',
        opacity: 0.5,
        strokeWidth: 1,
    });

    disks.add(circle);
    disks.add(inner);
}

// Center Top
createDisk(0.5);
createDisk(1);
createDisk(1.5, undefined, true);
createDisk(2);
createDisk(2.5);

// Center Bottom
createDisk(5.5);
createDisk(5);
createDisk(4.5, undefined, true);
createDisk(4);
createDisk(3.5);

// Red Side Row
createDisk(1.5, 2.5, true);
createDisk(2.5, 3.5);
createDisk(3, 4);
createDisk(3.5, 4.5);

//Blue Side Row
createDisk(4.5, 3.5, true);
createDisk(3.5, 2.5);
createDisk(3.0, 2.0);
createDisk(2.5, 1.5);

//Red Side Goal
// - Top
createDisk(1.11, 3.86);
createDisk(1.50, 3.86);
createDisk(1.89, 3.86);
// - Side
createDisk(2.14, 4.11);
createDisk(2.14, 4.50);
createDisk(2.14, 4.89);

//Blue Side Goal
// - Side
createDisk(3.86, 1.11);
createDisk(3.86, 1.5);
createDisk(3.86, 1.89);
// - Bottom
createDisk(4.11, 2.14);
createDisk(4.50, 2.14);
createDisk(4.89, 2.14);

stage.add(disks);