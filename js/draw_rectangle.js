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

/*
    color :
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

/*
    starting_point :
    starting point of the rectangle that is being drawn
*/
var starting_point = {x: 0, y: 0};

/*
    dimensions_in_progress :
    dimensions of the rectangle currently being created
*/
var dimensions_in_progress = { width: 0, height: 0};

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
            rectangle.width,
            rectangle.height,
            rectangle.color
        );
        list_rectangle.unshift(rectangle);
        setDimensionsInProgress(0, 0);
    }
});

/*
    on mousemove event, if the user is drawing a new rectangle the potential final rectangle is drawn following the position of the mouse
*/
canvas.addEventListener("mousemove", function (ev){
    if(rectangle_in_progress) {
        let mousePosition = getMousePosition(canvas, ev);
        let width = mousePosition.mouseX - starting_point.x;
        let height = mousePosition.mouseY - starting_point.y;
        drawRectangle(
            starting_point.x,
            starting_point.y,
            width,
            height,
            color
        );
        setDimensionsInProgress(width, height);
    }
});

/*
    on dblclick event, if the mouse is positioned on a rectangle, the rectangle will be deleted after a 360 degree rotation
*/
canvas.addEventListener("dblclick", function (ev){
    let mousePosition = getMousePosition(canvas, ev);
    rotateRectangle(mousePosition.mouseX, mousePosition.mouseY);
    let position_to_delete = deleteRectangle(mousePosition.mouseX, mousePosition.mouseY);
    if (position_to_delete > -1){
        to_delete = list_rectangle.splice(position_to_delete,1)[0];
        console.log(to_delete);
        ctx.beginPath();
        ctx.clearRect(to_delete.x, to_delete.y, to_delete.width, to_delete.height);
        ctx.stroke();
    }
});

/*
    drawRectangle will create the final rectangle and add it to list_rectangle
*/
function drawRectangle(x, y, width, height, color){
    ctx.beginPath();
    ctx.clearRect(x, y, dimensions_in_progress.width, dimensions_in_progress.height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
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
    let finded = false;
    for(let i = 0; i< list_rectangle.length; i++){
        if(list_rectangle[i].width > 0 && list_rectangle[i].height > 0){
            if(x >= list_rectangle[i].x
                && x <= list_rectangle[i].x + list_rectangle[i].width
                && y >= list_rectangle[i].y
                && y <= list_rectangle[i].y + list_rectangle[i].height){
                    finded = true;
                }
        }
        else if (list_rectangle[i].width < 0 && list_rectangle[i].height > 0){
            if(x <= list_rectangle[i].x
                && x >= list_rectangle[i].x + list_rectangle[i].width
                && y >= list_rectangle[i].y
                && y <= list_rectangle[i].y + list_rectangle[i].height){
                    finded = true;
                }
        }
        else if (list_rectangle[i].width > 0 && list_rectangle[i].height < 0){
            if(x >= list_rectangle[i].x
                && x <= list_rectangle[i].x + list_rectangle[i].width
                && y <= list_rectangle[i].y
                && y >= list_rectangle[i].y + list_rectangle[i].height){
                    finded = true;
                }            
        }
        else if (list_rectangle[i].width < 0 && list_rectangle[i].height < 0){
            if(x <= list_rectangle[i].x
                && x >= list_rectangle[i].x + list_rectangle[i].width
                && y <= list_rectangle[i].y
                && y >= list_rectangle[i].y + list_rectangle[i].height){
                    finded = true;
                }
        }
        if(finded){
            return i;
        }
    }
    return -1;
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