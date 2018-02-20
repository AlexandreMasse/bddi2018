let inlineSvg = require('inline-svg');
let tippy = require('tippy.js');
import Visualizer from "./Visualizer";

class App {

    constructor() {
        this.canvas = document.querySelector('#visualizer');
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        window.ctx = this.ctx;
        window.canvas = this.canvas;

        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
    }

    init() {
        this.registerListeners();
        this.onResize();
        inlineSvg.init({
            svgSelector: 'img.svg',
            initClass: 'js-inlinesvg',
        });
        tippy('.tooltip', {
            arrow: true,
            theme: 'visualiser'
        });
        this.visualizer = new Visualizer();
    }

    registerListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        window.canvas.width = this.canvasWidth;
        window.canvas.height = this.canvasHeight;
        window.canvas.style.width = this.canvasWidth + 'px';
        window.canvas.style.height = this.canvasHeight + 'px';
    }

}

export default new App();
