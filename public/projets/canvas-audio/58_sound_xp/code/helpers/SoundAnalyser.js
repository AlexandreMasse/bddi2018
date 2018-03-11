function SoundAnalyser(sources, args){
	window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
	this.ctx = new AudioContext();
	this.analyser = this.ctx.createAnalyser();
    this.sources = sources; 
	this.buffers = [];
    this.currentBuffer = null;
	this.gain = this.ctx.createGain();
    this.gain.gain.minValue = 0;
    this.gain.gain.maxValue = 1;
	this.echantillon = 50;
	this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
	this.easeAverage = 0;
	this.average = 0
	this.kicks = [];
    this.onload = args.onload;
	this.load(this.sources[0]);
}

SoundAnalyser.prototype =  {

    // Play the current source and initialize analyser & gain
    playCurrent: function(){
        this.audio.connect( this.gain );
        this.gain.connect( this.ctx.destination );
        this.audio.connect( this.analyser )
        this.analyser.connect( this.ctx.destination )
        this.audio.start();
      
    },

    // Change the song 
    select: function(rank){
        this.currentBuffer = this.buffers[rank]; 
        this.audio.stop();
        this.audio = this.ctx.createBufferSource();
        this.audio.buffer = this.currentBuffer;
        this.playCurrent();
    },

    // Load the rest of the buffers
    loadBuffers: function(){
        for(i=1; i<this.sources.length; i++) {
            this.load(this.sources[i]);
        }
    },

    // Gain manage
    mute: function(){
        this.oldGain = this.gain.gain.value;
        this.gain.gain.value = -1;
        console.log('Mute')
    },
    sound: function(){
        this.gain.gain.value = 1;
        console.log('Sound')
    },

    // Load a new source
	load: function(source){
		var self = this;
		var request = new XMLHttpRequest();
		request.open('GET', source.path, true);
		request.responseType = 'arraybuffer';

		// Decode asynchronously
		request.onload = function() {
			self.ctx.decodeAudioData(request.response, function(buffer) {
			// success callback
			self.buffers.push(buffer);

			// Create sound from buffer
            if( self.currentBuffer === null ) {
                self.currentBuffer = buffer;
                self.audio = self.ctx.createBufferSource();
                self.audio.connect( self.gain )
                self.audio.buffer = self.currentBuffer;
                // self.playCurrent();
                self.loadBuffers();
                self.onload();
            }

		}, function(e){
			console.log(e)
        });
        }
        request.send();
    },

    // Kick manage
    addKick: function(value){
    	this.kicks.push({
    		value: value,
    		name: name
    	})
    },
    hasKicked: function(kick, value){
    	if( kick < value ) {
    		return true;
    	}
    	return false;
    },

    // Get all the frequencies 
    getFrequencies: function(){
    	this.analyser.getByteFrequencyData(this.frequencyData);
    	return this.frequencyData
    },

    // Get the frequencies with a reduce sample
    getFrequenciesUsed: function(){
    	this.getFrequencies();
    	var frequences = [];
    	var step, id;
    	for(i=0; i < this.echantillon; i++) {
    		step = i/this.echantillon;     		
    		id = Math.floor(1024 * step);
    		frequences.push(this.frequencyData[id]);
    	}
    	return frequences;
    },

    // Return the frequencies's average
    getAverageFrequency: function() {
    	var freqs = this.getFrequenciesUsed();
    	var cumul = 0;
    	for(i=0; i<freqs.length; i++){
    		cumul+= freqs[i];
    	}
    	return cumul/freqs.length;
    },

    // getAverageFrequency with ease 
    getEaseFrequency: function(ease) {
        var freqs = this.getFrequenciesUsed();
        var cumul = 0;
        for(i=0; i<freqs.length; i++){
            cumul+= freqs[i];
        }
        this.average = cumul/freqs.length; 
        this.easeAverage += (this.average - this.easeAverage) * ease;  //cumul/freqs.length
        return this.easeAverage;
    }
}