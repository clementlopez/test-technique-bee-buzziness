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

/*

*/
var color ='#FFFFFF';

/* list_rectangle :
    table listing the drawn rectangles
*/
var list_rectangle = [];

/* rectangle_in_progress :
    variable which determines if the user is building a new rectangle
*/
var rectangle_in_progress = false;

/*
    starting_point :
    starting point of the rectangle that is being drawn
*/
var starting_point = {x: 0, y: 0};

/*

*/
var dimensions_in_progress = { height: 0, width: 0};

/*
    on mousedown event the user starts the creation of a new rectangle
*/
canvas.addEventListener("mousedown", function (ev){
    color ='#'+Math.random().toString(16).substr(2,6);
    rectangle_in_progress = true;
    let mousePosition = getMousePosition(canvas, ev);
    starting_point.x = mousePosition.mouseX;
    starting_point.y = mousePosition.mouseY;
});

/*
    on mouseup event the user ends the creation of a new rectangle
*/
canvas.addEventListener("mouseup", function (ev){
    rectangle_in_progress = false;
    let mousePosition = getMousePosition(canvas, ev);
    if (starting_point.x !== mousePosition.mouseX
      || starting_point.y !== mousePosition.mouseY) {
        let rectangle = new Rectangle(
            starting_point.x,
            starting_point.y,
            mousePosition.mouseX - starting_point.x,
            mousePosition.mouseY - starting_point.y,
            color);
        drawRectangle(
            rectangle.x,
            rectangle.y,
            rectangle.height,
            rectangle.width,
            rectangle.color
        );
        list_rectangle.unshift(rectangle);
        dimensions_in_progress.height = 0;
        dimensions_in_progress.width = 0;
    }
    console.log(list_rectangle);
});

/*
    on mousemove event, if the user is drawing a new rectangle the potential final rectangle is drawn following the position of the mouse
*/
canvas.addEventListener("mousemove", function (ev){
    if(rectangle_in_progress) {
        let mousePosition = getMousePosition(canvas, ev);
        drawRectangle(
            starting_point.x,
            starting_point.y,
            mousePosition.mouseX - starting_point.x,
            mousePosition.mouseY - starting_point.y,
            color
        );
        dimensions_in_progress.height = mousePosition.mouseX - starting_point.x;
        dimensions_in_progress.width = mousePosition.mouseY - starting_point.y;
    }
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
    ctx.clearRect(x, y, dimensions_in_progress.height, dimensions_in_progress.width);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, height, width);
    ctx.stroke();
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
    let rect = canvas.getBoundingClientRect();
    return {
        mouseX: ev.clientX - rect.left,
        mouseY: ev.clientY - rect.top
    };
}