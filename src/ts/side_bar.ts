import { spawns } from "./field/field_gen";
import { disks } from "./field/disks";

export const Tools = {
	Draw: Symbol("draw"),
	Edit: Symbol("edit"),
	Insert: Symbol("insert"),
}

export let current_tool = Tools.Edit;

const tool_buttons = document.querySelectorAll('.tool');

const disk_toggle = <HTMLInputElement>document.getElementById("show-disks")!;
const spawn_toggle = <HTMLInputElement>document.getElementById("show-spawns")!;

disk_toggle.checked = true;
spawn_toggle.checked = true;

export function selectTool(target, tool) {
    current_tool = tool;
    tool_buttons.forEach((btn) => {
      if(btn == target) { btn.classList.add("active"); }
      else { btn.classList.remove("active"); }
    });
}

spawn_toggle.onchange = () => {
  if(spawn_toggle.checked)
  {
    spawns.show();
  }
  else {
    spawns.hide();
  }
};

disk_toggle.onchange = () => {
  if(disk_toggle.checked)
  {
    disks.show();
  }
  else {
    disks.hide();
  }  
};