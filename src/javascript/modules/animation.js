function fadeOut(el, duration, delay = 0) {

    el.style.transition = "opacity 0.3s";
    var s = el.style;
    s.opacity = 1;
    setTimeout(function () {
        (function fade() {
            (s.opacity-=.1) < -0.5 ? s.display="none" : setTimeout(fade,duration * 100)
        })();
    },delay * 1000)

}

function fadeIn(el, duration, delay = 0) {

    el.style.display = "block";
    el.style.transition = "opacity 0.3s";
    var val = el.style.opacity;
    val = 0;
    setTimeout(function () {
        (function fade() {
            if ( ((val += .1) < 1.5) ) {
                el.style.opacity = val;
                setTimeout(fade, duration * 100 )
            }
        })();
    }, delay * 1000)

}


var menu_open = document.querySelector(".header_menu-open");
var menu_close = document.querySelector(".header_menu-close");
var homepage = document.querySelector("#homepage");
var menu = document.querySelector(".menu");
var categories = document.querySelector(".categories");
var body = document.querySelector("body");


menu_open.addEventListener("click", function() {
  /*body.classList.add("menu-active");
  menu_open.classList.add("hidden");
  menu_close.classList.remove("hidden");*/

  fadeOut(homepage, 0.5);
  fadeOut(menu_open, 0.2);
  fadeIn(menu_close, 0.5, 0.3);
  fadeIn(menu, 0.5, 1);

});

menu_close.addEventListener("click", function() {
   /* body.classList.remove("menu-active");
    menu_open.classList.remove("hidden");
    menu_close.classList.add("hidden");*/

    fadeOut(menu_close, 0.5);
    fadeOut(menu, 0.5);
    fadeIn(homepage, 0.5, 0.5);
    fadeIn(menu_open,0.5, 0.5);
});








