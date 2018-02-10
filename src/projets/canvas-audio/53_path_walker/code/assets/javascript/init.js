window.onload = function(){
    var startExp = document.querySelector('.start-exp')
    startExp.addEventListener('click', function(){
        var soundjs = document.createElement("script");
        soundjs.src = '../assets/javascript/sound.js';
        var p5 = document.createElement('script')
        p5.src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js'
        document.body.appendChild(p5)
        document.body.appendChild(soundjs);
    })
  }
