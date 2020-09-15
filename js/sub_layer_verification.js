/* redrawHiddenRectangles will look to see if previous rectangles
    have been drawn below the one being moved or deleted
    and will redraw them accordingly
*/
function redrawHiddenRectangles(x, y, width, height, length){
    for(let i = length - 1; i >= 0; i--){
        if(overlap(x, y, width, height, list_rectangle[i])){
            drawRectangle(list_rectangle[i].x, list_rectangle[i].y, list_rectangle[i].width, list_rectangle[i].height, list_rectangle[i].color);
            redrawHiddenRectangles(list_rectangle[i].x, list_rectangle[i].y, list_rectangle[i].width, list_rectangle[i].height, i);
        }
    }
}

/* overlap return true if rectangle if behind the current one
*/
function overlap(x, y, width, height, rectangle){
    return(overlapOnOneAxis(x, width, rectangle.x, rectangle.width)
    && overlapOnOneAxis(y, height, rectangle.y, rectangle.height));
}

/* overlapOnOneAxis 
*/
function overlapOnOneAxis(base1, variation1, base2, variation2){
    return((base1 > base2 && base1 < base2+variation2)
    || (base1 < base2 && base1 > base2+variation2)
    || (base2 > base1 && base2 < base1+variation1)
    || (base2 < base1 && base2 > base1+variation1)
    || (base1+variation1 > base2 && base1+variation1 < base2+variation2)
    || (base1+variation1 < base2 && base1+variation1 > base2+variation2)
    || (base2+variation2 > base1 && base2+variation2 < base1+variation1)
    || (base2+variation2 < base1 && base2+variation2 > base1+variation1));
}

/* redrawHiddenRectanglesFromRotation will look to see if previous rectangles
    have been drawn below the one being rotated
    and will redraw them accordingly
*/
function redrawHiddenRectanglesFromRotation(x, y, width, height){
    let centerX = ((x+width)/2) , centerY = (y+height)/2 , r = (Math.sqrt((width * width) + (height * height)));
    for(let i = list_rectangle.length - 1; i >= 0; i--) {
        if(overlapInRotation(centerX, centerY, r, list_rectangle[i])) {
            drawRectangle(list_rectangle[i].x, list_rectangle[i].y, list_rectangle[i].width, list_rectangle[i].height, list_rectangle[i].color);
            redrawHiddenRectangles(list_rectangle[i].x, list_rectangle[i].y, list_rectangle[i].width, list_rectangle[i].height, i);
        }
    }
}

/* overlap return true if rectangle if behind the current one which is in rotation
*/
function overlapInRotation(centerX, centerY, r, rectangle){
    return overlap(centerX-r, centerY-r, 2*r, 2*r, rectangle);
}
