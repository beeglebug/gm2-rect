var Vector2 = require('gm2-vector2');

/**
 * A rectangle.
 * @constructor
 * @param {Number} [width=1] The width of the rectangle.
 * @param {Number} [height=1] The height of the rectangle.
 * @param {Number} [x=0] The x position of the rectangle.
 * @param {Number} [y=0] The y position of the rectangle.
 * @example var shape = new Rect(3, 3, 10, 10);
 */
var Rect = function( width, height, x, y ) {

    /** The width of the rectangle. */
    this.width = width || 1;

    /** The height of the rectangle. */
    this.height = height || 1;

    /** The x position of the rectangle. */
    this.x = x || 0;

    /** The x position of the rectangle. */
    this.y = y || 0;

};

/**
 * @return {Rect} An exact copy of this Rect.
 */
Rect.prototype.clone = function() {

    return new Rect(this.width, this.height, this.x, this.y);
};

/**
 * @return {Vector2} The center of the rectangle.
 */
Rect.prototype.getCenter = function(v) {

    if(!v) {
        v = new Vector2();
    }

    v.x = this.position.x + this.width / 2;
    v.y = this.position.y + this.height / 2;

    return v;
};

/**
 * Move the Rect so that it's center is at the specified point.
 * @param {Vector2} pos The new center for the Rect.
 * @return {Rect} Itself. Useful for chaining.
 */
Rect.prototype.setCenter = function(pos) {

    this.x = pos.x - this.width / 2;
    this.y = pos.y - this.height / 2;

    return this;
};

/**
 *
 */
Rect.prototype.scale = function(scale) {

    this.width *= scale;
    this.height *= scale;

    return this;
};

/**
 * Expand the Rect so that it has a new width and height, but the same center.
 * @param {Number} scale A factor to multiply the width and height by.
 * @return {Rect} Itself. Useful for chaining.
 */
Rect.prototype.expand = function(scale) {

    // get it first to expand from center
    var center = this.getCenter();

    this.scale(scale);

    this.setCenter(center);

    return this;
};

/**
 * shrink rectangle by a set amount
 * @param amount how much to contract
 */
Rect.prototype.contract = function(amount) {

    this.x += amount;
    this.y += amount;
    this.width -= 2 * amount;
    this.height -= 2 * amount;
};


/**
 * constrain this rect inside another
 */
Rect.prototype.clip = function(rect) {

    // left edge
    if(this.x < rect.x) {
        this.width += this.x - rect.x;
        this.x = rect.x;
    }

    // right edge
    if(this.x + this.width >= rect.x + rect.width) {
        this.width = rect.x + rect.width - this.x;
    }

    // top edge
    if(this.y < rect.y) {
        this.height += this.y - rect.y;
        this.y = rect.y;
    }

    // bottom edge
    if(this.y + this.height >= rect.y + rect.height) {
        this.height = rect.y + rect.height - this.y;
    }

    return this;
};

/**
 * return an array of lines
 * representing the edges of the rectangle edges
 * @return {Array} an array of lines
 */
Rect.prototype.getEdges = function() {

    var v = this.getVertices();

    return [
        new Line(v[0], v[1]),
        new Line(v[1], v[2]),
        new Line(v[2], v[3]),
        new Line(v[3], v[0])
    ];

};

// get vertices in clockwise order from top left
Rect.prototype.getVertices = function() {

    var vertices = [
        new Vector2(this.x, this.y),
        new Vector2(this.x, this.y),
        new Vector2(this.x, this.y),
        new Vector2(this.x, this.y)
    ];

    vertices[1].x += this.width;
    vertices[2].x += this.width;
    vertices[2].y += this.height;
    vertices[3].y += this.height;

    return vertices;
};

Rect.fromArray = function(arr) {

    var x = 0;
    var y = 0;

    if(arr.length >= 4) {

        x = parseInt(arr[2]);
        y = parseInt(arr[3]);

    }

    return new Rect(
        parseInt(arr[0]),
        parseInt(arr[1]),
        x,
        y
    );

};

module.exports = Rect;
