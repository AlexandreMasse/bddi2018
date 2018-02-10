// An object instance of AudioAnalyser class for each sound (if many)

/**
  Audio context
  */
function AudioAnalyser() {

  this.audioCtx = new AudioContext();
  this.audioBuffer;
  this.audioSource;
  this.analyser = this.audioCtx.createAnalyser();
  this.analyser.smoothingTimeConstant = .85; // Add smooth effect
  this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

}

// Class Method : overwrite parent's prototype methods if they exist
AudioAnalyser.prototype = {

  loadSound: function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    // Retrieve in a tab the binary suite
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    // XMLHttpRequest : fonction callback -> wait for a function once executed
    request.onload = function() {

      // console.log( request.response )
      // decodeAudioData : function callback
      this.audioCtx.decodeAudioData(request.response, function(buffer) {

        // success callback

        // buffer: binary data which can be used with decodeAudioData
        this.audioBuffer = buffer;

        // Create sound from buffer : pouvoir jouer un son
        // console.log( this );
        this.audioSource = this.audioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.loop = true;

        // connect the audio source to context's output
        // analyze will retrieve the data to extract them -> connect to the speaker
        this.audioSource.connect( this.analyser )
        this.analyser.connect( this.audioCtx.destination )

        // play sound : send data stream
        this.audioSource.start();

        this.onloaded()


      }.bind(this) ) // Update context (previous this : request)

    }.bind(this) // Context : AudioAnalyser

    request.send();
  },

  onloaded: function() {},

  /**
    Update analyzer frequencies
    */
  updateFrequencyData: function() {
    this.analyser.getByteFrequencyData(this.frequencyData);
  }

}
