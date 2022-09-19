import { command } from './command';
import Konva from "konva";
import * as Field from "./field_canvas";
import * as Units from "./units";
import { map_range } from "./utils";

let unit_dropdown = <HTMLInputElement>document.getElementById("units")!;
let point_settings = <HTMLElement>document.getElementById("point-settings")!;
let command_list = <HTMLElement>document.getElementById("commands")!;
let add_button = <HTMLInputElement>document.getElementById("add-button")!;
let x_value = <HTMLInputElement>document.getElementById("x-value")!;
let y_value = <HTMLInputElement>document.getElementById("y-value")!;

let commands_change: boolean = true;

const cord_val = new RegExp('^\\d+.?\\d*\\s?(' + 
    Object.keys(Units.abv_map).concat(Object.keys(Units.unit_map)).join('|') + ')?$'); 
const cord_split = /(^[\d.]*)\s?(.*)/

export let selected_point: linePoint | null = null;

export class linePoint {
    index: number
    shape: Konva.Circle
    commands: command[]
    x: number
    y: number
    display_x: number
    display_y: number
    constructor(shape, index) {
        this.commands = [];
        this.index = index;
        this.shape = shape;
        this.bounds();
        this.update_points();
        this.select();
    }

    drag() {
        this.bounds();
        this.update_points();
    }

    bounds() {
        this.update_postion();
        this.shape.x(Math.min(Math.max(Field.fieldBounds[0], this.x), Field.fieldBounds[1]));
        this.shape.y(Math.min(Math.max(Field.fieldBounds[0], this.y), Field.fieldBounds[1]));
        this.update_postion();
    }

    update_postion() {
        this.x = this.shape.getAttr("x");
        this.y = this.shape.getAttr("y");

        this.display_x = map_range(this.x, Field.fieldBounds[0], Field.fieldBounds[1], 0, 1008);
        this.display_y = map_range(this.y, Field.fieldBounds[0], Field.fieldBounds[1], 0, 1008);
    }

    update_points() {
        if (this === selected_point)
        {
            update_inspector();
        }

        let linepoints = Field.line.points();
        linepoints[this.index*2] = this.x;
        linepoints[this.index*2+1] = this.y;
        Field.line.points(linepoints);
    }

    select() {
        if (selected_point !== null){
            selected_point.deselect();
        }

        selected_point = this;
        update_inspector();

        this.shape.stroke('rgb(0,255,0)');
        this.shape.radius(12);
    }

    deselect() {
        this.shape.stroke('black');
        this.shape.radius(10);

        console.log("hello")

        commands_change = true;

        x_value.classList.remove('incorrect');
        y_value.classList.remove('incorrect');

        selected_point = null;
        update_inspector();
    }

    delete_command(command_to_delete: command) {
        const index = this.commands.indexOf(command_to_delete);
        if (index > -1) { // only splice array when item is found
            this.commands.splice(index, 1);
            commands_change = true;
            update_inspector();
        }
    }
}

export function update_inspector() {
    if (selected_point === null) {
        point_settings.style.visibility = "hidden";
        return;
    }
    point_settings.style.visibility = "visible";

    if (commands_change) {
        commands_change = false;

        while (command_list.children.length > 1) {
            command_list.removeChild(command_list.firstChild!);
        }

        selected_point.commands.forEach(listed_command => {
            command_list.prepend(listed_command.html);
        });
        
    }

    x_value.value = Units.convertToCurrentUnit(Units.pixels, selected_point.display_x).toFixed(3) 
        + " " + Units.current_unit.abv;
    y_value.value = Units.convertToCurrentUnit(Units.pixels, selected_point.display_y).toFixed(3) 
        + " " + Units.current_unit.abv;
}

function updateCurrentUnit() {
    Units.setCurrentUnitByName(unit_dropdown.value);
    update_inspector();
}

x_value.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        x_value.blur();
    }
});

y_value.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        y_value.blur();
    }
});

x_value.addEventListener("blur", () => {
    let value = x_value.value;
    if (cord_val.test(value))
    {
        x_value.classList.remove('incorrect');
        let out = value.match(cord_split)!;
        let pos = parseFloat(out[1]);
        let in_unit = Units.getUnitByName(out[2]);
        pos = Units.convertToUnit(in_unit, Units.pixels, pos);
        selected_point?.shape.x(map_range(pos, 0, 1008, Field.fieldBounds[0], Field.fieldBounds[1]));
        selected_point?.drag();
        update_inspector();
    }
    else {
        x_value.classList.add('incorrect');
    }
});

y_value.addEventListener("blur", () => {
    let value = y_value.value;
    if (cord_val.test(value))
    {
        x_value.classList.remove('incorrect');
        let out = value.match(cord_split)!;
        let pos = parseFloat(out[1]);
        let in_unit = Units.getUnitByName(out[2]);
        pos = Units.convertToUnit(in_unit, Units.pixels, pos);
        selected_point?.shape.y(map_range(pos, 0, 1008, Field.fieldBounds[0], Field.fieldBounds[1]));
        selected_point?.drag();
        update_inspector();
    }
    else {
        y_value.classList.add('incorrect');
    }
});

add_button.onclick = () => {
    let added_command = new command();
    added_command.point = selected_point!;
    selected_point?.commands.unshift(added_command);

    commands_change = true;
    update_inspector();
}

unit_dropdown.onchange = () => {
    updateCurrentUnit();
};

update_inspector()