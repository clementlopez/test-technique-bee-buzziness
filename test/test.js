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
    
    it('should select the good rectangle', function() {
        let rectangle1 = new Rectangle(0, 0, 100, 100);
        let rectangle2 = new Rectangle(100, 100, 100, 100);
        list_rectangle.unshift(rectangle1);
        list_rectangle.unshift(rectangle2);
        let position = selectRectangle(50, 50);
        assert(position === 1);
        resetListRectangle();
    });

    it('should select the latest rectangle when multiple good possibilities', function() {
        let rectangle1 = new Rectangle(0, 0, 100, 100);
        let rectangle2 = new Rectangle(10, 10, 100, 100);
        list_rectangle.unshift(rectangle1);
        list_rectangle.unshift(rectangle2);
        let position = selectRectangle(50, 50);
        assert(position === 0);
        resetListRectangle();
    });

    it('should overlap on one axis', function() {
        assert(overlapOnOneAxis(0, 100, 50, 100) === true);
    });

    it('should not overlap on one axis', function() {
        assert(overlapOnOneAxis(0, 10, 10, 10) === false);
    });

    it('should overlap', function() {
        let rectangle1 = new Rectangle(25, 25, 50, 50);
        assert(overlap(10, 30, 100, 100, rectangle1) === true);
    });

    it('should not overlap', function() {
        let rectangle1 = new Rectangle(25, 25, 50, 50);
        assert(overlap(0, 0, 25, 25, rectangle1) === false);
    });

    it('should not overlap when only one axis is overlaped', function() {
        let rectangle1 = new Rectangle(50, 25, 100, 50);
        assert(overlap(0, 0, 100, 25, rectangle1) === false);
    });

    it('should overlap in rotation', function() {
        let rectangle1 = new Rectangle(50, 50, 100, 100);
        assert(overlapInRotation(100, 100, 25, rectangle1) === true);
    });

    it('should not overlap in rotation', function() {
        let rectangle1 = new Rectangle(50, 50, 25, 25);
        assert(overlapInRotation(100, 100, 25, rectangle1) === false);
    });
})();
