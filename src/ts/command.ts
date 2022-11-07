import type { linePoint } from './inspector';

export class command {
    name: string
    time: number
    html: HTMLElement
    point: linePoint
    constructor() {
        let container = document.createElement("div");
        container.classList.add("command-box");
        container.classList.add("command");

        let name_container = document.createElement("div");
        let name_label = document.createElement("p");
        let name_input = document.createElement("input");

        name_label.innerText = "Command: ";

        name_container.classList.add("name-container");
        //name_label.classList.add("");
        //name_input.classList.add();

        name_container.appendChild(name_label);
        name_container.appendChild(name_input);
        let remove = document.createElement("button");
        remove.classList.add("remove");
        remove.innerText = "X";

        remove.onclick = () => {
            
            this.delete();
        }

        container.appendChild(name_container);
        container.appendChild(remove);

        this.html = container;
    }

    delete() {
        this.point.delete_command(this);
    }
}