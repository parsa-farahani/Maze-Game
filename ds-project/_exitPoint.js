class ExitPoint {
    constructor(initPosX, initPosY) {
        this.posX = initPosX;
        this.posY = initPosY;
    }

    draw() {
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.fillRect(this.posX, this.posY, UNIT_SIZE, UNIT_SIZE);
        ctx.closePath();
    }

    update() {

    }

    reset() {

    }
}