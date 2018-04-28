<template>
  <canvas id="canvas"></canvas>
</template>

<script>
  export default {
    name: 'CanvasBackground',
    data () {
      return {
        isMobile: false,
        points: [],
        mouse: {
          x: 0,
          y: 0
        },
        pointSize: 0.5,
        spaceBetweenY: 30,
        spaceBetweenX: 30
      }
    },
    methods: {
      setup: function () {
        this.points = []
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        var canvasWidth = this.canvas.width,
            canvasHeight = this.canvas.height,
            nbPointX = canvasWidth / this.spaceBetweenX,
            nbPointY = canvasHeight / this.spaceBetweenY
        for (var y = 0; y < nbPointY; y++) {
          for (var x = 0; x < nbPointX; x++) {
            var padding = 0.5
            var point = {
              x: ((canvasWidth - this.pointSize) / (nbPointX + padding)) * x + (canvasWidth / nbPointX) * (padding),
              y: ((canvasHeight - this.pointSize) / (nbPointY + padding)) * y + (canvasHeight / nbPointY) * (padding),
              size: this.pointSize
            }
            this.points.push(point)
          }
        }
      },
      renderDesktop: function () {
        this.raf = requestAnimationFrame(this.renderDesktop)

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (var i = 0; i < this.points.length; i++) {
          var point = this.points[i]

          var scale = this.getDistance(point, this.mouse)

          // Etendue
          scale = 130 - scale

          // Dureté
          scale = scale / 70

          // Grossissement
          var newScale = point.size * scale * 2.2

          if (newScale < this.pointSize) newScale = this.pointSize

          this.ctx.beginPath()
          this.ctx.save()
          this.ctx.fillStyle = 'rgb(255,255,255)'
          this.ctx.arc(point.x, point.y, newScale, 0, 2 * Math.PI, false)
          this.ctx.fill()
          this.ctx.restore()
          this.ctx.closePath()
        }
      },
      renderMobile () {
        cancelAnimationFrame(this.raf)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (var i = 0; i < this.points.length; i++) {
          var point = this.points[i]

          this.ctx.beginPath()
          this.ctx.save()
          this.ctx.fillStyle = 'rgb(255,255,255)'
          this.ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI, false)
          this.ctx.fill()
          this.ctx.restore()
          this.ctx.closePath()
        }
      },
      getDistance: function (obj1, obj2) {
        var distanceX = obj1.x - obj2.x
        var distanceY = obj1.y - obj2.y
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      },
      checkMobile (screenWidth) {
        if (screenWidth >= 700) {
          this.isMobile = false
        } else {
          this.isMobile = true
        }
      },
      addlistener: function () {
        window.addEventListener('resize', (e) => {
          this.setup()
          this.checkMobile(e.target.innerWidth)

          if (this.isMobile) {
            this.renderMobile()
          }
        })
        window.addEventListener('mousemove', (e) => {
          this.mouse.x = e.clientX
          this.mouse.y = e.clientY
        })
      },
      init: function () {
        this.setup()
        this.addlistener()

        if (this.isMobile) {
          this.renderMobile()
        } else {
          this.renderDesktop()
        }
      }
    },
    mounted () {
      this.canvas = document.querySelector('#canvas')
      this.ctx = this.canvas.getContext('2d')
      this.checkMobile(window.innerWidth)
      this.init()
    },
    watch: {
      'isMobile' (from, to) {
        if (this.isMobile) {
          this.renderMobile()
        } else {
          this.renderDesktop()
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  canvas {
    //z-index: -100;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.2;
  }
</style>
