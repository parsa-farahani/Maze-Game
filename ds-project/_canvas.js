
class Canvas {
    constructor() {
        this._canvas = document.querySelector('#screen');
        this._ctx = this._canvas.getContext('2d');
        this.width = this._canvas.offsetWidth;
        this.height = this._canvas.offsetHeight;
    }

    draw() {

    }

    clear() {
        this._ctx.clearRect(0, 0, this.width, this.height);
    }
}

const canvas = new Canvas();
const ctx = canvas._ctx;