
import Konva from "konva";
import * as Field from "./field_canvas";
import * as SideBar from "./side_bar";
import { Tools } from "./side_bar"

class linePoint {
    index: number 
    constructor() {
        this.index = points.length;
    }

    drag() {
        var pointerPos = Field.stage.getRelativePointerPosition();
        var x = pointerPos.x;
        var y = pointerPos.y;
        let linepoints = Field.line.points();
        linepoints[this.index*2] = x;
        linepoints[this.index*2+1] = y;
        Field.line.points(linepoints);
    }
}

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
                    draggable: true
                });

                var point = new linePoint();

                points.push(point);

                circle.on('dragmove', () => {
                    point.drag();
                });
            
                Field.pointslayer.add(circle);
                break;
        }
    }
});

document.getElementById("edit")!.onclick = activateEditMode;
document.getElementById("draw")!.onclick = activateDrawMode;
document.getElementById("insert")!.onclick = activateInsertMode;

activateEditMode();