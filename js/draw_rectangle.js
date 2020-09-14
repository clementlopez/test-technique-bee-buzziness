/* on mousedown event the user starts the creation of a new rectangle
*/
canvas.addEventListener("mousedown", function (ev){
    color ='#'+Math.random().toString(16).substr(2,6);
    rectangle_in_progress = true;
    let mousePosition = getMousePosition(canvas, ev);
    starting_point.x = mousePosition.mouseX;
    starting_point.y = mousePosition.mouseY;
});

/* on mouseup event the user ends the creation of a new rectangle
*/
canvas.addEventListener("mouseup", function (ev){
    rectangle_in_progress = false;
    let mousePosition = getMousePosition(canvas, ev);
    if (starting_point.x !== mousePosition.mouseX || starting_point.y !== mousePosition.mouseY) {
        let width = mousePosition.mouseX - starting_point.x;
        let height = mousePosition.mouseY - starting_point.y;
        let x = starting_point.x;
        let y = starting_point.y;
        if (width < 0){
            x = mousePosition.mouseX;
            width = -width;
        }
        if (height < 0){
            y = mousePosition.mouseY;
            height = -height;
        }
        let rectangle = new Rectangle(x, y, width, height, color);
        drawRectangle(x, y, width, height, color);
        list_rectangle.unshift(rectangle);
        setDimensionsInProgress(0, 0);
    }
});

/* on mousemove event, if the user is drawing a new rectangle the potential final rectangle is drawn following the position of the mouse
*/
canvas.addEventListener("mousemove", function (ev){
    if(rectangle_in_progress) {
        let mousePosition = getMousePosition(canvas, ev);
        let width = mousePosition.mouseX - starting_point.x;
        let height = mousePosition.mouseY - starting_point.y;
        ctx.clearRect(starting_point.x, starting_point.y, dimensions_in_progress.width, dimensions_in_progress.height);
        drawRectangle(starting_point.x, starting_point.y, width, height, color);
        setDimensionsInProgress(width, height);
    }
});


/* drawRectangle will create the final rectangle and add it to list_rectangle
*/
function drawRectangle(x, y, width, height, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
