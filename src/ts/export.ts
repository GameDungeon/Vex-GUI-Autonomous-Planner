import { points } from "./field_controller";
import { inches, pixels, convertToUnit } from "./units";
import { robot_rot } from "./robot";

let export_button = <HTMLButtonElement>document.getElementById("export-button")!;

export_button.onclick = () => {
    if(points.length == 0)
    {
        console.log("Nothing to Export");
        return;
    }

    let out = `start ${convertToUnit(pixels, inches, points[0].x).toFixed(3) } ${convertToUnit(pixels, inches, points[0].y).toFixed(3) } ${robot_rot};`;

    let first = true

    points.forEach(point => {
        if(!first)
            out += `move ${convertToUnit(pixels, inches, point.x).toFixed(3) } ${convertToUnit(pixels, inches, point.y).toFixed(3) };`;

        if(point.flip)
            out += "flip;";

        if(point.commands.length > 0) {
            point.commands.forEach(command => {
                out += `${(command.html.querySelector("div > input:first-of-type") as HTMLInputElement).value};`;
            })
        }

        first = false;
    });
    out += "end";
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
  