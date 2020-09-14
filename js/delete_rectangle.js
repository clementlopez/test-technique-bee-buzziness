var number_of_rectangles_in_rotation = 0;

/* on dblclick event, if the mouse is positioned on a rectangle, the rectangle will be deleted after a 360 degree rotation
*/
canvas.addEventListener("dblclick", function (ev){
    let mousePosition = getMousePosition(canvas, ev);
    position_to_rotate_and_delete = selectRectangle(mousePosition.mouseX, mousePosition.mouseY);
    if (position_to_rotate_and_delete > -1 ){
        number_of_rectangles_in_rotation += 1;
        to_rotate_and_delete = list_rectangle.splice(position_to_rotate_and_delete,1)[0];
        rotateRectangle(to_rotate_and_delete);
        deleteRectangle(to_rotate_and_delete);
    }
});

/* selectRectangle will select the rectangle on which is the mouse
*/
function selectRectangle(x, y){
    for(let i = 0; i< list_rectangle.length; i++){
        if(x >= list_rectangle[i].x
        && x <= list_rectangle[i].x + list_rectangle[i].width
        && y >= list_rectangle[i].y
        && y <= list_rectangle[i].y + list_rectangle[i].height){
            return i;
        }
    }
    return -1;
}

/*
    rotateRectangle will rotate the rectangle under the mouse position
*/
// async function rotateRectangle(to_rotate) {
//     let angle = 0;
//     let translateX = to_rotate.x + (0.5 * to_rotate.width);
//     let translateY = to_rotate.y + (0.5 * to_rotate.height);
//     do {
//         ctx.clearRect(to_rotate.x, to_rotate.y, to_rotate.width, to_rotate.height);
//         ctx.beginPath();
//         ctx.fillStyle = to_rotate.color;
//         angle += 5;
        
//         ctx.translate(translateX, translateY);
//         ctx.rotate(5 * Math.PI / 180);
//         ctx.translate(-translateX, -translateY);

//         drawRectangle(to_rotate.x, to_rotate.y, to_rotate.width, to_rotate.height, to_rotate.color);

//         // ctx.translate(translateX, translateY);
//         // ctx.rotate(-angle * Math.PI / 180);        
//         // ctx.translate(-translateX, -translateY);

        
//         await sleep(25);
//     }
//     while(angle < 360);
//     number_of_rectangles_in_rotation -= 1;
// }

function rotateRectangle(to_rotate) {
    let angle = 0;
    let translateX = to_rotate.x + (0.5 * to_rotate.width);
    let translateY = to_rotate.y + (0.5 * to_rotate.height);
    let rotation = setInterval(animation, 25);
    function animation() {
        ctx.translate(translateX, translateY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-translateX, -translateY);
        if (angle == 360){
            clearInterval(rotation);
            number_of_rectangles_in_rotation -= 1;
        } else {
            ctx.clearRect(to_rotate.x, to_rotate.y, to_rotate.width, to_rotate.height);
            ctx.beginPath();
            ctx.fillStyle = to_rotate.color;
            
            ctx.translate(translateX, translateY);
            ctx.rotate(5 * Math.PI / 180);
            ctx.translate(-translateX, -translateY);
    
            drawRectangle(to_rotate.x, to_rotate.y, to_rotate.width, to_rotate.height, to_rotate.color);
            angle += 5;
            ctx.translate(translateX, translateY);
            ctx.rotate((-angle) * Math.PI / 180);
            ctx.translate(-translateX, -translateY);
        }
    }
    
}

/*
    deleteRectangle will delete the rectangle under the mouse position and delete it from list_rectangle
*/
async function deleteRectangle(to_delete){
    while (number_of_rectangles_in_rotation > 0) {
        await sleep(1000);
    }
    ctx.clearRect(to_delete.x, to_delete.y, to_delete.width, to_delete.height);
}