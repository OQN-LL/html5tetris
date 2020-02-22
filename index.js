var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

keyboard = new KeyBoard();
document.onkeydown = keyboard.keyDown;

document.onkeyup = keyboard.keyUp;

document.onkeypress = keyboard.keyPress;

window.onblur = keyboard.onblur;

drawer = new Drawer(canvas.width, canvas.height, ctx);
tetris = new Tetris(0, 0, 250, 500);
var fps = 60;
function loop() {
  setTimeout(function() {
    requestAnimationFrame(loop);
    drawer.refresh();
    tetris.update();
    tetris.draw(drawer);
    //ここにループする内容を書く
  }, 1000 / fps); // フレーム毎に実行させる
}
loop();
