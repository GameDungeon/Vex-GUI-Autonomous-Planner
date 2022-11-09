import Konva from "konva";
import { stage, sceneHeight, sceneWidth } from "./field_canvas";
import { tile_size, tiles, grey_squares} from "./field_properties";
//import C2S from "canvas2svg";

let blue = '#0050A1';
let red =  '#CD272F';

let checkerboard = new Konva.Layer();
checkerboard.listening(false);

export let spawns = new Konva.Layer();
spawns.listening(false);

let overlay = new Konva.Layer();
overlay.listening(false);

//let svgout = checkerboard.canvas.context._context = new C2S(1000, 1000);

function createSpawnZone(x: number, y: number, width: number, height: number, color: string) {
    spawns.add(new Konva.Rect({
        x: tile_size * x,
        y: tile_size * y,
        width: tile_size * width,
        height: tile_size * height,
        fill: color,
        opacity: 0.5
    }));
}

function createTape(points: number[], color: string = '#E9E9E9', thickness = 3) {
    overlay.add(new Konva.Line({
        points: points.map(x => x * tile_size),
        stroke: color,
        strokeWidth: thickness,
        lineJoin: 'round'
    }));
}

function createGoal(x, y, color) {
    let rungs = 8;
    let filled = 4;
    let cross_bar_width = 5;
    for(let i = filled; i < rungs + 1; i++){
        let goal_ring = new Konva.Circle({
            x: x * tile_size,
            y: y! * tile_size,
            radius: 0.3277 * tile_size / rungs * i,
            stroke: color,
            fill: i === filled ? color : undefined,
            strokeWidth: 3,
        });
    
        overlay.add(goal_ring);
    }

    overlay.add(new Konva.Line({
        points: [x * tile_size, 
                 y * tile_size + 0.3277 * tile_size, 
                 x * tile_size, 
                 y * tile_size - 0.3277 * tile_size],
        stroke: color,
        strokeWidth: cross_bar_width,
    }));

    overlay.add(new Konva.Line({
        points: [x * tile_size + 0.3277 * tile_size, 
                 y * tile_size, 
                 x * tile_size - 0.3277 * tile_size, 
                 y * tile_size],
        stroke: color,
        strokeWidth: cross_bar_width,
    }));

}

function createRoller(x, y, rotation = false, flip = false) {
    let w: number = 0.1;
    let h: number = 0.5;

    if (rotation) {
        [w, h] = [h, w]

        if(flip) {
            y -= h; 
        }
    } else if(flip) {
        x -= w; 
    }

    let roller = new Konva.Rect({
        x: tile_size * x,
        y: tile_size * y,
        width: tile_size * w,
        height: tile_size * h,
        fill: red,
        stroke: 'black',
        strokeWidth: 2,
    });

    w =  rotation ? w : w / 2
    h = !rotation ? h : h / 2

    let other_roller = new Konva.Rect({
        x: tile_size * x,
        y: tile_size * y,
        width: tile_size * w,
        height: tile_size * h,
        fill: blue,
    });

    overlay.add(roller);
    overlay.add(other_roller);
}

checkerboard.add(new Konva.Rect({
    x: 0,
    y: 0,
    width: sceneHeight,
    height: sceneWidth,
    fill: '#8D8D8D',
    stroke: 'black',
    strokeWidth: 1,
}));

for(let y = 0; y < tiles; y++) {
    let offset = y % 2 ? 0 : 1;
    for(let x = 0; x < grey_squares; x++) {
        checkerboard.add(new Konva.Rect({
            x: tile_size * x * 2 + tile_size * offset,
            y: tile_size * y,
            width: tile_size,
            height: tile_size,
            fill: '#808080',
            stroke: 'black',
            strokeWidth: 1,
        }));
    }
}

//Spawns
createSpawnZone(0, 1, 1, 3, 'red');
createTape([0, 4, 1, 4]);
createTape([0, 1, 0.5, 1]);

createSpawnZone(2, 5, 2, 1, 'red');
createTape([2, 5, 2, 6]);
createTape([4, 5.5, 4, 6]);

createSpawnZone(2, 0, 2, 1, 'blue');
createTape([2, 0, 2, 0.5]);
createTape([4, 0, 4, 1]);

createSpawnZone(5, 2, 1, 3, 'blue');
createTape([5, 2, 6, 2]);
createTape([5.5, 5, 6, 5]);

// Center Line
createTape([0, 0.1, 6-0.1, 6]);
createTape([0.1, 0, 6, 6-0.1]);

//Blockers
createTape([
    1, 4, 2, 4,
    2, 4, 2, 5,
], red, 8);

createTape([
    4, 1, 4, 2,
    4, 2, 5, 2,
], blue, 8);


//Goals
createTape([0, 4.5, 1.5, 6], '#EEEEEE', 10);
createGoal(0.75, 5.25, blue);

createTape([4.5, 0, 6, 1.5], '#EEEEEE', 10);
createGoal(5.25, 0.75, red);

//Rollers
createRoller(0, 1.015);
createRoller(1, 0, true);

createRoller(6, 4.485, false, true);
createRoller(4.5, 6, true, true);

stage.add(checkerboard);
stage.add(spawns);
stage.add(overlay);