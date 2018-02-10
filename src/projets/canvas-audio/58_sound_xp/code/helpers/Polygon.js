var circleImage = document.getElementById("sourceCircle");

function Polygon(args) {
  this.nbPoints = args.nbPoints;
  this.size = args.size;
  this.scale = args.scale ? args.scale : 1;
  this.rotate = args.rotate ? args.rotate : 0;
  this.x = args.x;
  this.y = args.y;
  this.stroke = args.stroke;
  this.fill = args.fill;
  this.alpha = args.alpha ? args.alpha : 1;
}

Polygon.prototype = {

  // Return coords 
  getCoords: function(){
    angle = Math.PI*2/this.nbPoints; 
    var coords = [];
    for(var i=0; i<this.nbPoints; i++){
      coords.push([Math.cos(angle*i)*this.size, Math.sin(angle*i)*this.size])
    }
    return coords; 
  },

  // Main render
  render: function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate*Math.PI/180)
    ctx.scale(this.scale, this.scale);
    var coords = this.getCoords();
    switch (store.drawType.val) {
      case LINE_DRAW: this.drawLine(ctx, coords); break;
      case POINT_DRAW: this.drawPoint(ctx, coords); break;
      default: this.drawPointLine(ctx, coords);
    }
  },

  // Draw a polygon with lines
  drawLine: function(ctx, coords){
    var coords = this.getCoords();
    ctx.moveTo(coords[0][0], coords[0][1]);
    for(i=0; i< coords.length; i++){
      ctx.lineTo(coords[i][0], coords[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = this.stroke ? this.stroke : "#000";
    ctx.globalAlpha=this.alpha;
    ctx.stroke();
    ctx.restore()
  },

  // Draw a polygon with points
  drawPoint: function(ctx, coords) {
    var coords = this.getCoords();
    ctx.globalAlpha=this.alpha;
    for(i=0; i< coords.length; i++){
      ctx.drawImage(circleImage, coords[i][0] - 2, coords[i][1] - 2, 4, 4)
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore()
  },

  // Draw polygon with lines and points
  drawPointLine: function(ctx, coords){
    var coords = this.getCoords();
    
    // Define alpha for point and lines
    var alphaPoint, alphaLine;
    switch (store.drawType.val) {
      case POINT_LINE_DRAW:
      alphaPoint = (1 - drawAnim) * this.alpha;
      alphaLine = drawAnim * this.alpha;
      break;
      case LINE_POINT_DRAW:
      alphaPoint = drawAnim * this.alpha;
      alphaLine = (1 - drawAnim) * this.alpha;
      break;
    }

    ctx.globalAlpha = alphaLine;
    ctx.moveTo(coords[0][0], coords[0][1]);
    for(i=1; i < coords.length; i++){
      ctx.lineTo(coords[i][0], coords[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = alphaPoint;
    for(i=0; i< coords.length; i++){
      ctx.drawImage(circleImage, coords[i][0] - 2, coords[i][1] - 2, 4, 4)
    }
    ctx.restore();
  }
}
