window.addEventListener('keydown', e => {
    if (newGame.state.current === newGame.state.player1Run) {
        if (e.code === 'KeyW') {
            newGame.player1.move('u');
        }
        if (e.code === 'KeyS') {
            newGame.player1.move('d');
        }
        if (e.code === 'KeyA') {
            newGame.player1.move('l');
        }
        if (e.code === 'KeyD') {
            newGame.player1.move('r');
        }
    }

    if (newGame.state.current === newGame.state.player2Run) {
        if (e.code === 'ArrowUp') {
            newGame.player2.move('u');
        }
        if (e.code === 'ArrowDown') {
            newGame.player2.move('d');
        }
        if (e.code === 'ArrowLeft') {
            newGame.player2.move('l');
        }
        if (e.code === 'ArrowRight') {
            newGame.player2.move('r');
        }
    }
})