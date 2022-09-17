
import Konva from "konva";
import * as Field from "./field_canvas";
import * as SideBar from "./side_bar";
import * as Inspector from "./inspector";
import { Tools } from "./side_bar";

class linePoint {
    index: number
    shape: Konva.Circle
    constructor(shape, index) {
        this.index = index;
        this.shape = shape;
        this.select();
    }

    drag() {
        var x = this.shape.getAttr("x");
        var y = this.shape.getAttr("y");
        let linepoints = Field.line.points();
        linepoints[this.index*2] = x;
        linepoints[this.index*2+1] = y;
        Field.line.points(linepoints);
    }

    bounds() {
        var x = this.shape.getAttr("x");
        var y = this.shape.getAttr("y");
    }

    select() {
        if (selected_point !== null){
            selected_point.deselect();
        }

        selected_point = this;

        this.shape.stroke('rgb(0,255,0)');
        this.shape.radius(12);
    }

    deselect() {
        this.shape.stroke('black');
        this.shape.radius(10);
    }
}

var points : linePoint[] = [];
var selected_point : linePoint | null = null;

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
                selected_point?.deselect();
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