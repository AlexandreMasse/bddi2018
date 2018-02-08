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
            let projects = categories[i].projectsList,
            //Add categories to homepage
            categoryHTML =
            `<div class="projects__category" data-id="category-${categories[i].id}">
                <div class="pprojects__category-title">
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
            const categorySection = createCustomElement('section', categories[i].id, 'category', categories[i].ident);
            const   projectsList  = document.createElement('div');
            const   projectsScreens = document.createElement('div');
            projectsScreens.classList.add('project__screens');
            projectsList.classList.add('project__list');
            const   iframe = document.createElement('iframe');
            iframe.classList.add('projects-iframe');
            
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
                                    <h2>${projects[index].name}</h2>
                                    <p>By : ${studentsNames}</p>
                                    <hr>
                                </div>`;
                                projectsScreens.innerHTML += 
                                `<div class="projet__screen->
                                    <img src="${pathFile}/screens"/>
                                </div>`;
                            }
                        } 
                    });
                    if (index == projects.length - 1) {
                        categorySection.appendChild(projectsList);
                        categorySection.appendChild(projectsScreens);
                        document.body.appendChild(categorySection);
                    }
                })(j);   
            }
        }
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