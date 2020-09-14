class Rectangle {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* color :
    the color of the next rectangle
    reset as soon as the user starts drawing a new rectangle
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

/* starting_point :
    starting point of the rectangle that is being drawn
*/
var starting_point = {x: 0, y: 0};

/* dimensions_in_progress :
    dimensions of the rectangle currently being created
*/
var dimensions_in_progress = { width: 0, height: 0};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getMousePosition(canvas, ev){
    let rect = canvas.getBoundingClientRect();
    return {
        mouseX: ev.clientX - rect.left,
        mouseY: ev.clientY - rect.top
    };
}

function setDimensionsInProgress(width, height){
    dimensions_in_progress.width = width;
    dimensions_in_progress.height = height;
}
