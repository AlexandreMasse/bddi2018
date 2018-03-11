  window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

    var canvasWith = window.innerWidth;
    var canvasHeight = window.innerHeight;

    /**
     *
     * Sound stuff
     *
     */
    var audioCtx = new AudioContext();
    var audioBuffer;
    var audioSource;
    var analyser = audioCtx.createAnalyser();
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    /**
      Time stuff
    */
    var DELTA_TIME = 0;
    var LAST_TIME = Date.now();

    /**
      Canvas stuff
    */
    var canvas
    var ctx
    
    var points = [];
    var nbPoint = 150;
    var slow = false; 

    

    var opts = {
      barWidth: 10
    }

    function initCanvas() {

      canvas = document.querySelector('canvas')
      ctx = canvas.getContext('2d')
        
        
      for(var i = 0; i < nbPoint; i++) {
          var opt = {
              x:      Math.random() * (canvasWith-20), 
              y:      Math.random() * (canvasHeight-20),
          }

          var point = new Point(opt)
          points.push(point)
          
      }
        
      console.log(points)


      onResize()

    }

    function loadSound(url) {
      var request = new XMLHttpRequest();
      request.open('GET', './sound.mp3', true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function() {

        audioCtx.decodeAudioData(request.response, function(buffer) {

          // success callback
          audioBuffer = buffer;

          // Create sound from buffer
          audioSource = audioCtx.createBufferSource();
          audioSource.buffer = audioBuffer;

          // connect the audio source to context's output
          audioSource.connect( analyser )
          analyser.connect( audioCtx.destination )

          // play sound
          audioSource.start();

          addListeners()
          frame()

        }, function(){

          // error callback
          //
        });
      }
      request.send();
    }


    /**
     * addListeners
     */
    function addListeners() {

      window.addEventListener( 'resize', onResize.bind(this) );
      rafId = requestAnimationFrame( frame )

    }

    /**
     * update
     * - Triggered on every TweenMax tick
     */
    function frame() {

      rafId = requestAnimationFrame( frame )

      DELTA_TIME = Date.now() - LAST_TIME;
      LAST_TIME = Date.now();


      analyser.getByteFrequencyData(frequencyData);


      var barWidth = opts.barWidth;
      var margin = 2
      var nbBars = nbPoint

      var cumul = 0;
      var average = 0;
      ctx.clearRect( 0, 0, canvasWith, canvasHeight )
      ctx.save();
      ctx.fillStyle = '#ff0000'
      ctx.beginPath()
      for ( var i = 0; i < nbBars; i++ ) {
        // get the frequency according to current i
        let percentIdx = i / nbBars;
        let frequencyIdx = Math.floor(1024 * percentIdx)

//        if(i > 30 && i < 50){
//            ctx.rect( i * barWidth + ( i * margin ), canvasHeight - frequencyData[frequencyIdx] , barWidth, frequencyData[frequencyIdx] );
//        }

        cumul += frequencyData[frequencyIdx];
      }
        
        ctx.fill()
        ctx.closePath()
        ctx.restore()
        average = cumul / 255;
        for(var i = 0; i < nbPoint; i++) {
            points[i].update();
            points[i].render(points, average);
        }   
    }


    /**
     * onResize
     * - Triggered when window is resized
     * @param  {obj} evt
     */
    function onResize( evt ) {

      canvasWith = window.innerWidth;
      canvasHeight = window.innerHeight;

      canvas.width = canvasWith
      canvas.height = canvasHeight
      canvas.style.width = canvasWith + 'px'
      canvas.style.height = canvasHeight + 'px'

    }

    
    initCanvas()
    loadSound()

