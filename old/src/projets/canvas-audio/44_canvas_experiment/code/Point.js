function Point( opt ) { 
    var velocityX = Math.random() * 2 - 1;
    var velocityY = Math.random() * 2 - 1;
    
    this.position = vec2.fromValues(opt.x, opt.y)
    this.velocity = vec2.fromValues(velocityX, velocityY)

}


Point.prototype = {
    update: function () {
        if (this.position[0] > canvasWith || this.position[0] < 0 ) {
            this.velocity[0] = - this.velocity[0]
        }
        
        if (this.position[1] > canvasHeight || this.position[1] < 0) {
            this.velocity[1] = - this.velocity[1]
        }
        vec2.add(this.position, this.position, this.velocity)
        
    }, 
    
    render: function( points, average, color ) {
        if( !color ) { couleur = '#fff' }
        ctx.beginPath()
        ctx.fillStyle = '#ffffff'
        ctx.arc(this.position[0], this.position[1], 3, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        
        //calc dist entre ce point et les autres points 
        
        for(var i = 0; i < points.length; i++) {
            var dx   = this.position[0] - points[i].position[0] 
            var dy   = this.position[1] - points[i].position[1] 
            var dist = Math.sqrt( dx*dx + dy*dy )
            

//            si le point la distance est inferieur a x 
            if( dist < average * 4 && dist != 0 ) {
                var pourcentage = dist / 150
                ctx.globalAlpha = 1 * (1 - pourcentage)
                ctx.strokeStyle = '#ffffff'
                ctx.beginPath()
                ctx.moveTo(points[i].position[0], points[i].position[1])  
                ctx.lineTo(this.position[0], this.position[1])
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}