/*start.addEventListener("click", function() {
  window.scrollTo(0, window.innerHeight);
});*/


/******* FUNCTIONS *******/

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



/*********** ELEMENT ***********/

var menu_open,
    menu_close,
    homepage,
    menu,
    menuWeb,
    menu3dAudio,
    menu3dChat,
    menuCanvasAudio,
    menufestival,
    menuLouvres,
    menuDataviz,
    categoryWeb,
    category3dAudio,
    categoryChat,
    categoryCanvasAudio,
    categoryFestival,
    categoryLouvres,
    categoryDataviz,
    previous,
    current;

function getElements(){

    menu_open = document.querySelector(".header_menu-open"),
        menu_close = document.querySelector(".header_menu-close"),
        homepage = document.querySelector("#homepage"),
        menu = document.querySelector(".menu");

//Menu Item
    menuWeb = document.querySelector("#menu-web"),
        menu3dAudio = document.querySelector("#menu-3d-audio"),
        menu3dChat = document.querySelector("#menu-chat"),
        menuCanvasAudio = document.querySelector("#menu-canvas-audio"),
        menufestival = document.querySelector("#menu-festival"),
        menuLouvres = document.querySelector("#menu-louvres"),
        menuDataviz = document.querySelector("#menu-dataviz");

//Category
    categoryWeb = document.querySelector("#category__web"),
        category3dAudio = document.querySelector("#category__3d-audio"),
        categoryChat = document.querySelector("#category__chat"),
        categoryCanvasAudio = document.querySelector("#category__canvas-audio"),
        categoryFestival = document.querySelector("#category__festival"),
        categoryLouvres = document.querySelector("#category__louvres"),
        categoryDataviz = document.querySelector("#category__dataviz");

    current = homepage;

}



/****** CHECK IF DOM ELEMENTS ARE READY *******/


function checkDomElements() {
    if (menu_open
        && menu_close
        && homepage
        && menu
        && menuWeb
        && menu3dAudio
        && menu3dChat
        && menuCanvasAudio
        && menufestival
        && menuLouvres
        && menuDataviz
        && categoryWeb
        && category3dAudio
        && categoryChat
        && categoryCanvasAudio
        && categoryFestival
        && categoryLouvres
        && categoryDataviz
    ) {
        addListener()
    } else {
        setTimeout(function() {
            getElements();
            checkDomElements();

            console.log(menu_open
                ,menu_close
                ,homepage
                ,menu
                ,menuWeb
                ,menu3dAudio
                ,menu3dChat
                ,menuCanvasAudio
                ,menufestival
                ,menuLouvres
                ,menuDataviz
                ,categoryWeb
                ,category3dAudio
                ,categoryChat
                ,categoryCanvasAudio
                ,categoryFestival
                ,categoryLouvres
                ,categoryDataviz);
        }, 500);
    }
};

checkDomElements();



/********* ADDD LISTENER *********/

function addListener() {

// MENU : OPEN

menu_open.addEventListener("click", function() {
    previous = current;

    fadeOut(previous, 0.5);
    fadeOut(menu_open, 0.5);
    fadeIn(menu_close, 0.5);
    fadeIn(menu, 0.5, 1);

});

// MENU : CLOSE

menu_close.addEventListener("click", function() {
    fadeOut(menu_close, 0.1);
    fadeOut(menu, 0.5);
    fadeIn(previous, 0.5, 0.5);
    fadeIn(menu_open,0.5);
});


// DATAVIZ : OPEN
menuDataviz.addEventListener('click', function () {
    current = categoryDataviz;

    fadeOut(menu_close, 0.1);
    fadeIn(menu_open,0.5, 0.2);

    fadeOut(menu, 0.5);

    fadeIn(current, 0.5, 0.5);
})

}



