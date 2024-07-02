class Player {
    constructor (id, initPosX, initPosY, initColor) {
        this.id = id;
        this.posX = initPosX;
        this.posY = initPosY;
        this.color = initColor;
        this.isStopped = false;
        this.lastDir = null;
        this.score = 0;
        this.steps = 0;
        this.stops = 0;
        this.startTime;
        this.finishDuration = 0;

        this.moveSound = new Audio();
        this.moveSound.src = "./assets/sounds/move-sound.wav";
        this.hitSound = new Audio();
        this.hitSound.src = "./assets/sounds/hit-sound.wav";
        this.finishSound = new Audio();
        this.finishSound.src = "./assets/sounds/finish-sound.mp3";
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.posX, this.posY, UNIT_SIZE, UNIT_SIZE);
        ctx.closePath();
    }

    update() {
    }

    start (stTime) {
        this.startTime = stTime;
        this.draw();
        this.update();
    }

    move(dir) { // dor: 'u', 'd', 'r', 'l'
        this.lastDir = dir;
        if (this.isStopped) return;


        if (dir === 'u' && this.posY > 0) {
            this.playMoveSound();
            this.posY -= UNIT_SIZE;
        }
        if (dir === 'd' && this.posY < (canvas.height - UNIT_SIZE)) {
            this.playMoveSound();
            this.posY += UNIT_SIZE;
        }
        if (dir === 'l' && this.posX > 0) {
            this.playMoveSound();
            this.posX -= UNIT_SIZE;
        }
        if (dir === 'r' && this.posX < (canvas.width - UNIT_SIZE)) {
            this.playMoveSound();
            this.posX += UNIT_SIZE;
        }

        this.steps += 1;
    }  

    setPos(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    stop() {
        this.isStopped = true;
        this.stops += 1;
    }

    continue() {
        this.isStopped = false;
    }

    end() {
        this.isStopped = true;
        this.finishDuration = new Date().getTime() - this.startTime;
    }
    
    playMoveSound() {
        this.moveSound.pause();
        this.moveSound.currentTime = 0;
        this.moveSound.play();
    }

    playHitSound() {
        this.hitSound.pause();
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }

    playFinishSound() {
        this.finishSound.pause();
        this.finishSound.currentTime = 0;
        this.finishSound.play();
    }

    reset() {
        this.isStopped = false;
        this.score = 0;
        this.steps = 0;
        this.lastDir = null;
    }
}