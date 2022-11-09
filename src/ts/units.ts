var unit_dropdown = <HTMLInputElement>document.getElementById("units")!;

class unit {
    name: string
    abv: string
    field_length: number
    constructor(name, abv, field_length) {
        this.name = name
        this.abv = abv

        // How long the field is in this unit. 
        this.field_length = field_length

        units.push(this)
        unit_map[this.name.toLowerCase()] = this;
        abv_map[this.abv.toLowerCase()] = this;
    }
}

export function convertToUnit(old_unit : unit, new_unit: unit, value){
    return value / old_unit.field_length * new_unit.field_length;
}

export function convertToCurrentUnit(old_unit : unit, value: number) {
    return convertToUnit(old_unit, this.current_unit, value);
}

export function getUnitByName(unit_name: string) {
    unit_name = unit_name.toLowerCase();
    if (abv_map[unit_name] !== undefined){
        return abv_map[unit_name];
    }
    if (unit_map[unit_name] !== undefined){
        return unit_map[unit_name]
    }
    throw "unit_name: " + unit_name + " is not a unit";
}

export function setCurrentUnitByName(unit_name: string) {
    current_unit = getUnitByName(unit_name);
}

export var units: unit[] = [];

export var unit_map: { [key:string]: unit } = {};
export var abv_map: { [key:string]: unit } = {};

export var inches = new unit("Inches", "in", 144);
export var feet = new unit("Feet", "ft", 12);
export var yards = new unit("Yards", "yd", 4);
export var meters = new unit("Meters", "m", 3.6576);
export var centimeters = new unit("Centimeters", "cm", 365.76);
export var milimeters = new unit("Milimeters", "mm", 3657.6);
export var pixels = new unit("Pixels", "px", 1000);

export var current_unit: unit = units[0];

units.forEach((unit) => {
    let option = document.createElement("option");
    option.value = unit.name.toLowerCase();
    option.innerHTML = unit.name;
    unit_dropdown.appendChild(option);
});