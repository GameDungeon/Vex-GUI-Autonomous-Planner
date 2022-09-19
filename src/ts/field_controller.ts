import Konva from "konva";
import * as Field from "./field_canvas";
import * as SideBar from "./side_bar";
import { selected_point, linePoint } from "./inspector";
import { Tools } from "./side_bar";

var points : linePoint[] = [];

function activateEditMode() {
    if(SideBar.current_tool === Tools.Draw)
    {
        Field.line.points(Field.line.points().slice(0, -2));
    }

    SideBar.selectTool(document.getElementById("edit"), Tools.Edit);
}

function activateDrawMode() {
    var pointerPos = Field.stage.getRelativePointerPosition();
    var x = pointerPos.x;
    var y = pointerPos.y;
    Field.line.points(Field.line.points().concat(x, y));
    SideBar.selectTool(document.getElementById("draw"), Tools.Draw);
}

function activateInsertMode() {
    if(SideBar.current_tool === Tools.Draw)
    {
        Field.line.points(Field.line.points().slice(0, -2));
    }

    SideBar.selectTool(document.getElementById("insert"), Tools.Insert);
}


Field.stage.on('contextmenu', (e) => {
    e.evt.preventDefault();
});  

Field.stage.on('pointermove', function () {
    switch (SideBar.current_tool)
    {
        case Tools.Draw:
            var pointerPos = Field.stage.getRelativePointerPosition();
            var x = pointerPos.x;
            var y = pointerPos.y;  
            Field.line.points(Field.line.points().slice(0, -2).concat(x, y));  
            break;
    }

});
  
Field.stage.on('click', (e) => {
    if (e.evt.button === 2) {
        switch (SideBar.current_tool)
        {
            case Tools.Draw:
                activateEditMode();
                break;
            case Tools.Edit:
                console.log("hello1")
                selected_point!.deselect();
                break;

        }
    }
    else {
        switch (SideBar.current_tool)
        {
            case Tools.Draw:
                var pointerPos = Field.stage.getRelativePointerPosition();
                var x = pointerPos.x;
                var y = pointerPos.y; 
                Field.line.points(Field.line.points().concat([x, y]));
            
                var circle = new Konva.Circle({
                    x: x,
                    y: y,
                    radius: 10,
                    fill: 'black',
                    draggable: true,
                    strokeWidth: 3
                });

                var point = new linePoint(circle, points.length);

                points.push(point);

                circle.on('dragmove', () => {
                    point.drag();
                });

                circle.on("pointerdown", () => {
                    point.select();
                })
            
                Field.pointslayer.add(circle);
                break;
        }
    }
});

document.getElementById("edit")!.onclick = activateEditMode;
document.getElementById("draw")!.onclick = activateDrawMode;
document.getElementById("insert")!.onclick = activateInsertMode;

activateEditMode();