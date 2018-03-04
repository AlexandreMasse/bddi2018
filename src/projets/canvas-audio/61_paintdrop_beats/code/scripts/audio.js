function Audio (url) {
    window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

    this.audioCtx       = new AudioContext();
    this.analyser       = this.audioCtx.createAnalyser();
    this.frequencyData  = new Uint8Array(this.analyser.frequencyBinCount);

    this.osc            = this.audioCtx.createOscillator();
    this.gainNode       = this.audioCtx.createGain();

    this.DELTA_TIME     = 0;
    this.LAST_TIME      = Date.now();
    this.url            = url;
}

Audio.prototype = {
  loadSound : function () {

    //Starts XHR request
    this.request = new XMLHttpRequest();
    this.request.open('GET', this.url, true);
    this.request.responseType   = 'arraybuffer';

    // Decode asynchronously
    this.request.onload = function() {
      this.audioCtx.decodeAudioData(this.request.response, function(buffer) {

        // success callback
        this.audioBuffer        = buffer;

        // Create sound from buffer
        this.audioSource        = this.audioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;

        //Connects the audioSource to the gainNode
        this.audioSource.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);

        // connect the audio source to context's output
        this.audioSource.connect(this.analyser)
        this.analyser.connect(this.audioCtx.destination)

        // play sound
        this.audioSource.start();

      }.bind(this));
    }.bind(this);
    this.request.send();
  },
  getFrequency : function () {
      this.DELTA_TIME         = Date.now() - this.LAST_TIME;
      this.LAST_TIME          = Date.now();

      this.analyser.getByteFrequencyData(this.frequencyData);

      return this.frequencyData;
  }
}
