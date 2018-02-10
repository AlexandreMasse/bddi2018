import MusicBars from "./components/MusicBars";
import Blob from "./components/Blob/Blob";
import SubCircle from "./components/SubCircle";
import Utils from "../Utils";

const BARS_COLOR = "#FF6F59";
const SUB_CIRCLE_COLOR = "#087E8B";
const BLOB_STROKE = "#FF6F59";
const BLOB_FILL = "#D6E5F1";
const PERSISTANCE = 0.3;

class Visualizer {

    constructor() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        window.contexts = {};
        this.audioSources = {};
        this.analysers = {};
        this.audios = {};
        this.frequenciesData = {};
        this.isSeeking = false;
        this.isPause = false;
        this.fillStyle = `rgba(11, 57, 84, ${PERSISTANCE})`;
        this.selectedMusicType = "music";

        this.file = null;

        this.inputElement = document.getElementById('audioTime');
        this.albumArtElement = document.getElementById('albumArt');
        this.buttonPickerElement = document.getElementById('filePicker');
        this.cinemaElement = document.getElementById('cinema');
        this.fullscreenElement = document.getElementById('fullscreen');
        this.filePickerElement = document.createElement('input');
        this.filePickerElement.type = "file";
        this.currentTimeElement = document.getElementById('currentTime');
        this.songTitleElement = document.getElementById('songTitle');
        this.songDurationElement = document.getElementById('songDuration');
        this.pauseButtonElement = document.getElementById('pauseButton');
        this.defaultSongButtonElement = document.getElementById('defaultSong');
        this.overlayElement = document.getElementById('overlay');

        this.registerAudioContexts();
        this.loadSounds();

        this.registerListeners();

        this.registerIntervals();

        this.render();

    }

    registerAudioContexts() {
        for (let type of ["drums", "music", "sub", "custom"]) {
            window.contexts[type] = new AudioContext();
            this.audios[type] = new Audio();
            this.audios[type].crossOrigin = "anonymous";
            this.audios[type].controls = true;
            this.audios[type].loop = true;
            this.audios[type].autoplay = false;
            this.audioSources[type] = null;
            this.analysers[type] = window.contexts[type].createAnalyser();
            this.frequenciesData[type] = new Uint8Array(this.analysers[type].frequencyBinCount);
        }
    }

    togglePause() {
        if (!this.isPause) {
            if(this.selectedMusicType === "music") {
                this.audios["music"].pause();
                this.audios["drums"].pause();
                this.audios["sub"].pause();
            } else {
                this.audios["custom"].pause();
            }
        } else {
            if(this.selectedMusicType === "music") {
                this.audios["music"].play();
                this.audios["drums"].play();
                this.audios["sub"].play();
            } else {
                this.audios["custom"].play();
            }
        }
        this.pauseButtonElement.innerHTML = (!this.isPause) ? '<img src="assets/icons/play-button.svg" alt="">' : '<img src="assets/icons/pause.svg" alt="">';

    }

    loadSounds() {
        this.intervalId = setInterval(() => this.playWhenAllLoaded(), 300);
        for (let type of ["drums", "music", "sub"]) {
            this.loadSound(type);
        }
        this.filePickerElement.value = "";
        this.selectedMusicType = "music";
        this.songTitleElement.innerHTML = "KSHMR - Strange Lands";
        this.albumArtElement.src = "./assets/images/kshmr-strange-lands.jpg";
        this.fillStyle = `rgba(11, 57, 84, ${PERSISTANCE})`;
        this.defaultSongButtonElement.classList.add('hidden');
    }

    loadSound(type) {
        let request = new XMLHttpRequest();
        request.onload = () => {

            // success callback
            this.audios[type].src = request.responseURL;
            if(!this.audioSources[type]) this.audioSources[type] = window.contexts[type].createMediaElementSource(this.audios[type]);

            // connect the audio source to context's output
            this.audioSources[type].connect(this.analysers[type]);
            this.analysers[type].connect(window.contexts[type].destination);


        };
        request.open('GET', `./sounds/${type}.mp3`, true);
        request.responseType = 'arraybuffer';
        request.send();
    }

    registerListeners() {
        this.cinemaElement.addEventListener('click', () => {
            this.toggleOverlay();
        });
        this.fullscreenElement.addEventListener('click', () => {
            this.toggleFullscreen();
        });
        this.buttonPickerElement.addEventListener('click', () => {
            this.filePickerElement.click();
        });
        this.inputElement.addEventListener('click', () => {
            if(this.selectedMusicType === "music") {
                this.audios["music"].currentTime = this.inputElement.value * (this.audios["music"].duration / 100);
                this.audios["sub"].currentTime = this.inputElement.value * (this.audios["sub"].duration / 100);
                this.audios["drums"].currentTime = this.inputElement.value * (this.audios["drums"].duration / 100);
            } else {
                this.audios["custom"].currentTime = this.inputElement.value * (this.audios["custom"].duration / 100);
            }
            this.currentTimeElement.innerHTML = this.calculateCurrentTime();
        });
        this.inputElement.addEventListener('mouseover', () => {
            this.isSeeking = true;
        });
        this.inputElement.addEventListener('mouseout', () => {
            this.isSeeking = false;
        });
        this.inputElement.addEventListener('mousedown', () => {
            this.isSeeking = true;
        });
        this.inputElement.addEventListener('mouseup', () => {
            this.isSeeking = false;
        });
        this.filePickerElement.addEventListener('change', (e) => {
            let file = e.target.files[0];
            if (file.type.match(/^audio\//)) {
                this.file = file;
                this.playCustomSong(this.file);
            }
        });
        this.pauseButtonElement.addEventListener('click', () => {
            this.togglePause();
        });

        this.defaultSongButtonElement.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.selectedMusicType === "custom") {
                this.clear();
                this.loadSounds();
            }
        });

        document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
            case 32:
                this.togglePause();
                break;
            case 37:
                this.backward(5000);
                break;
            case 39:
                this.forward(5000);
                break;
            case 68:
                this.defaultSongButtonElement.click();
                break;
            case 70:
                this.toggleFullscreen();
                break;
            case 72:
                this.toggleOverlay();
                break;
            case 79:
                this.filePickerElement.click();
                break;
            }
        });
    }


    playCustomSong(song) {
        this.clear();
        let fr = new FileReader();
        fr.onloadend = (e) => {
            let name = this.file.name.replace(/^\d+\s/, '').replace(/\.[^.]+$/, '');
            this.songTitleElement.innerHTML = name;
            this.inputElement.textContent = this.songTitleElement.innerHTML = name;
            let base64buffer = Utils.arrayBufferToBase64(e.currentTarget.result);
            this.audios["custom"].src = `data:${song.type};base64,${base64buffer}`;
            if (!this.audioSources["custom"]) {
                this.audioSources["custom"] = window.contexts["custom"].createMediaElementSource(this.audios["custom"]);
            }
            this.audioSources["custom"].connect(this.analysers["custom"]);
            this.analysers["custom"].connect(window.contexts["custom"].destination);
            this.intervalId = setInterval(() => this.playWhenAllLoaded(false), 300);
            this.selectedMusicType = "custom";
            this.albumArtElement.src = "./assets/icons/compact-disc.svg";
            let color = Utils.hexToRgb(Utils.stringToHex(name));
            this.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
            this.defaultSongButtonElement.classList.remove("hidden");
        };
        fr.readAsArrayBuffer(song);
    }

    clear() {
        for(let type of ["drums", "sub", "music", "custom"]) {
            this.audios[type].src = "";
            this.audios[type].crossOrigin = "anonymous";
        }
        this.musicBars = null;
        this.drumsBlob = null;
        this.subCircle = null;
        this.isPause = true;
        this.currentTimeElement.innerHTML = "0:00";
        this.songDurationElement.innerHTML = "0:00";
        this.pauseButtonElement.innerHTML = '<img src="assets/icons/play-button.svg" alt="">';
        this.inputElement.value = 0;
        if(this.intervalId) clearInterval(this.intervalId);
    }

    playWhenAllLoaded(hasStems = true) {
        clearInterval(this.intervalId);
        if (hasStems && this.audioSources["drums"] && this.audioSources["music"] && this.audioSources["sub"]) {
            for (let type in this.audioSources) {
                if (Object.hasOwnProperty.call(this.audioSources, type)) {
                    if (type === "music") {
                        this.musicBars = new MusicBars(this.analysers[type], this.frequenciesData[type], {
                            bars: 512,
                            strokeStyle: BARS_COLOR,
                            width: 5,
                        });
                    } else if (type === "drums") {
                        this.drumsBlob = new Blob(this.analysers[type], this.frequenciesData[type], 40, 200, {
                            fillStyle: BLOB_FILL,
                            strokeStyle: BLOB_STROKE,
                            width: 10,
                        });
                    } else if (type === "sub") {
                        this.subCircle = new SubCircle(this.analysers[type], this.frequenciesData[type],
                            {fillStyle: SUB_CIRCLE_COLOR});
                    }
                }
            }
            this.audios["drums"].play();
            this.audios["music"].play();
            this.audios["sub"].play();

        }
        else {
            this.musicBars = new MusicBars(this.analysers["custom"], this.frequenciesData["custom"], {
                bars: 512,
                strokeStyle: BARS_COLOR,
                width: 5,
            });
            this.drumsBlob = new Blob(this.analysers["custom"], this.frequenciesData["custom"], 40, 200, {
                fillStyle: BLOB_FILL,
                strokeStyle: BLOB_STROKE,
                width: 10,
            });
            this.subCircle = new SubCircle(this.analysers["custom"], this.frequenciesData["custom"],
                {fillStyle: SUB_CIRCLE_COLOR}, false);
            this.audios["custom"].play();
        }
        this.pauseButtonElement.innerHTML = '<img src="assets/icons/pause.svg" alt="">';
    }

    backward(ms) {
        if(this.selectedMusicType === "music") {
            this.audios["music"].currentTime -= ms / 1000;
            this.audios["drums"].currentTime -= ms / 1000;
            this.audios["sub"].currentTime -= ms / 1000;
        } else {
            this.audios["custom"].currentTime -= ms / 1000;
        }
        this.currentTimeElement.innerHTML = this.calculateCurrentTime();
    }

    forward(ms) {
        if(this.selectedMusicType === "music") {
            this.audios["music"].currentTime += ms / 1000;
            this.audios["drums"].currentTime += ms / 1000;
            this.audios["sub"].currentTime += ms / 1000;
        } else {
            this.audios["custom"].currentTime += ms / 1000;
        }
        this.currentTimeElement.innerHTML = this.calculateCurrentTime();
    }

    registerIntervals() {
        this.updateTimeId = setInterval(() => {
            this.currentTimeElement.innerHTML = this.calculateCurrentTime();
            this.songDurationElement.innerHTML = Math.floor(this.audios[this.selectedMusicType].duration / 60) + ":" +
                (Math.floor(this.audios[this.selectedMusicType].duration % 60) < 10 ? "0" : "") +
                Math.floor(this.audios[this.selectedMusicType].duration % 60);
        }, 1000);
    }

    calculateCurrentTime() {
        return Math.floor(this.audios[this.selectedMusicType].currentTime / 60) + ":" +
            (Math.floor(this.audios[this.selectedMusicType].currentTime % 60) < 10 ? "0" : "") +
            Math.floor(this.audios[this.selectedMusicType].currentTime % 60);
    }

    toggleOverlay() {
        if(this.overlayElement.classList.contains("hidden")) {
            this.overlayElement.classList.remove("hidden");
        } else {
            this.overlayElement.classList.add("hidden");
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }

            this.fullscreenElement.classList.remove('icon-window-expand');
            this.fullscreenElement.classList.add('icon-window-minimize');
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }

            this.fullscreenElement.classList.remove('icon-window-minimize');
            this.fullscreenElement.classList.add('icon-window-expand');
        }
    }

    render() {
        requestAnimationFrame(() => this.render());
        this.update();
        this.draw();
    }

    update() {
        if (this.musicBars) this.musicBars.update();
        if (this.drumsBlob) this.drumsBlob.update();
        if (this.subCircle) this.subCircle.update();
        if (this.musicBars && this.drumsBlob && this.subCircle) {
            this.isPause = this.audios[this.selectedMusicType].paused;
            if (!this.isSeeking) {
                this.inputElement.value = (100 / this.audios[this.selectedMusicType].duration) * this.audios[this.selectedMusicType].currentTime;
            }
        }
    }

    draw() {
        window.ctx.fillStyle = this.fillStyle;
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);
        if (this.subCircle) {
            this.subCircle.draw();
        }
        if (this.musicBars) this.musicBars.draw();
        if (this.drumsBlob) this.drumsBlob.draw();
    }

}

export default Visualizer;
