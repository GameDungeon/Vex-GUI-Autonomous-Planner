import * as Units from "./units";

let width_input = <HTMLInputElement>document.getElementById("width-input")!;
let height_input = <HTMLInputElement>document.getElementById("height-input")!;
let speed_input = <HTMLInputElement>document.getElementById("speed-input")!;
let rot_speed_input = <HTMLInputElement>document.getElementById("rot-speed-input")!;

let width: number = 0;
let height: number = 0;
let speed: number = 0;
let rot_speed: number = 0;

const cord_val = new RegExp('^\\d+.?\\d*\\s?(' + 
    Object.keys(Units.abv_map).concat(Object.keys(Units.unit_map)).join('|') + ')?$'); 
const cord_split = /(^[\d.]*)\s?(.*)/

width_input.addEventListener("blur", () => {
    let value = width_input.value;
    if (cord_val.test(value))
    {
        width_input.classList.remove('incorrect');
        let out = value.match(cord_split)!;
        let pos = parseFloat(out[1]);
        let in_unit = Units.getUnitByName(out[2]);
        width = Units.convertToUnit(in_unit, Units.pixels, pos);
    }
    else {
        width_input.classList.add('incorrect');
    }
});

height_input.addEventListener("blur", () => {
    let value = height_input.value;
    if (cord_val.test(value))
    {
        height_input.classList.remove('incorrect');
        let out = value.match(cord_split)!;
        let pos = parseFloat(out[1]);
        let in_unit = Units.getUnitByName(out[2]);
        height = Units.convertToUnit(in_unit, Units.pixels, pos);
    }
    else {
        height_input.classList.add('incorrect');
    }
});

speed_input.addEventListener("blur", () => {
    let value = speed_input.value;
    if (cord_val.test(value))
    {
        speed_input.classList.remove('incorrect');
        let out = value.match(cord_split)!;
        let pos = parseFloat(out[1]);
        let in_unit = Units.getUnitByName(out[2]);
        speed = Units.convertToUnit(in_unit, Units.pixels, pos);
    }
    else {
        speed_input.classList.add('incorrect');
    }
});

rot_speed_input.addEventListener("blur", () => {
    let value = rot_speed_input.value;
    if (cord_val.test(value))
    {
        rot_speed_input.classList.remove('incorrect');
        let out = value.match(cord_split)!;
        let pos = parseFloat(out[1]);
        let in_unit = Units.getUnitByName(out[2]);
        rot_speed = Units.convertToUnit(in_unit, Units.pixels, pos);
    }
    else {
        rot_speed_input.classList.add('incorrect');
    }
});