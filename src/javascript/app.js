var $ = require('jquery');
var niceModule = require('./modules/niceModule');
var utils = require('./modules/utils');
var animation = require('./modules/animation');
var canvasBackground = require('./modules/canvasBackground');

//Init Background
canvasBackground.init();

var previousSectionId;
    //Loads all categories from file
    utils.findAllIn('categories').then(function(categories) {
        const categoriesList = document.getElementById('categories-list');
        for (let i = 0; i < categories.length; i++) {
            let projects = categories[i].projectsList;

            //TODO : Add categories to menu and create action on click


            //Add categories to homepage
            categoryHTML =
            `<div class="projects__category" data-id="category-${categories[i].id}" data-ident="category__${categories[i].ident}">
                <div class="projects__category-title">
                        <h2>${categories[i].name}</h2>
                    </div>
                    <div class="projects__category-content">
                    <div class="projects__category-thumbnail"></div>
                        <div class="projects__category-description">
                            <p>${categories[i].description}</p>
                            <span>Next</span>
                        </div>
                    </div>
            </div>`;
            categoriesList.innerHTML += categoryHTML;

            //Creates section for each category
            const   categorySection = createCustomElement('section', categories[i].id, 'category', categories[i].ident);
                    categorySection.classList.add('slideToFade', 'hidden', "category")
            const   categoryContent = document.createElement('div');
                    categoryContent.setAttribute('class','category__content');
            const   categoryDescription = document.createElement('p');
                    categoryDescription.setAttribute('class','category__description');
            const   projectsList  = document.createElement('div');
            const   projectsScreens = document.createElement('div');
                    projectsScreens.classList.add('project__screens');
                    projectsList.classList.add('project__list');
            const   iframe = document.createElement('iframe');
                    iframe.classList.add('projects-iframe');

            categoryDescription.innerHTML +=
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
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
                                projectsList.innerHTML +=
                                `<div class="projects__list-item" data-id="project-${projects[index].id}" data-url="${pathFile}/projet">
                                    <div class="project__thumbnail"></div>
                                    <h2>${projects[index].name}</h2>
                                    <p>${studentsNames}</p>
                                </div>`;
                                projectsScreens.innerHTML +=
                                `<div class="project__screen->
                                    <img src="${pathFile}/screens"/>
                                </div>`;
                            }
                        }
                    });
                    if (index == projects.length - 1) {
                        categoryContent.appendChild(projectsList);
                        categoryContent.appendChild(projectsScreens);
                        var homepage = document.getElementById('homepage');
                            homepage.parentNode.insertBefore(categorySection, homepage.nextSibling);
                    }
                })(j);
            }
        }
         //Add click event on category
        categoriesList.querySelectorAll('.projects__category').forEach(function(category) {
            const categoryIdent = category.getAttribute('data-ident');
            category.querySelector('.projects__category-thumbnail').addEventListener('click', function() {
                document.getElementById('homepage').classList.add('hidden');
                document.querySelector('.'+categoryIdent).classList.remove('hidden');
            });
        });
    });

    function createCustomElement(element, id, slug, className) {
        let elementCreated = document.createElement(element);
            slug && className ? elementCreated.classList.add(slug+'__' + className) : false;
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
