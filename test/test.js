(function(){
    'use strict';
    
    /**
     * test function
     * @param {string} desc
     * @param {function} fn
     */
    function it(desc, fn) {
            try {
            fn();
            console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
        } catch (error) {
            console.log('\n');
            console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
            console.error(error);
        }
    }

    function assert(isTrue) {
        if (!isTrue) {
            throw new Error();
        }
    }

    function resetListRectangle(){
        list_rectangle = [];
    }
    
    it('should selectRectangle select the good rectangle', function() {
        let rectangle1 = new Rectangle(0, 0, 100, 100);
        let rectangle2 = new Rectangle(100, 100, 100, 100);
        list_rectangle.unshift(rectangle1);
        list_rectangle.unshift(rectangle2);
        let position = selectRectangle(50, 50);
        assert(position === 1);
        resetListRectangle();
    });

    it('should selectRectangle select the latest rectangle when multiple good possibilities', function() {
        let rectangle1 = new Rectangle(0, 0, 100, 100);
        let rectangle2 = new Rectangle(10, 10, 100, 100);
        list_rectangle.unshift(rectangle1);
        list_rectangle.unshift(rectangle2);
        let position = selectRectangle(50, 50);
        assert(position === 0);
        resetListRectangle();
    });

    it('should overlapOnOneAxis returns true when overlap on one axis', function() {
        assert(overlapOnOneAxis(0, 100, 50, 100) === true);
    });

    it('should overlapOnOneAxis returns false when not overlap on one axis', function() {
        assert(overlapOnOneAxis(0, 10, 10, 10) === false);
    });

    it('should overlap return true when 2 rectangles overlap', function() {
        let rectangle1 = new Rectangle(25, 25, 50, 50);
        assert(overlap(10, 30, 100, 100, rectangle1) === true);
    });

    it('should overlap return false when 2 rectangles not overlap', function() {
        let rectangle1 = new Rectangle(25, 25, 50, 50);
        assert(overlap(0, 0, 25, 25, rectangle1) === false);
    });

    it('should overlap returns false when only one axis is overlaped', function() {
        let rectangle1 = new Rectangle(50, 25, 100, 50);
        assert(overlap(0, 0, 100, 25, rectangle1) === false);
    });

    it('should overlapInRotation returns true when a rectangle in rotation overlaps another', function() {
        let rectangle1 = new Rectangle(50, 50, 100, 100);
        assert(overlapInRotation(100, 100, 25, rectangle1) === true);
    });

    it('should overlapInRotation returns false when a rectangle in rotation do not overlaps another', function() {
        let rectangle1 = new Rectangle(50, 50, 25, 25);
        assert(overlapInRotation(100, 100, 25, rectangle1) === false);
    });

    it('should create a new rectangle', function() {
        canvas.dispatchEvent(new MouseEvent("mousedown", {clientX: 0, clientY: 0}));
        canvas.dispatchEvent(new MouseEvent("mouseup", {clientX: 100, clientY: 100}));
        assert(list_rectangle.length === 1);
        resetListRectangle();
        ctx.clearRect(0, 0, 100, 100);
    });

    /* the simulation of a deletion leading to a visual animation
        it is preferable to give values out of the visual field for the deletion tests
    */
    it('should delete a rectangle', function() {
        let rectangle = new Rectangle(-500, -500, 100, 100);
        list_rectangle.unshift(rectangle);
        canvas.dispatchEvent(new MouseEvent("dblclick", {clientX: -450, clientY: -450}));
        assert(list_rectangle.length === 0);
    });

    it('should not delete a rectangle when dblclick is not in the right coordinates', function() {
        let rectangle = new Rectangle(0, 0, 100, 100);
        list_rectangle.unshift(rectangle);
        canvas.dispatchEvent(new MouseEvent("dblclick", {clientX: 200, clientY: 200}));
        assert(list_rectangle.length === 1);
        resetListRectangle();
    });

    it('should delete only the latest rectangle when dblclick on overlapping rectangles', function() {
        let rectangle1 = new Rectangle(-500, -500, 100, 100);
        let rectangle2 = new Rectangle(-490, -490, 100, 100);
        list_rectangle.unshift(rectangle1);
        list_rectangle.unshift(rectangle2);
        canvas.dispatchEvent(new MouseEvent("dblclick", {clientX: -450, clientY: -450}));
        assert(list_rectangle.length === 1);
        assert(list_rectangle[0].x === -500);
        resetListRectangle();
    });

    it('should delete multiple rectangles when multiple dblclicks', function() {
        let rectangle1 = new Rectangle(-500, -500, 100, 100);
        let rectangle2 = new Rectangle(-490, -490, 100, 100);
        list_rectangle.unshift(rectangle1);
        list_rectangle.unshift(rectangle2);
        canvas.dispatchEvent(new MouseEvent("dblclick", {clientX: -450, clientY: -450}));
        canvas.dispatchEvent(new MouseEvent("dblclick", {clientX: -450, clientY: -450}));
        assert(list_rectangle.length === 0);
        resetListRectangle();
    });
})();
