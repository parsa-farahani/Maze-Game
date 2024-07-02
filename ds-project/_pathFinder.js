class PathFinder {
    constructor(gMaze, stX, stY, edX, edY) {
        this.maze = gMaze;
        this.startX = stX;
        this.startY = stY;
        this.endX = edX;
        this.endY = edY;
        this.path = [];
    }

    draw() {
        if (!this.path.length) return;

        this.path.forEach(cell => {
            const drawX = cell.y * UNIT_SIZE;
            const drawY = cell.x * UNIT_SIZE;
            ctx.strokeStyle = 'gold';
            ctx.strokeRect(drawX, drawY, UNIT_SIZE, UNIT_SIZE);
        })
    }

    update() {

    }

    findPath() {
        this.path = this.solveMaze(this.maze, this.startX, this.startY, this.endX, this.endY).items;
    }

    solveMaze(gMaze, startX, startY, endX, endY) {
        const directions = [
            { dx: -1, dy: 0, dir: 'up' },
            { dx: 1, dy: 0, dir: 'down' },
            { dx: 0, dy: -1, dir: 'left' },
            { dx: 0, dy: 1, dir: 'right' }
        ];
    
        const start = { x: startX, y: startY, dir: null };
        const end = { x: endX, y: endY };
        const stack = new Stack();
        stack.push(start);
        const path = new Stack();
        const visited = new Set();
    
        function isValidMove(x, y) {
            return (
                x >= 0 &&
                x < gMaze.length &&
                y >= 0 &&
                y < gMaze[0].length &&
                gMaze[x][y] === 1 &&
                !visited.has(`${x},${y}`)
            );
        }
    
        while (stack.size() > 0) {
            const current = stack.pop();
            path.push(current);
            visited.add(`${current.x},${current.y}`);
    
            if (current.x === end.x && current.y === end.y) {
                return path;
            }
    
            for (const { dx, dy, dir } of directions) {
                const newX = current.x + dx;
                const newY = current.y + dy;
    
                if (isValidMove(newX, newY)) {
                    stack.push({ x: newX, y: newY, dir: dir });
                }
            }
        }
        return "null"; // No path found
    }
}