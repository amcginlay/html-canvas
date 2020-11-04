var ctx = document.getElementById("canvas").getContext("2d");
document.body.scrollTop = 0;
document.body.style.overflow = 'hidden';

var dataToDraw = new Array();
var dataDrawn = new Array();

function clientToScreen(ctx, clientCoords) {
  //convert FROM ±1 in each axis with origin at centre of canvas
  return {
      x: ctx.canvas.width / 2.0 * clientCoords.x + ctx.canvas.width / 2.0,
      y: ctx.canvas.height - (ctx.canvas.height / 2.0 * clientCoords.y + ctx.canvas.height / 2.0)
  };
}

function screenToClient(ctx, screenCoords) {
  //convert TO ±1 in each axis with origin at centre of canvas
  return {
      x: 2.0 * (screenCoords.x - ctx.canvas.width / 2.0) / ctx.canvas.width,
      y: 2.0 * (ctx.canvas.height - (screenCoords.y) - ctx.canvas.height / 2.0) / ctx.canvas.height
  };
}

$(window).mousemove(event => {
  if (event.buttons != 1) return;
  var screenCoords = {x: event.clientX, y: event.clientY}
  var clientCoords = screenToClient(ctx, screenCoords)
  dataToDraw.push(clientCoords)
});

(function draw() {
      
  // resize
  if (ctx.canvas.width != window.innerWidth || ctx.canvas.height != window.innerHeight) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    dataToDraw = dataDrawn
    dataDrawn = new Array();
  }

  while (dataToDraw.length > 0) {
    var clientCoords = dataToDraw.shift();
    var screenCoords = clientToScreen(ctx, clientCoords)
    ctx.fillRect(screenCoords.x,screenCoords.y,2,2);
    dataDrawn.push(clientCoords)
  }

  // // Clear away the previous drawing.
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // // origincoords x and y should be in the range of (-1 to +1)
  // var origin = {x: 0.0, y: 0.0};
  // var outerRadius = 1

  // drawEquilateralTriangle(ctx, origin, outerRadius, rotationDegrees)

  // rotationDegrees = (rotationDegrees + 2) % 360;
  requestAnimationFrame(draw);
})();
