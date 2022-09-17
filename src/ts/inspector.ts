export const units = {"Feet": "ft", "Inches": "in", "Pixels":"px"}

var unit_dropdown = document.getElementById("units")!;

for(let key in units) {
    let option = document.createElement("option");
    option.value = key.toLowerCase();
    option.innerHTML = key;
    unit_dropdown.appendChild(option);
}
