class Player extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.xspd = 0;
        this.yspd = 0;

        this.scoreCount = 0;
        this.hitAmount = 0;
    }
    tick() {
        this.x += this.xspd;
        this.y += this.yspd;
        if (this.x <= 0) {
            this.x = 0;
        }
        else if (this.x >= canvasWidth - this.w) {
            this.x = canvasWidth - this.w;
        }
        else if (this.y <= 0) {
            this.y = 0;
        }
        else if (this.y >= canvasHeight - this.h) {
            this.y = canvasHeight - this.h;
        }
    }
    render(context) {
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.w, this.h);
    }
    move(xu, yu) {
        this.xspd = xu * GRID_SIZE;
        this.yspd = yu * GRID_SIZE;
    }
}
