var canvas = document.createElement('canvas');
canvas.setAttribute("id", "canvas");
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d'),
    points = [],
    mouse = {
        x: 0,
        y: 0
    },
    pointSize = 1,
    spaceBetweenY = 30,
    spaceBetweenX = 30;

function setup() {
    points = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        nbPointX = canvasWidth / spaceBetweenX,
        nbPointY = canvasHeight / spaceBetweenY;

    for (var y = 0; y < nbPointY; y++) {
        for (var x = 0; x < nbPointX ; x++) {
            var padding = 0.5;
            var point = {
                x: ((canvasWidth - pointSize) / (nbPointX + padding)) * x + (canvasWidth / nbPointX) * (padding),
                y: ((canvasHeight - pointSize) / (nbPointY + padding)) * y + (canvasHeight / nbPointY) * (padding),
                size: pointSize
            };
            points.push(point)
        }
    }
}

function render() {

    requestAnimationFrame(render);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        var scale = getDistance(point, mouse);

        //Etendue
        scale = 130 - scale;

        //Dureté
        scale = scale / 70;

        //Grossissement
        var newScale = point.size * scale * 2.2;

        if(newScale < pointSize) newScale = pointSize;

        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.arc(point.x, point.y, newScale, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
        ctx.closePath()
    }
}


function getDistance(obj1, obj2) {
    var distanceX = obj1.x - obj2.x;
    var distanceY = obj1.y - obj2.y;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function addlistener(){
    window.addEventListener('resize', function() {
        setup();
    });

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })
}

exports.init = function(){
    setup();
    addlistener();
    render();
};
