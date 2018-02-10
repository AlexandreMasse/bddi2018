var time = 0;
var simplex = new SimplexNoise(Math.random);
var mouse = {
    position: vec2.fromValues(0, 0),
};

class RegularPolygon {
    constructor(peaksNbs, r) {
        this.peaks = [];

        this.polygon = {
            peakNbs: peaksNbs,
            r: r
        };

        this.color = '#fff';


        this.position = vec2.create();
        vec2.set(this.position, myCanvas.width / 2, myCanvas.height / 2);

        this.velocity = vec2.create();
        vec2.set(this.velocity, 0, 0);

        this.radianSpeed = 0;

        this.angle = 0;
        this.colliderpause = false;

    }

    collider(x, y, w, h, react) {
        let retVal = false;
        for (let peak of this.peaks) {
            if (peak[0] >= w) {
                retVal = {
                    peak: peak,
                    side: 'xW'
                };
            } else if (peak[0] <= x) {
                retVal = {
                    peak: peak,
                    side: 'x0'
                };
            } else if (peak[1] >= h) {
                retVal = {
                    peak: peak,
                    side: 'yH'
                };
            } else if (peak[1] <= y) {
                retVal = {
                    peak: peak,
                    side: 'y0'
                };
            }
        }
        if (retVal && !this.colliderpause) {
            react(retVal);
        }
    }

    createVertices(cb, variation) {
        this.peaks = [];
        let rotation = mat2.create();
        for (let i = 0; i < this.polygon.peakNbs; i++) {
            this.peaks.push(vec2.create());
            vec2.set(this.peaks[i], 0, variation(-this.polygon.r, i));

            let angle = ((2 * Math.PI) / this.polygon.peakNbs) * i;
            mat2.set(rotation, Math.cos(angle), -Math.sin(angle), Math.sin(angle), Math.cos(angle));
            vec2.transformMat2(this.peaks[i], this.peaks[i], rotation);


            mat2.set(rotation, Math.cos(this.angle), -Math.sin(this.angle), Math.sin(this.angle), Math.cos(this.angle));
            vec2.transformMat2(this.peaks[i], this.peaks[i], rotation);
            vec2.add(this.peaks[i], this.peaks[i], this.position);
            if (i === this.polygon.peakNbs - 1 && cb) {
                cb();
            }
        }
    }

    render() {
        ctx.beginPath();
        for (let peak of this.peaks) {
            ctx.lineTo(peak[0], peak[1]);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.lineTo(this.peaks[0][0], this.peaks[0][1]);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update(timestamp) {
        time = timestamp * 0.0005;
        this.createVertices(() => {
            this.render();
        }, (r, i) => {

            let displacement = -5 + (simplex.noise2D(i + time, i + time) * 10);
            return displacement + r;
        });
    }
}

function shadeColor2(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent,
        R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function blendColors(c0, c1, p) {
    var f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF,
        B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
}

class AudioAnalyzer {
    constructor() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        this.audioCtx = new AudioContext();
        this.audioBuffer;
        this.audioSource;
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();
        this.frequencies = new Float32Array(1024);
        this.pause = false;
        this.pausedAt = 0;
    }
    toggle() {
        let ret;
        if(this.audioCtx.state === 'running') {
            this.audioCtx.suspend();
            ret = true;
        } else if(this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
            ret = false;
        }
        return ret;

    }
    load(url, cb) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = () => {

            this.audioCtx.decodeAudioData(request.response, (buffer) => {

                // success callback
                this.audioBuffer = buffer;

                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                // play sound
                this.audioSource.start();

                cb();

            }, function () {

                // error callback
                //
            });
        };
        request.send();
    }

}

class Circle {

    constructor(res, radius, debug) {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.position = vec2.fromValues(myCanvas.width / 2, myCanvas.height / 2);
        addEventListener("resize", (e) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.position = vec2.fromValues(this.canvas.width / 2, this.canvas.height / 2);
        });

        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = true;

        this.radius = radius;
        this.resolution = res;


        this.nodes = [];
        this.handles = [];
        this.angle = 0;
        this.color = randomColor({luminosity: 'light'});

        this.debug = debug;
    }

    createVertices(cb, variation) {
        if (!variation) {
            variation = function (r) {
                return r;
            }
        }
        this.nodes = [];
        let rotation = mat2.create();
        for (let i = 0; i < this.resolution; i++) {
            this.nodes.push(vec2.create());
            let radius = variation(-this.radius, i);
            this.nodes[i] = vec2.fromValues(0, radius);
            this.handles[i] = {
                pos: vec2.fromValues((4 / 3) * Math.tan(Math.PI / (2 * this.resolution)) * -radius, radius),
                neg: vec2.fromValues(-((4 / 3) * Math.tan(Math.PI / (2 * this.resolution)) * -radius), radius)
            };
            let angle = ((2 * Math.PI) / this.resolution) * i;
            mat2.set(rotation, Math.cos(angle), -Math.sin(angle), Math.sin(angle), Math.cos(angle));
            vec2.transformMat2(this.nodes[i], this.nodes[i], rotation);

            vec2.transformMat2(this.handles[i].pos, this.handles[i].pos, rotation);
            vec2.transformMat2(this.handles[i].neg, this.handles[i].neg, rotation);

            mat2.set(rotation, Math.cos(this.angle), -Math.sin(this.angle), Math.sin(this.angle), Math.cos(this.angle));

            vec2.transformMat2(this.nodes[i], this.nodes[i], rotation);
            vec2.transformMat2(this.handles[i].pos, this.handles[i].pos, rotation);
            vec2.transformMat2(this.handles[i].neg, this.handles[i].neg, rotation);

            vec2.add(this.nodes[i], this.nodes[i], this.position);
            vec2.add(this.handles[i].pos, this.handles[i].pos, this.position);
            vec2.add(this.handles[i].neg, this.handles[i].neg, this.position);

            if (i === this.resolution - 1 && cb) {
                cb();
            }
        }
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.nodes[0][0], this.nodes[0][1]);
        for (let i = 0; i < this.nodes.length; i++) {
            this.ctx.bezierCurveTo(
                this.handles[i].neg[0],
                this.handles[i].neg[1],
                this.handles[(i + 1) % this.resolution].pos[0],
                this.handles[(i + 1) % this.resolution].pos[1],
                this.nodes[(i + 1) % this.resolution][0],
                this.nodes[(i + 1) % this.resolution][1],
            );
        }
        this.ctx.fill();
        this.ctx.closePath();
        if (this.debug) {
            for (let i = 0; i < this.nodes.length; i++) {
                this.ctx.lineWidth = 2;
                this.ctx.fillStyle = "#ff000d";
                this.ctx.strokeStyle = "#ff000d";
                this.ctx.beginPath();
                this.ctx.arc(this.handles[i].neg[0], this.handles[i].neg[1], 5, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.moveTo(this.handles[i].neg[0], this.handles[i].neg[1]);
                this.ctx.lineTo(this.nodes[i][0], this.nodes[i][1]);
                this.ctx.stroke();
                this.ctx.closePath();

                this.ctx.fillStyle = "#117aff";
                this.ctx.strokeStyle = "#117aff";
                this.ctx.beginPath();
                this.ctx.arc(this.handles[i].pos[0], this.handles[i].pos[1], 5, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.moveTo(this.handles[i].pos[0], this.handles[i].pos[1]);
                this.ctx.lineTo(this.nodes[i][0], this.nodes[i][1]);
                this.ctx.stroke();
                this.ctx.closePath();

                this.ctx.fillStyle = "#000";
                this.ctx.beginPath();
                this.ctx.arc(this.nodes[i][0], this.nodes[i][1], 10, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

    update(timestamp, hook) {
        // this.angle += 0.005;
        this.createVertices(() => {
            this.render();
        }, (r, i, ov) => {
            return hook(r, i, ov);
        });
    }
}

addEventListener("mousemove", (e) => {
    mouse.position = vec2.fromValues(e.pageX, e.pageY);
});

class MouseManager {
    constructor(q) {
        this.sampleLength = q;
        this.samples = [];
    }

    get delta() {

        let average = 0;
        for (let sample of this.samples) {
            average += (sample[0] + sample[1]) / 2;
        }
        average = average / this.sampleLength;


        this.samples.push(mouse.position);
        this.samples.splice(0, this.samples.length - this.sampleLength);

        return delta;
    }
}

class Face {
    constructor() {

        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        addEventListener("resize", (e) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.position = vec2.fromValues(this.canvas.width / 2, this.canvas.height / 2);
        });
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = true;
        this.radius = 80;
        this.nodes = [];
        this.handles = [];
        this.n = 5;
        this.position = vec2.fromValues(this.canvas.width / 2, this.canvas.height / 2);
        this.angle = -(Math.PI / this.n);
        this.color = "black";
        this.debug = false;

        this.sad = false;
        this.eyes = new Circle(2, this.radius - 20, false);
        this.mouth = new Circle(7, this.radius, false);
        this.eyes.position[0] = this.position[0];
        this.mouth.position[0] = this.position[0];
        this.eyes.position[1] -= 50;
        this.mouth.angle = -Math.PI / 7;
        this.eyes.angle = - Math.PI / 2;
    }

    createVertices(cb) {
        if(this.sad) {
            this.mouth.angle = Math.PI -Math.PI / 7;
            this.mouth.position[1] = this.canvas.height / 2 + this.mouth.radius * 1.3 ;
        }else {

            this.mouth.angle = -Math.PI / 7;
            this.mouth.position[1] = this.canvas.height / 2;
        }
        this.eyes.createVertices();
        this.mouth.createVertices();
        if(this.debug) {

            this.eyes.debug = this.debug;
            this.mouth.debug = this.debug;
            this.eyes.render();
            this.mouth.render();
        }
        cb();
    }

    render() {
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 10;
        for(let eye of this.eyes.nodes) {
            this.ctx.beginPath();
            if(this.sad) {
                this.ctx.arc(eye[0], eye[1], 10, Math.PI, 0);
            } else {

                this.ctx.arc(eye[0], eye[1], 10, 2 * Math.PI, 0);
            }
            this.ctx.fill();
            this.ctx.closePath();
        }

        this.ctx.beginPath();

        this.ctx.moveTo(this.mouth.nodes[3][0], this.mouth.nodes[3][1]);
        for(let i = 3; i < 5; i++) {
            this.ctx.bezierCurveTo(
                this.mouth.handles[i].neg[0],
                this.mouth.handles[i].neg[1],
                this.mouth.handles[(i + 1) % this.mouth.resolution].pos[0],
                this.mouth.handles[(i + 1) % this.mouth.resolution].pos[1],
                this.mouth.nodes[(i + 1) % this.mouth.resolution][0],
                this.mouth.nodes[(i + 1) % this.mouth.resolution][1],
            );
        }
        this.ctx.stroke();
        this.ctx.closePath();

    }

    update(timestamp) {
        this.eyes.position[0] = this.position[0];
        this.mouth.position[0] = this.position[0];
        this.eyes.position[1] = this.position[1] - 50;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.createVertices(() => {
            this.render();
        })
    }

}

var res = 10;
var debug = false;
var circle1 = new Circle(res, 325, debug);
var circle2 = new Circle(res, 225, debug);
var circle3 = new Circle(res, 125, debug);
circle3.color = "#FFB2F9";
circle2.color = "#89F4E6";
circle1.color = "#CCF9A2";

var myAudioAnalyzer = new AudioAnalyzer();

document.getElementById("cutMusic").addEventListener("click", function (e) {
    myAudioAnalyzer.toggle()?(() => {
            lollipopFace.sad = true;
            //doUpdate = original;
            this.style.backgroundColor = "white";
            this.style.color = "black";
        })():(() => {
        lollipopFace.sad = false;
        //doUpdate = withMusic;
        this.style.backgroundColor = "transparent";
        this.style.color = "white";
    })();
});

const mousePosition = new MouseManager(500);

const lollipopFace = new Face();

var original = function (timestamp) {

    let tendance = 0;
    if(lollipopFace.sad) {
        circle1.ctx.fillStyle = "hsl(" + Math.sin(timestamp * 0.00005) * 360 + ", 0%, 50%)"
    } else {
        circle1.ctx.fillStyle = "hsl(" + Math.sin(timestamp * 0.00005) * 360 + ", 50%, 50%)"
    }
    circle1.resolution = res;
    circle2.resolution = res;
    circle3.resolution = res;
    circle1.debug = debug;
    circle2.debug = debug;
    circle3.debug = debug;
    lollipopFace.debug = debug;
    circle1.ctx.fillRect(0, 0, circle1.canvas.width, circle1.canvas.height);
    circle1.ctx.fillStyle = "#884d2b";
    circle1.ctx.fillRect((circle1.canvas.width / 2) - 10, circle1.canvas.height / 2, 20, circle1.canvas.height / 2);
    circle1.update(timestamp, (r, i) => {
        let time = timestamp * 0.0005;
        let displacement = (-5 + (simplex.noise2D(i + time, i + time) * 10)) * (1 + tendance * 2);
        return displacement + r;
    });
    circle2.update(timestamp, (r, i, ov) => {
        let time = timestamp * 0.0005;
        let displacement = (-5 + (simplex.noise2D(i + time, i + time) * 10)) * (1 + tendance * 2);
        return displacement + r;
    });
    circle3.update(timestamp, (r, i, ov) => {
        let time = timestamp * 0.0005;
        let displacement = (-5 + (simplex.noise2D(i + time, i + time) * 10)) * (1 + tendance * 2);
        return displacement + r;
    });
    lollipopFace.update(timestamp);

    circle1.ctx.save();
    circle1.ctx.translate(circle1.canvas.width/2,circle1.canvas.height/2);
    if(!lollipopFace.sad) {
        circle1.ctx.rotate((Math.PI / 6) * Math.sin(2 * Math.PI * (timestamp / (60000 / (125.035 / 2)))));
    }
    circle1.ctx.drawImage(lollipopFace.canvas, -circle1.canvas.width/2,-circle1.canvas.height/2);
    circle1.ctx.restore();
    mouse.oldPosition = mouse.position;
    oldTendance = tendance;
    requestAnimationFrame(doUpdate);
};
var withMusic = function (timestamp) {
    if(lollipopFace.sad) {
        circle1.ctx.fillStyle = "hsl(" + Math.sin(timestamp * 0.00005) * 360 + ", 0%, 10%)"
    } else {
        circle1.ctx.fillStyle = "hsl(" + Math.sin(timestamp * 0.00005) * 360 + ", 50%, 50%)"
    }
    circle1.resolution = res;
    circle2.resolution = res;
    circle3.resolution = res;
    circle1.debug = debug;
    circle2.debug = debug;
    circle3.debug = debug;
    lollipopFace.debug = debug;
    circle1.ctx.fillRect(0, 0, circle1.canvas.width, circle1.canvas.height);
    circle1.ctx.fillStyle = "#884d2b";
    circle1.ctx.fillRect((circle1.canvas.width / 2) - 10, circle1.canvas.height / 2, 20, circle1.canvas.height / 2);
    circle1.update(timestamp, (r, i, ov) => {
        let percentIdx = (i / circle1.resolution);
        let frequencyIdx = Math.floor(524 * percentIdx);

        myAudioAnalyzer.analyser.getByteFrequencyData(myAudioAnalyzer.frequencyData);

        myAudioAnalyzer.frequencies[frequencyIdx] += (myAudioAnalyzer.frequencyData[frequencyIdx] - myAudioAnalyzer.frequencies[frequencyIdx] ) * 0.1;
        let part2 = myAudioAnalyzer.frequencies.slice(0, myAudioAnalyzer.frequencies.length / 2 - 250);
        part2.reverse();
        let complete = myAudioAnalyzer.frequencies.slice(0);
        complete.set(part2, complete.length / 2 - 250);
        if(i === Math.floor(res / 2)) frequencyIdx = 0;
        return r - complete[frequencyIdx];
    });
    circle2.update(timestamp, (r, i, ov) => {
        let percentIdx = (i / circle1.resolution);
        let frequencyIdx = Math.floor(524 * percentIdx);
        let part2 = myAudioAnalyzer.frequencies.slice(0, myAudioAnalyzer.frequencies.length / 2 - 250);
        part2.reverse();
        let complete = myAudioAnalyzer.frequencies.slice(0);
        complete.set(part2, complete.length / 2 - 250);
        if(i === Math.floor(res / 2)) frequencyIdx = 0;
        return r - complete[frequencyIdx];
    });
    circle3.update(timestamp, (r, i, ov) => {
        let percentIdx = (i / circle1.resolution);
        let frequencyIdx = Math.floor(524 * percentIdx);
        let part2 = myAudioAnalyzer.frequencies.slice(0, myAudioAnalyzer.frequencies.length / 2 - 250);
        part2.reverse();
        let complete = myAudioAnalyzer.frequencies.slice(0);
        complete.set(part2, complete.length / 2 - 250);
        if(i === Math.floor(res / 2)) frequencyIdx = 0;
        return r - complete[frequencyIdx];
    });

    lollipopFace.update(timestamp);
    circle1.ctx.save();
    circle1.ctx.translate(circle1.canvas.width/2,circle1.canvas.height/2);
    if(!lollipopFace.sad) {

        circle1.ctx.rotate((Math.PI / 6) * Math.sin(2 * Math.PI * (timestamp / (60000 / (73.8 / 2)))));
    }
    circle1.ctx.drawImage(lollipopFace.canvas, -circle1.canvas.width/2,-circle1.canvas.height/2);
    circle1.ctx.restore();

    //let mirror = circle1.ctx.getImageData(0, 0, circle1.canvas.width / 2, 0, circle1.canvas.width / 2, circle1.canvas.height);

    //circle1.ctx.putImageData(mirror, 0, 0);
    requestAnimationFrame(doUpdate);
};
doUpdate = original;
myAudioAnalyzer.load('./sound3.mp3', function () {
    doUpdate = withMusic;
    document.getElementById("cutMusic").style.display = "block";
});
requestAnimationFrame(doUpdate);
