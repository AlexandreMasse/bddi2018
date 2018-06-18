var canvas=document.getElementById("identifiantCanvas");
var ctx=canvas.getContext("2d");
canvas.setAttribute('tabindex', '0');
canvas.focus();

var canvasWidth = canvas.width
var canvasHeight = canvas.height
var posX = canvas.width/10
var posY = canvas.height/10
var circleTab = []

function Circle(x, y, radius, begincircle, endcircle, color, velocityX, velocityY) {
    this.x = x
    this.y = y
    this.begincircle = begincircle
    this.endcircle = endcircle
    this.radius = radius
    this.color = color
    this.velocityX = velocityX
    this.velocityY = velocityY
}

Circle.prototype.drawCircle = function () {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle=this.color
    ctx.translate(this.x,this.y)
    ctx.arc(0, 0, this.radius, this.begincircle, this.endcircle)
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    for (var i = 0; i < circleTab.length; i++) {
        for (var j = 0; j < circleTab.length; j++) {
            if(circleTab[i] != circleTab[j]){
                var dx = circleTab[i].x - circleTab[j].x
                var dy = circleTab[i].y - circleTab[j].y
                dist = Math.sqrt(dx*dx + dy*dy)
                ctx.beginPath()
                    if(dist < 100) {
                        ctx.strokeStyle = '#ffffff'
                        ctx.moveTo(circleTab[i].x, circleTab[i].y)
                        ctx.lineTo(circleTab[j].x, circleTab[j].y)
                    }
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}

Circle.prototype.update = function () {
    this.x += this.velocityX
    this.y += this.velocityY
    if ( this.x > canvasWidth-this.radius || this.x < 0) {
        this.velocityX *= -1
    }

    if ( this.y > canvasHeight-this.radius || this.y < 0) {
        this.velocityY *= -1
    }
}

function update() {
    requestAnimationFrame(update)
    ctx.clearRect( 0, 0, canvas.width, canvas.width)
    ctx.fillStyle="#201E1F";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < circleTab.length; i++) {
        circleTab[i].update()
        circleTab[i].drawCircle()
    }
}

for (var i = 0; i < 50; i++) {
    randx = Math.floor(Math.random() * (1500 - 0));
    randy = Math.floor(Math.random() * (800 - 0));
    velocityX = Math.floor(Math.random() * (3 - 5) +1);
    velocityY = Math.floor(Math.random() * (3 - 5) +1);

    var circleNew = new Circle(randx, randy, 3, 0, 2*Math.PI, "#ffffff", velocityX, velocityY)
    circleTab.push(circleNew)
}

update()

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


