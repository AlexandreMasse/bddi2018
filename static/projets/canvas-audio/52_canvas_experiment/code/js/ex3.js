var canvas=document.getElementById("identifiantCanvas");
var ctx=canvas.getContext("2d");
canvas.setAttribute('tabindex', '0');
canvas.focus();

var canvasWidth = canvas.width
var canvasHeight = canvas.height

var centerWidth = canvasWidth/2
var centerHeight = canvasHeight/2

var angle = 0
var x = 0
var y = 0
var radius = 400
var time = 0

var simplex = new SimplexNoise(),
    value2d = simplex.noise2D(x, y)

var circleTab = []

function Circle(x, y, radius, begincircle, endcircle, color) {
    this.x = x
    this.y = y
    this.begincircle = begincircle
    this.endcircle = endcircle
    this.radius = radius
    this.displacement = 0
    this.color = color
}

Circle.prototype = {
    drawCircle: function() {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle="#ffffff"
        ctx.translate(centerWidth, centerHeight)
        ctx.arc(this.x, this.y, this.radius, this.begincircle, this.endcircle)
        ctx.fill()
        ctx.restore()
        ctx.closePath()
    },

    update: function(i) {
        this.displacement = simplex.noise2D(i + time, i + time) * 100
        this.x = Math.cos(i) * (radius + this.displacement)
        this.y = Math.sin(i) * (radius + this.displacement)
    }
}

for (var i = 0; i < 10; i++) {
    var circleNew = new Circle(Math.cos(i) * (radius), Math.sin(i) * (radius), 2, 0, 2 * Math.PI, "#ffffff")
    circleTab.push(circleNew)
    circleTab[i].drawCircle()
}

function render() {
    requestAnimationFrame(render)
    ctx.clearRect( 0, 0, canvasWidth, canvasHeight )

    ctx.fillStyle="#201E1F"
    ctx.fillRect(0,0,canvasWidth,canvasHeight)

    time += 0.005

    for (var i = 0; i < circleTab.length; i++) {
        circleTab[i].drawCircle()
        circleTab[i].update(i)

        j = i+1
        console.log(j)
        ctx.moveTo(circleTab[i].x, circleTab[i].y)
        ctx.lineTo(circleTab[j].x, circleTab[j].y)
        ctx.strokeStyle = '#ffffff'
        ctx.stroke()
    }
}

render()

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


