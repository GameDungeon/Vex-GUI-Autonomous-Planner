import { points } from "./field_controller";

let export_button = <HTMLButtonElement>document.getElementById("export-button")!;

export_button.onclick = () => {
    console.log(points);
}