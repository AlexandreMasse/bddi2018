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
    menuChat,
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
    current,
    backhome;

function getElements(){

    menu_open = document.querySelector(".header_menu-open"),
        menu_close = document.querySelector(".header_menu-close"),
        homepage = document.querySelector("#homepage"),
        menu = document.querySelector(".menu"),
        backhome = document.querySelectorAll(".backhome");

//Menu Item
    menuWeb = document.querySelector("#menu-web"),
        menu3dAudio = document.querySelector("#menu-3d-audio"),
        menuChat = document.querySelector("#menu-chat"),
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
        && menuChat
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
        && backhome
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
                ,menuChat
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
                ,categoryDataviz
                ,backhome);
        }, 500);
    }
};

checkDomElements();


/********* ADDD LISTENER *********/

function addListener() {

    //Generic function
    function closeMenu(){
        fadeOut(menu_close, 0.1);
        fadeIn(menu_open,0.5);
        fadeOut(menu, 0.5);
    }

    function fadeOutPrevious() {
        fadeOut(previous, 0.5);
    }
    function fadeInCurrent() {
        fadeIn(current, 0.5, 0.5);
    }
    function fadeOutCurrent() {
        fadeOut(current, 0.5);
    }


    // MENU : OPEN

    menu_open.addEventListener("click", function() {
        previous = current;

        fadeOutPrevious();
        //fadeOutCurrent();

        fadeOut(menu_open, 0.5);
        fadeIn(menu_close, 0.5, 0.5);
        fadeIn(menu, 0.5, 0.5);

    });

    // MENU : CLOSE

    menu_close.addEventListener("click", function() {
        closeMenu();
        fadeIn(previous, 0.5, 0.5);
    });


    // DATAVIZ : OPEN

    menuDataviz.addEventListener('click', function () {
        current = categoryDataviz;
        closeMenu();
        fadeInCurrent();
    });


    // Louvres : OPEN

    menuLouvres.addEventListener('click', function () {
        current = categoryLouvres;
        closeMenu();
        fadeInCurrent()
    });

    // Festival : OPEN

    menufestival.addEventListener('click', function () {
        current = categoryFestival;
        closeMenu();
        fadeInCurrent()
    });

    // Canavs Audio : OPEN

    menuCanvasAudio.addEventListener('click', function () {
        current = categoryCanvasAudio;
        closeMenu();
        fadeInCurrent()
    });

    // Chat : OPEN

    menuChat.addEventListener('click', function () {
        current = categoryChat;
        closeMenu();
        fadeInCurrent()
    });

    // 3D audio: OPEN

    menu3dAudio.addEventListener('click', function () {
        current = category3dAudio;
        closeMenu();
        fadeInCurrent()
    });

    // 3D audio: OPEN

    menuWeb.addEventListener('click', function () {
        current = categoryWeb;
        closeMenu();
        fadeInCurrent()
    });


    // BACKHOME
    for (let i = 0; i < backhome.length; i++) {

        backhome[i].addEventListener('click', function () {
            previous = current;
            fadeOutPrevious();
            fadeIn(homepage,0.5, 0.5);
            current = homepage;
        });

    }




}



