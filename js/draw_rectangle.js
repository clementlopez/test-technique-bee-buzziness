class Rectangle {
    constructor(x, y, height, width, color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* list_rectangle :
    table listing the drawn rectangles
*/
var list_rectangle = [];

/* rectangle_in_progress :
    variable which determines if the user is building a new rectangle
*/
var rectangle_in_progress = false;

/*
    on mousedown event the user starts the creation of a new rectangle
*/
canvas.addEventListener("mousedown", function (ev){
    rectangle_in_progress = true;
});

/*
    on mouseup event the user ends the creation of a new rectangle
*/
canvas.addEventListener("mouseup", function (ev){
    rectangle_in_progress = false;
});

/*
    on mousemove event, if the user is drawing a new rectangle the potential final rectangle is drawn following the position of the mouse
*/
canvas.addEventListener("mousemove", function (ev){

});

/*
    on dblclick event, if the mouse is positioned on a rectangle, the rectangle will be deleted after a 360 degree rotation
*/
canvas.addEventListener("dblclick", function (ev){

});

/*
    drawRectangle will create the final rectangle and add it to list_rectangle
*/
function drawRectangle(x, y, height, width, color){

}

/*
    rotateRectangle will rotate the rectangle under the mouse position
*/
function rotateRectangle(x, y){

}

/*
    deleteRectangle will delete the rectangle under the mouse position and delete it from list_rectangle
*/
function deleteRectangle(x,y){

}

function getMousePosition(canvas, ev){
    var rect = canvas.getBoundingClientRect();
    return {
        mouseX: ev.clientX - rect.left,
        mouseY: ev.clientY - rect.top
    };
}