class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    intersects(other) {
        let left = this.x;
        let right = this.x + this.w;
        let top = this.y;
        let bottom = this.y + this.h;

        let o_left = other.x;
        let o_right = other.x + other.w;
        let o_top = other.y;
        let o_bottom = other.y + other.h;

        if (top < o_bottom &&
            bottom > o_top &&
            left < o_right &&
            right > o_left) {
            return true;
        }
        else {
            return false;
        }
    }
}
