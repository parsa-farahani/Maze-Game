class Game {
    constructor() {
        this.state = {
            current: 0,
            player1Run: 0,
            player2Run: 1,
            over: 2,
        }


        this.startTime = 0;
        this.isRun = true;
        this.screen = canvas;
        this.labyrinth = new Labyrinth();
        this.exitPoint = new ExitPoint(canvas.width - UNIT_SIZE, 0);
        this.player1 = new Player("player 1", 0, canvas.height - UNIT_SIZE, "red");
        this.player2 = new Player("player 2", 0, canvas.height - UNIT_SIZE, 'dodgerblue');
        this.pathFinder = new PathFinder(maze, 29, 0, 0, 29);
        this.loser = "none";
        this.winner = "none";
        this.isScored = false;

        this.pathFinder.findPath();

    }

    draw() {
        canvas.clear();
        this.labyrinth.draw();
        this.pathFinder.draw();
        this.exitPoint.draw();
    }

    update() {
        if (this.state.current === this.state.player1Run) {
            player1Info.style.display = "block";
            this.player1.start(new Date().getTime());
        }

        if (this.state.current === this.state.player2Run) {
            player2Info.style.display = "block";
            this.player2.start(new Date().getTime());
        }

        if (this.state.current === this.state.over) {
            this.showGameOver();
        }

        this.checkCollision();
        this.checkEnd();
        this.labyrinth.update();
        this.pathFinder.update();
        
        this.showInfo();
    }

    checkCollision() {
        this.labyrinth.barriers.forEach((barrier, i) => {
            if (
                this.player1.posX === barrier.cellPos.x
                && this.player1.posY === barrier.cellPos.y
            ) {
                this.player1.playHitSound();
                this.stopPlayer(this.player1);
            }
            if (
                this.player2.posX === barrier.cellPos.x
                && this.player2.posY === barrier.cellPos.y
            ) {
                this.player2.playHitSound();
                this.stopPlayer(this.player2);
            }
        })
    }

    checkEnd() {
        if (
            this.player1.posX === this.exitPoint.posX
            && this.player1.posY === this.exitPoint.posY
        ) {
            this.player1.playFinishSound();
            this.player1.end();
            this.state.current = this.state.player2Run;
        }
        if (
            this.player2.posX === this.exitPoint.posX
            && this.player2.posY === this.exitPoint.posY
        ) {
            this.player2.playFinishSound();
            this.player2.end();
            
            this.checkWinner();
            this.state.current = this.state.over;
            // this.isRun = false;
        }
    }

    checkWinner() {
        if (this.player1.finishDuration < this.player2.finishDuration) {
            this.winner = this.player1.id;
            this.loser = this.player2.id;
        }
        else if (this.player2.finishDuration < this.player1.finishDuration) {
            this.winner = this.player2.id;
            this.loser = this.player1.id;
        } else {
            this.winner = "tie!";
            this.loser = "tie!";
        }
    }

    stopPlayer(player) {
        this.moveBackPlayer(player);
        player.stop();
        setTimeout(() => {
            player.continue();
        }, STOP_TIME)
    }

    moveBackPlayer(player) {
        if (player.lastDir === 'u') {
            player.posY += UNIT_SIZE;
        }
        if (player.lastDir === 'd') {
            player.posY -= UNIT_SIZE;
        }
        if (player.lastDir === 'l') {
            player.posX += UNIT_SIZE;
        }
        if (player.lastDir === 'r') {
            player.posX -= UNIT_SIZE;
        }
    }

    checkWinner() {
        if (this.player1.finishDuration < this.player2.finishDuration) {
            this.winner = this.player1.id;
            if (!this.isScored) {
                this.player1.score += 500;
                this.isScored = true;
            }
        } else if (this.player2.finishDuration < this.player1.finishDuration) {
            this.winner = this.player2.id;
            if (!this.isScored) {
                this.player2.score += 500;
                this.isScored = true;
            }
        } else {
            this.winner = "tie";
            if (!this.isScored) {
                this.player1.score += 250;
                this.player2.score += 250;
                this.isScored = true;
            }
        }
    }

    showGameOver() {
        results.style.display = "block";
        gameState.innerText = "Game Over!";
        winnerName.innerText = this.winner;
        // loserName.innerText = this.loser;
    }

    reset() {
        this.labyrinth.reset();
        this.player1.reset();
        this.player2.reset();
        this.player1.score = 0;
        this.player1.isStopped = false;
        this.player1.setPos(0, canvas.height - UNIT_SIZE);
        this.player2.score = 0;
        this.player2.isStopped = false;
        this.player2.setPos(0, 0);
        gameState.innerText = "Move on!";
        this.pathFinder.findPath();

        this.isRun = true;
    }

    showInfo() {
        player1StopState.innerText = "stopped: " +  (this.player1.isStopped ? "yes" : "no");
        player2StopState.innerText = "stopped: " + (this.player2.isStopped ? "yes" : "no");
        player1Score.innerText = "score: " + this.player1.score;
        player2Score.innerText = "score: " + this.player2.score;
    }

    start() {
        if (this.isRun === false) {
            // this.reset();
            return;
        }
        this.startTime = new Date().getTime();
        this.draw();
        this.update();

        requestAnimationFrame(this.start.bind(this));
    }
}