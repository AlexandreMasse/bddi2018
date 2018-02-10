const utils = require("./utils")

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
    homeWeb,
    home3dAudio,
    homeChat,
    homeCanvasAudio,
    homefestival,
    homeLouvres,
    homeDataviz,
    categoryWeb,
    category3dAudio,
    categoryChat,
    categoryCanvasAudio,
    categoryFestival,
    categoryLouvres,
    categoryDataviz,
    previous,
    current,
    backhome,
    iframes,
    backLinks,
    projectLists;

function getElements(){

    menu_open = document.querySelector(".header_menu-open"),
        menu_close = document.querySelector(".header_menu-close"),
        homepage = document.querySelector("#homepage"),
        menu = document.querySelector(".menu"),
        backhome = document.querySelectorAll(".backhome"),
        iframes = document.querySelectorAll("iframe"),
        backLinks = document.querySelectorAll(".project__back-link"),
        projectLists = document.querySelectorAll(".project__list");


    //Menu Link Item
    menuWeb = document.querySelector("#menu-link-web"),
        menu3dAudio = document.querySelector("#menu-link-3d-audio"),
        menuChat = document.querySelector("#menu-link-chat"),
        menuCanvasAudio = document.querySelector("#menu-link-canvas-audio"),
        menufestival = document.querySelector("#menu-link-festival"),
        menuLouvres = document.querySelector("#menu-link-louvres"),
        menuDataviz = document.querySelector("#menu-link-dataviz");


    //Home Link Item
    homeWeb = document.querySelectorAll(".home-link-web"),
        home3dAudio = document.querySelectorAll(".home-link-3d-audio"),
        homeChat = document.querySelectorAll(".home-link-chat"),
        homeCanvasAudio = document.querySelectorAll(".home-link-canvas-audio"),
        homefestival = document.querySelectorAll(".home-link-festival"),
        homeLouvres = document.querySelectorAll(".home-link-louvres"),
        homeDataviz = document.querySelectorAll(".home-link-dataviz");


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
        && homeWeb
        && home3dAudio
        && homeChat
        && homeCanvasAudio
        && homefestival
        && homeLouvres
        && homeDataviz
        && categoryWeb
        && category3dAudio
        && categoryChat
        && categoryCanvasAudio
        && categoryFestival
        && categoryLouvres
        && categoryDataviz
        && backhome
        && backLinks
        && projectLists
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
                ,homeWeb
                ,home3dAudio
                ,homeChat
                ,homeCanvasAudio
                ,homefestival
                ,homeLouvres
                ,homeDataviz
                ,categoryWeb
                ,category3dAudio
                ,categoryChat
                ,categoryCanvasAudio
                ,categoryFestival
                ,categoryLouvres
                ,categoryDataviz
                ,backhome
                ,backLinks);
        }, 500);
    }
};

checkDomElements();


/********* ADDD LISTENER *********/

function addListener() {

    //Generic function
    function closeMenu(){
        utils.fadeOut(menu_close, 0.1);
        utils.fadeIn(menu_open,0.5);
        utils.fadeOut(menu, 0.5);
    }

    function fadeOutPrevious() {
        utils.fadeOut(previous, 0.5);
    }
    function fadeInCurrent() {
        utils.fadeIn(current, 0.5, 0.5);
    }
    function fadeOutCurrent() {
        utils.fadeOut(current, 0.5);
    }

    function fadeOutIframe(){
        iframes.forEach(function (iframe) {
            utils.fadeOut(iframe, 0.5);
            document.body.style.overflowY = "auto";

            backLinks.forEach(function (backlink) {
                utils.fadeOut(backlink, 0.5);
            })

            document.querySelectorAll(".project__content").forEach(function (el) {
                utils.fadeOut(el, 0.5)
            });

            document.querySelectorAll(".project__list").forEach(function (el) {
                utils.fadeIn(el, 0.5)
            });


        })
    }

    // MENU : OPEN

    menu_open.addEventListener("click", function() {
        previous = current;

        fadeOutPrevious();
        //fadeOutCurrent();

        utils.fadeOut(menu_open, 0.5);
        utils.fadeIn(menu_close, 0.5, 0.5);
        utils.fadeIn(menu, 0.5, 0.5);

    });

    // MENU : CLOSE

    menu_close.addEventListener("click", function() {
        closeMenu();
        utils.fadeIn(previous, 0.5, 0.5);
    });

    // DATAVIZ : OPEN

    menuDataviz.addEventListener('click', function () {
        current = categoryDataviz;
        closeMenu();
        fadeInCurrent();
        fadeOutIframe();
    });

     homeDataviz.forEach(function (el) {
         el.addEventListener('click', function () {
             previous = current;
             utils.fadeOut(homepage, 0.5);
             current = categoryDataviz;
             fadeInCurrent();
         });
     })

    // Louvres : OPEN

    menuLouvres.addEventListener('click', function () {
        current = categoryLouvres;
        closeMenu();
        fadeInCurrent();
        fadeOutIframe();
    });

    homeLouvres.forEach(function (el) {
        el.addEventListener('click', function () {
            previous = current;
            utils.fadeOut(homepage, 0.5);
            current = categoryLouvres;
            fadeInCurrent();
        });
    })

    // Festival : OPEN

    menufestival.addEventListener('click', function () {
        current = categoryFestival;
        closeMenu();
        fadeInCurrent();
        fadeOutIframe();
    });


    homefestival.forEach(function (el) {
        el.addEventListener('click', function () {
            previous = current;
            utils.fadeOut(homepage, 0.5);
            current = categoryFestival;
            fadeInCurrent();
        });
    });

    // Canavs Audio : OPEN

    menuCanvasAudio.addEventListener('click', function () {
        current = categoryCanvasAudio;
        closeMenu();
        fadeInCurrent();
        fadeOutIframe();
    });

    homeCanvasAudio.forEach(function (el) {
        el.addEventListener('click', function () {
            previous = current;
            utils.fadeOut(homepage, 0.5);
            current = categoryCanvasAudio;
            fadeInCurrent();
        });
    });

    // Chat : OPEN

    menuChat.addEventListener('click', function () {
        current = categoryChat;
        closeMenu();
        fadeInCurrent();
        fadeOutIframe();
    });

    homeChat.forEach(function (el) {
        el.addEventListener('click', function () {
            previous = current;
            utils.fadeOut(homepage, 0.5);
            current = categoryChat;
            fadeInCurrent();
        });
    })

    // 3D audio: OPEN

    menu3dAudio.addEventListener('click', function () {
        current = category3dAudio;
        closeMenu();
        fadeInCurrent();
        fadeOutIframe();
    });

    home3dAudio.forEach(function (el) {
        el.addEventListener('click', function () {
            previous = current;
            utils.fadeOut(homepage, 0.5);
            current = category3dAudio;
            fadeInCurrent();
        });
    })

    // Menu web: OPEN

    menuWeb.addEventListener('click', function () {
        current = categoryWeb;
        closeMenu();
        fadeInCurrent()
        fadeOutIframe();
    });

    homeWeb.forEach(function (el) {
        el.addEventListener('click', function () {
            previous = current;
            utils.fadeOut(homepage, 0.5);
            current = categoryWeb;
            fadeInCurrent();
        });
    })

    // BACKHOME

    for (let i = 0; i < backhome.length; i++) {

        backhome[i].addEventListener('click', function () {
            previous = current;
            fadeOutPrevious();
            utils.fadeIn(homepage,0.5, 0.5);
            current = homepage;
        });
    }


    backLinks.forEach(function (backlink) {
        backlink.addEventListener('click', function () {
            //utils.fadeOut(backlink, 0.5);
            fadeOutIframe()
/*
            document.querySelectorAll(".project__content").forEach(function (el) {
                utils.fadeOut(el, 0.5)
            });

            document.querySelectorAll(".project__list").forEach(function (el) {
                utils.fadeIn(el, 0.5)
            });*/


        })
    })

};



