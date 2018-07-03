class Pickup extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.shouldDraw = true;
    }
    tick() {

    }
    render(context) {
        if (this.shouldDraw) {
            context.fillStyle = "yellow";
            context.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}
