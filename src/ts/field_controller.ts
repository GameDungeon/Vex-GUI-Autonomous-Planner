import Konva from "konva";
import * as Field from "./field/field_canvas";
import * as Active from "./field/active_layer";
import * as SideBar from "./side_bar";
import { selected_point, linePoint } from "./inspector";
import { Tools } from "./side_bar";
import { midpoint } from "./utils";

export let points: linePoint[] = [];
export let midpoints: Konva.Circle[] = []

function deactivateCurrentMode() {
    switch (SideBar.current_tool) {
        case Tools.Draw:
            Active.line.points(Active.line.points().slice(0, -2));
            break;
        case Tools.Insert:
            midpoints.forEach(point => {
                point.destroy()
            });
            break;
        case Tools.Edit:
            break;
    }
}

function activateEditMode() {
    deactivateCurrentMode();

    SideBar.selectTool(document.getElementById("edit"), Tools.Edit);
}

function activateDrawMode() {
    deactivateCurrentMode();

    var pointerPos = Field.stage.getRelativePointerPosition();
    var x = pointerPos.x;
    var y = pointerPos.y;
    Active.line.points(Active.line.points().concat(x, y));
    SideBar.selectTool(document.getElementById("draw"), Tools.Draw);
}

function activateInsertMode() {
    deactivateCurrentMode();

    for (let i = 0; i < points.length - 1; i++) {
        let new_point = midpoint(points[i].x, points[i].y, points[i+1].x, points[i+1].y);

        var circle = new Konva.Circle({
            x: new_point[0],
            y: new_point[1],
            radius: 10,
            fill: 'green',
            draggable: false,
            strokeWidth: 3
        });

        circle.on("pointerdown", () => {
            let new_points = Active.line.points().splice(i*2+2, 0, new_point[0], new_point[1])
            Active.line.points(new_points);

            var new_real_point = new Konva.Circle({
                x: new_point[0],
                y: new_point[1],
                radius: 10,
                fill: 'black',
                draggable: true,
                strokeWidth: 3
            });

            var point = new linePoint(new_real_point, points.length);

            new_real_point.on('dragmove', () => {
                point.drag();
            });

            new_real_point.on("pointerdown", () => {
                point.select();
            })

            points.splice(i*2, 0, point);
            point.select();

            Active.pointslayer.add(new_real_point);

            activateEditMode();
        })

        midpoints.push(circle);
        Active.pointslayer.add(circle);
    }

    SideBar.selectTool(document.getElementById("insert"), Tools.Insert);
}

function updatePoints() {
    let arrayLength = points.length;
    let linepoints: number[] = [];
    for (var i = 0; i < arrayLength; i++) {
        let current_point = points[i];
        current_point.index = i;
        linepoints[i * 2] = current_point.x;
        linepoints[i * 2 + 1] = current_point.y;
    }
    Active.line.points(linepoints);
}

Field.stage.on('contextmenu', (e) => {
    e.evt.preventDefault();
});

Field.stage.on('pointermove', function () {
    switch (SideBar.current_tool) {
        case Tools.Draw:
            var pointerPos = Field.stage.getRelativePointerPosition();
            var x = pointerPos.x;
            var y = pointerPos.y;
            Active.line.points(Active.line.points().slice(0, -2).concat(x, y));
            break;
    }

});

Field.stage.on('click', (e) => {
    if (e.evt.button === 2) {
        switch (SideBar.current_tool) {
            case Tools.Draw:
                activateEditMode();
                break;
            case Tools.Insert:
                activateEditMode();
                break;
            case Tools.Edit:
                selected_point?.deselect();
                break;
        }
    }
    else {
        switch (SideBar.current_tool) {
            case Tools.Draw:
                var pointerPos = Field.stage.getRelativePointerPosition();
                var x = pointerPos.x;
                var y = pointerPos.y;
                Active.line.points(Active.line.points().concat([x, y]));

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

                Active.pointslayer.add(circle);
                break;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (document.body == document.activeElement) {
        const key = e.key;
        if (key === "Delete" || key === "Backspace") {
            console.log(document.activeElement)
            if (SideBar.current_tool == Tools.Edit && selected_point !== null) {
                const index = points.indexOf(selected_point);
                if (index > -1) { // only splice array when item is found
                    points.splice(index, 1);
                    selected_point.delete();
                    updatePoints();
                }
            }
        }

    }
});

document.getElementById("edit")!.onclick = activateEditMode;
document.getElementById("draw")!.onclick = activateDrawMode;
document.getElementById("insert")!.onclick = activateInsertMode;

activateEditMode();
