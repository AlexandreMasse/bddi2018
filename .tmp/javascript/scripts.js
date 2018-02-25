(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var animation = require('./modules/animation');
var canvasBackground = require('./modules/canvasBackground');
var projectHandler = require('./modules/projects');
// var projectHandler = require('./modules/smoothScroll');

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

},{"./modules/animation":2,"./modules/canvasBackground":3,"./modules/projects":4}],2:[function(require,module,exports){
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




},{}],3:[function(require,module,exports){
var canvas = document.createElement('canvas');
canvas.setAttribute("id", "canvas");
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d'),
    points = [],
    mouse = {
        x: 0,
        y: 0
    },
    pointSize = 0.5,
    spaceBetweenY = 30,
    spaceBetweenX = 30;

function setup() {
    points = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        nbPointX = canvasWidth / spaceBetweenX,
        nbPointY = canvasHeight / spaceBetweenY;

    for (var y = 0; y < nbPointY; y++) {
        for (var x = 0; x < nbPointX ; x++) {
            var padding = 0.5;
            var point = {
                x: ((canvasWidth - pointSize) / (nbPointX + padding)) * x + (canvasWidth / nbPointX) * (padding),
                y: ((canvasHeight - pointSize) / (nbPointY + padding)) * y + (canvasHeight / nbPointY) * (padding),
                size: pointSize
            };
            points.push(point)
        }
    }
}

function render() {

    requestAnimationFrame(render);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        var scale = getDistance(point, mouse);

        //Etendue
        scale = 130 - scale;

        //Dureté
        scale = scale / 70;

        //Grossissement
        var newScale = point.size * scale * 2.2;

        if(newScale < pointSize) newScale = pointSize;

        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.arc(point.x, point.y, newScale, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
        ctx.closePath()
    }
}


function getDistance(obj1, obj2) {
    var distanceX = obj1.x - obj2.x;
    var distanceY = obj1.y - obj2.y;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function addlistener(){
    window.addEventListener('resize', function() {
        setup();
    });

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })
}

exports.init = function(){
    setup();
    addlistener();
    render();
};

},{}],4:[function(require,module,exports){
(function () {
    var  previousSectionId,
    utils = require('./utils');

    const categoriesList = document.getElementById('categories-list');
    const categoriesMenu = document.getElementById('categories-item');

    var projectListItems = [];

    //Loads all categories from file
    utils.findAllIn('categories').then(function(categories) {

        for (let i = 0; i < categories.length; i++) {
            let projects = categories[i].projectsList;

            //TODO : create action on click
            categoryItem =
                `<li class="menu__items-item" data-id="category-${categories[i].id}" data-ident="category__${categories[i].ident}" id="menu-${categories[i].ident}">
                    <div class="menu__thumbnail" style="background-image:url('images/thumbnail-${categories[i].id}.jpg')"></div>
                    <span>${categories[i].name}</span>
                </li>`;
            categoriesMenu.innerHTML += categoryItem;

            //TODO : Add back button

            //Add categories to homepage
            categoryHTML =
            `<div class="projects__category" data-id="category-${categories[i].id}" data-ident="category__${categories[i].ident}">
                <div class="projects__category-title">
                        <h2>${categories[i].name}</h2>
                    </div>
                    <div class="projects__category-content">
                    <div class="projects__category-thumbnail"><div class="projects__category-thumbnail-img" style="background-image:url('images/thumbnail-${categories[i].id}.jpg')">
                    </div></div>
                        <div class="projects__category-description">
                            <p>${categories[i].description.substring(0,250)}...</p>
                            <div class="fi flaticon-left-arrow action-show"></div>
                        </div>
                    </div>
            </div>`;
            categoriesList.innerHTML += categoryHTML;

            //Creates section for each category
            const   categorySection = createCustomElement('section', categories[i].id, 'category', categories[i].ident);
                    categorySection.classList.add('slideToFade', 'hidden', "category")
            const   categoryContent = document.createElement('div');
                    categoryContent.classList.add('project__list','category__content');
            const   categoryDescription = document.createElement('p');
                    categoryDescription.setAttribute('class','category__description');
            // const   projectsList  = document.createElement('div');
            const   projectsScreens = document.createElement('div');
                    projectsScreens.classList.add('project__screens', 'hidden');
                    // projectsList.classList.add('project__list');
            const   iframe = document.createElement('iframe');
                    iframe.classList.add('project-iframe', 'hidden');
                    categorySection.appendChild(iframe);

            categoryDescription.innerHTML +=
                `<div class="fi flaticon-left-arrow action-back"></div>
                <p>${categories[i].description}</p>`;
            categoryContent.appendChild(categoryDescription);
            categorySection.appendChild(categoryContent);

            //List all projects from category
            for (let j = 0; j < projects.length; j++) {
                const studentsList = projects[j].studentsList;
                (function(index) {
                    //Find students information
                    utils.findStudentsByProject(projects[index].id).then(function(students) {
                        var studentsNames = ``;
                        for (let k = 0; k < students.length; k++) {
                            utils.findOneByIn('students', 'id', students[k].id);
                            studentsNames += `${students[k].firstname} ${students[k].lastname} <em>(${students[k].option})</em> - `;
                            if (k == students.length - 1) {
                                const pathFile = categories[i].ident+'/'+projects[index].id+'_'+projects[index].ident;
                                const thumbnail = projects[j].screens && projects[j].screens.length ? 'projets/'+pathFile+'/screens/0.jpg' : 'images/thumbnail-'+categories[i].id+'.jpg';

                                const projectItem = document.createElement('div');
                                    projectItem.classList.add('projects__list-item');
                                    projectItem.setAttribute('id', `project-${projects[index].id}`);
                                    projectItem.setAttribute('data-url', `${pathFile}/code`);
                                    projectItem.setAttribute('data-view', projects[index].view);
                                    projectItem.innerHTML +=
                                    `   <div class="project__thumbnail">
                                            <div class="project__thumbnail-img" style="background-image: url('${thumbnail}')">
                                            </div>
                                        </div>
                                        <h2>${projects[j].id} - ${projects[index].name}</h2>
                                        <p>${studentsNames}</p>
                                    `;
                                categoryContent.appendChild(projectItem);
                                projectListItems.push(projectItem);

                                
                                if (projects[j].screens && projects[j].screens.length > 2) {
                                    const   projectContent = document.createElement('div');
                                            projectContent.classList.add('project__content');

                                            projectContent.innerHTML += 
                                            `<div class="project__informations">
                                                <h1>${projects[j].name}</h1>
                                                <h2>${studentsNames}</h2>
                                            </div>`;

                                    const   projectScreen = document.createElement('div');
                                            projectScreen.setAttribute('data-project', projects[j].id);
                                            projectContent.appendChild(projectScreen);

                                    for (let l = 0; l < projects[j].screens.length; l++) {
                                        projectScreen.innerHTML += 
                                        `<div class="project__screen-${l}">
                                            <img src="${location.host}/projets/${pathFile}/screens/${l}.jpg" alt=""/>
                                        </div>`;
                                    }
                                    projectsScreens.appendChild(projectContent);
                                }
                            }
                        }
                    });

                    //Add sections to DOM
                    if (index == projects.length - 1) {
                        const backLink = document.createElement('a');
                            backLink.innerHTML = 'back';
                            backLink.classList.add('project__back-link', 'fi', 'flaticon-left-arrow', 'action-back');
                        // categorySection.appendChild(projectsList);
                        // categorySection.appendChild(iframe);
                        categorySection.appendChild(backLink);
                        
                        categorySection.appendChild(projectsScreens);

                        var homepage = document.getElementById('homepage');
                            homepage.parentNode.insertBefore(categorySection, homepage.nextSibling);
                    }
                })(j);
            }
        }

    }).then(addListeners);

    function createCustomElement(element, id, slug, className) {
        let elementCreated = document.createElement(element);
            slug && className ? elementCreated.setAttribute('id', slug+'__' + className) : false;
            id && slug ? elementCreated.setAttribute('data-id', slug+'-' + id) : false;

        return elementCreated;
    }

    function showSection(sectionId) {
        document.querySelector('section.visible').classList.remove('visible').add('hidden');
        document.getElementById(sectionId).classList.remove('hidden').add('visible');
    }

    function goBack(activeSectionId) {
        if (activeSectionId) {
            previousSectionId = activeSectionId;
        }
        showSection(previousSectionId);
    }

    function elementLoaded(el, cb) {
        if (el.length) {
          // Element is now loaded.
          cb(el);
        } else {
          // Repeat every 500ms.
          setTimeout(function() {
            elementLoaded(el, cb)
          }, 1000);
        }
      };

    function addListeners() {
        //Add click event on category
        categoriesList.querySelectorAll('.projects__category').forEach(function(category) {
            const categoryIdent = category.getAttribute('data-ident');
            category.querySelector('.projects__category-thumbnail').addEventListener('click', function() {
                document.getElementById('homepage').classList.add('hidden');
                document.getElementById(categoryIdent).classList.remove('hidden');
                previousSectionId = 'homepage';
            });
            category.querySelector('.action-show').addEventListener('click', function() {
                document.getElementById('homepage').classList.add('hidden');
                document.getElementById(categoryIdent).classList.remove('hidden');
                previousSectionId = 'homepage';
            });
        });

        //Add click event on project (load screens or load iframe) once element is loaded
        elementLoaded(projectListItems, function() {
            projectListItems.forEach(function(projectItem) {
                projectItem.addEventListener('click', function() {
                    const projectScreens = document.querySelector('projet__screen-'+projectItem.getAttribute('data-id'));
                    const   iframe = projectItem.closest('section').querySelector('iframe');

                    switch (projectItem.getAttribute('data-view')) {
                        case 'code':
                            iframe.setAttribute('src', location.host+'/projets/'+projectItem.getAttribute('data-url'));
                            break;
                        case 'screen':
                            break;
                    }
                })
            });

        });

    }

})();

},{"./utils":5}],5:[function(require,module,exports){
function ajaxGet(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

//List all objects from file
exports.findAllIn = function(file) {
    return new Promise(function (resolve, reject) {
        if (file) {
            ajaxGet('./data/'+file+'.json').then(function (data) {
                    if(data.length) {
                        resolve(JSON.parse(data));
                    } else {
                        reject('fail')
                    }
                }
            )
        } else {
           reject("pas de file")
        }
    });
}

//Find an object from file with attribute as attr, and value as value
exports.findOneByIn = function(file, attr, value) {
    return new Promise(function (resolve, reject) {
        if (file && attr && value) {
            this.findAllIn(file).then(function (datas) {
                    for (let i = 0; i < datas.length; i++) {
                        if (datas[i][attr] == value) {
                            resolve(datas[i]);
                        }
                    }
                }
            )
        } else {
            reject ("missing arg")
        }
    }.bind(this));
}

//Find all objects from file with attribute as attr, and values as values 
exports.findAllByIn = function(file, attr, values){
    return new Promise(function (resolve, reject) {
        if (file && attr && values) {
            var list = [];
            for (let i = 0; i < values.length; i++) {
                this.findOneByIn(file, attr, values[i]).then(function(datas) {
                    list.push(datas);
                    if (i == values.length - 1) {
                        resolve(list);
                    }
                });
            }
        } else {
            reject ("missing arg")
        }
    }.bind(this));

}

//Lists all projects by categoryId
exports.findAllProjectsByCategory = function(categoryId) {
    return new Promise(function (resolve, reject) {
        if (categoryId) {
            this.findOneByIn('categories', 'id', categoryId).then(function(datas) {
                resolve(datas.projectsList);
            });
        } else {
            reject ("missing arg")
        }
    }.bind(this));
}

//List all students by projectId
exports.findStudentsByProject = function(projectId) {
    return new Promise(function (resolve, reject) {
        if (projectId) {
            // TODO: use findAllProjectsByCategory
            this.findAllIn('categories').then(function(datas) { //Gets all datas
                for (let i = 0; i < datas.length; i++) { //Loops in all categories
                    var projectsList = datas[i].projectsList;
                    for (let k = 0; k < projectsList.length; k++) {
                        if (projectsList[k].id == projectId) {
                            this.findAllByIn('students', 'id', projectsList[k].studentsList).then(function(datas) {
                                resolve(datas);
                            })
                        }
                    }
                }
            }.bind(this));
        } else {
            reject ("missing arg")
        }
    }.bind(this));
}

//Find a project 
},{}]},{},[1]);
