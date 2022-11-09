import { points } from "./field_controller";
import { inches, pixels, convertToUnit } from "./units";

let export_button = <HTMLButtonElement>document.getElementById("export-button")!;

export_button.onclick = () => {
    let out = `start ${convertToUnit(pixels, inches, points[0].display_x)} ${convertToUnit(pixels, inches, points[0].display_y)};`
    points.slice(1).forEach(point => {
        out += `move ${convertToUnit(pixels, inches, point.display_x)} ${convertToUnit(pixels, inches, point.display_y)};`

        if(point.commands.length > 0) {
            point.commands.forEach(command => {
                out += `${(command.html.querySelector("div > input:first-of-type") as HTMLInputElement).value};`;
            })
        }
    });
    console.log(out)
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  