import * as Units from "./units";

let width_input = <HTMLInputElement>document.getElementById("width-input")!;
let height_input = <HTMLInputElement>document.getElementById("height-input")!;

export let robot_width: number = 0;
export let robot_height: number = 0;

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
        robot_width = Units.convertToUnit(in_unit, Units.pixels, pos);
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
        robot_height = Units.convertToUnit(in_unit, Units.pixels, pos);
    }
    else {
        height_input.classList.add('incorrect');
    }
});

width_input.value = "0 in";
height_input.value = "0 in";