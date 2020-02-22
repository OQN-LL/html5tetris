class Drawer {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.ctx.fillstyle = "rgb(255,0,255)";
  }

  setColor(color) {
    ctx.fillStyle = color;
  }

  fillRect(x, y, width, height) {
    ctx.fillRect(x, y, width, height);
  }

  strokeRect(x, y, width, height) {
    ctx.strokeRect(x, y, width, height);
  }

  refresh() {
    this.fillRect(0, 0, this.width, this.height);
  }
}
