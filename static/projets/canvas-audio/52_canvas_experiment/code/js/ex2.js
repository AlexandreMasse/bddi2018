var canvas=document.getElementById("identifiantCanvas");
var ctx=canvas.getContext("2d");
canvas.setAttribute('tabindex', '0');
canvas.focus();

var canvasWidth = canvas.width
var canvasHeight = canvas.height
var posX = 0
var posY = 0
var mouseX = posX
var mouseY = posY

var triSize = 50

function drawTriangle() {
    console.log(posX, posY)

    ctx.fillStyle="#201E1F";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    var dx = mouseX - posX
    var dy = mouseY - posY
    var angle = Math.atan2(dy, dx)

    posX += ( mouseX - posX ) * 0.05
    posY += ( mouseY - posY ) * 0.05

    ctx.save()
    ctx.translate(posX,posY)
    ctx.rotate(angle + Math.PI / 2 )
    ctx.scale( .5, 1 )

    ctx.beginPath();
    ctx.fillStyle="#ffffff"
    ctx.moveTo( -triSize, triSize);
    ctx.lineTo( 0, -triSize);
    ctx.lineTo( triSize, triSize);
    ctx.fill();
    ctx.closePath()
    ctx.restore()
}

function getMousePosition(event) {
    mouseX = event.clientX;     // Get the horizontal coordinate
    mouseY = event.clientY;     // Get the vertical coordinate
}

function update() {
    requestAnimationFrame( update )
    ctx.clearRect( 0, 0, canvasWidth, canvasHeight )
    drawTriangle()
}

canvas.addEventListener("mousemove", getMousePosition);
update()

// function update() {
//     requestAnimationFrame(update)
//     ctx.clearRect( 0, 0, canvas.width, canvas.width)
//     ctx.fillStyle="#201E1F";
//     ctx.fillRect(0,0,canvas.width,canvas.height);
// }


// ctx.beginPath()
// ctx.strokeStyle = '#ffffff'
// ctx.lineWidth=4
// ctx.radius(1.2,1.2);
// ctx.moveTo( canvas.width / 2 - 50, canvas.height / 2 + 50 )
// ctx.lineTo( canvas.width / 2, canvas.height / 2 - 50 )
// ctx.lineTo( canvas.width / 2 + 50, canvas.height / 2 + 50 )
// ctx.lineTo( canvas.width / 2 - 50, canvas.height / 2 + 50 )
// ctx.stroke()
// ctx.closePath()


