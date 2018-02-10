var animation = require('./modules/animation');
var canvasBackground = require('./modules/canvasBackground');
var projectHandler = require('./modules/projects');

const loader = document.querySelector('.loader');
const header = document.querySelector('header');
const homepage = document.querySelector('#homepage');

window.onload = () => {
  loader.classList.add('hidden-loader');
  header.classList.remove('hidden');
  homepage.classList.remove('hidden');
}


//Init Background
canvasBackground.init();
