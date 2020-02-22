const RED = "rgb(255,0,0)";
const SKYBLUE = "rgb(0,191,255)";
const YELLOW = "rgb(255,255,0)";
const PURPLE = "rgb(128,0,128)";
const ORANGE = "rgb(255,165,0)";
const GREEN = "rgb(30,255,30)";
const BLUE = "rgb(0,0,255)";
const BLACK = "rgb(0,0,0)";
// I,O,T,J,L,S,Zの順
const colorMap = [BLACK, SKYBLUE, YELLOW, PURPLE, BLUE, ORANGE, GREEN, RED];

class Tetris {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.blockWidth = (width - x) / 10;
    this.blockHeight = (height - y) / 20;
    this.currentMino = null;
    this.minoXPosition = 0;
    this.minoYPosition = 0;
    this.minoDirection = 0;
    this.fallFrame = 0;
    this.field = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 0, 0, 0, 0, 6, 6],
      [0, 0, 0, 5, 7, 7, 0, 6, 6, 1],
      [4, 4, 0, 5, 3, 7, 7, 2, 2, 1],
      [4, 0, 0, 3, 3, 3, 1, 2, 2, 1],
      [4, 0, 0, 0, 6, 6, 1, 7, 7, 1],
      [2, 2, 0, 6, 6, 5, 1, 4, 7, 7],
      [2, 2, 0, 5, 5, 5, 1, 4, 4, 4]
    ];
    this.minos = Array(7);
    for (let i = 0; i < this.minos.length; i++) {
      this.minos[i] = new Mino(minos[i], minoNames[i]);
    }
    this.nextMinos = [];
    this.addNextMino();
    this.addNextMino();
    this.currentMino = this.nextMinos.shift();
  }

  addNextMino() {
    shuffle(this.minos);
    for (let mino of this.minos) {
      this.nextMinos.push(mino);
    }
  }

  update() {
    this.fallFrame++;
    if (this.fallFrame >= 60) {
      this.fallFrame = 0;
      if (
        this.minoYPosition + this.currentMino.mino[0].length >=
        this.field.length
      ) {
        this.minoYPosition = 0;
        this.minoXPosition = 0;
        this.minoDirection = 0;
        this.currentMino = this.nextMinos.shift();
        console.log(this.nextMinos);
        if (this.nextMinos.length <= 7) {
          this.addNextMino();
        }
      } else {
        this.minoYPosition++;
      }
    }
  }

  draw(drawer) {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        let c = colorMap[this.field[i][j]];
        drawer.setColor(c);
        drawer.fillRect(
          this.x + j * this.blockWidth,
          this.y + i * this.blockHeight,
          this.blockWidth,
          this.blockHeight
        );
        drawer.setColor(BLACK);
        drawer.strokeRect(
          this.x + j * this.blockWidth,
          this.y + i * this.blockHeight,
          this.blockWidth,
          this.blockHeight
        );
      }
    }

    if (this.currentMino != null) {
      let mino = this.currentMino.mino[this.minoDirection];
      for (let i = 0; i < mino.length; i++) {
        for (let j = 0; j < mino[i].length; j++) {
          if (mino[i][j] != 0) {
            drawer.setColor(colorMap[mino[i][j]]);
            drawer.fillRect(
              this.x + (j + this.minoXPosition) * this.blockWidth,
              this.y + (i + this.minoYPosition) * this.blockHeight,
              this.blockWidth,
              this.blockHeight
            );
            drawer.setColor(BLACK);
            drawer.strokeRect(
              this.x + (j + this.minoXPosition) * this.blockWidth,
              this.y + (i + this.minoYPosition) * this.blockHeight,
              this.blockWidth,
              this.blockHeight
            );
          }
        }
      }
    }
  }
}
