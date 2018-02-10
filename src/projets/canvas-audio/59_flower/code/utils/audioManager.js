function audioManager(source) {
	this.audioSource = source;
	this.audioCtx = new AudioContext();
	this.loaded = false;

	window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

	this.analyser = this.audioCtx.createAnalyser();
	this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
	this.cumul = 0;
	this.allFreqs = 0;
	this.globalFreqs = 0;
	this.loadAudio()

}

audioManager.prototype = {


	loadAudio: function() {
		self = this;

		request = new XMLHttpRequest();
	    request.open('GET', this.audioSource, true);
	    request.responseType = 'arraybuffer';

	      // Decode asynchronously
	    request.onload = function() {
	        self.audioCtx.decodeAudioData(request.response, function(buffer) {
	          // success callback
	          self.audioBuffer = buffer;

	          // Create sound from buffer
	          self.audioSource = self.audioCtx.createBufferSource();
	          self.audioSource.buffer = self.audioBuffer;

	          // connect the audio source to context's output
	          self.audioSource.connect( self.analyser )
	          self.analyser.connect( self.audioCtx.destination )

	          // play sound
	          self.audioSource.start();
	          self.loaded = true;
	          // addListeners()

	          // frame()

	        }, function(){

	          // error callback
	          //
	        });
	      }

	    request.send();
	},

	getKickFrequency: function() {
		this.analyser.getByteFrequencyData(this.frequencyData);
		return this.frequencyData[5]/255;
	},

	getAverageFrequency: function() {
		this.analyser.getByteFrequencyData(this.frequencyData);
		this.allFreqs = 0;
		for ( var i = 100; i < 300; i++ ){
    	this.allFreqs += this.frequencyData[i];
  	}
  	return this.allFreqs/255
	},

	getAllAverageFrequency: function() {
		this.analyser.getByteFrequencyData(this.frequencyData);
		this.globalFreqs = 0;
		for ( var i = 0; i < 1024; i++ ){
    	this.globalFreqs += this.frequencyData[i];
  	}
  	return this.globalFreqs/255
	},

	getSnareFrequency: function() {

		this.cumul = 0;
		this.analyser.getByteFrequencyData(this.frequencyData);

		for ( var i = 0; i < 220; i++ ){
    	this.cumul += this.frequencyData[i];
  	}
  	return this.cumul/255
	},

	update: function(){
		var value = this.getKickFrequency();
		return value;
	},

	get kickFrequency(){
		return this.getKickFrequency();
	},

	get snareFrequency(){
		return this.getSnareFrequency();
	},

	get averageFrequency() {
		return this.getAverageFrequency();
	},

	get averageAllFrequency() {
		return this.getAllAverageFrequency();
	}
}

