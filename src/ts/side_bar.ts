export const Tools = {
	Draw: Symbol("draw"),
	Edit: Symbol("edit"),
	Insert: Symbol("insert"),
}

export let current_tool = Tools.Edit;

const tool_buttons = document.querySelectorAll('.tool');

export function selectTool(target, tool) {
    current_tool = tool;
    tool_buttons.forEach((btn) => {
      if(btn == target) { btn.classList.add("active"); }
      else { btn.classList.remove("active"); }
    });
}