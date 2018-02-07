var $ = require('jquery');
var niceModule = require('./modules/niceModule');
var utils = require('./modules/utils');
var animation = require('./modules/animation');
var canvasBackground = require('./modules/canvasBackground');

//Init Background
canvasBackground.init();
// utils.findAllIn('students').then(function(data) {
//     console.log(data);
// });

    var previousSection;
    //Show category list in homepage
    var categoriesList = document.getElementById('categories-list');
    utils.findAllIn('categories').then(function(categories) {
        for (let i = 0; i < categories.length; i++) {
            let categoryName = categories[i].name,
                longCategoryTitle = categoryName.length > 15 ? 'projects__category-title-long' : '';
            var categoryHTML = 
                `<section class="projects__category" data-id="${categories[i].id}" data-name="${categories[i].name}">
                    <div class="projects__category-title ${longCategoryTitle}">
                            <h2>${categoryName}</h2>
                        </div>
                        <div class="projects__category-content">
                        <div class="projects__category-thumbnail"></div>
                            <div class="projects__category-description">
                                <p>${categories[i].description}</p>
                                <span>Next</span>
                            </div>
                        </div>
                </section>`;
            categoriesList.innerHTML += categoryHTML;
        }

        //Event on thumbnail click to load projects from the category
        document.querySelectorAll('.projects__category').forEach(function(category) {
            category.querySelector('.projects__category-thumbnail').addEventListener('click', function() {
                let categoryId = category.getAttribute('data-id');
                showProjectsCategoryList(categoryId);
            });
        });
    });

    function showProjectsCategoryList(categoryId) {
        document.querySelector('.landing').classList.add('hidden');
        document.querySelector('.projects').classList.add('hidden');

        if (document.getElementById('category-'+categoryId)) { //If projects of this category have already been loaded
            console.log('Catégorie déjà chargée avant');
            document.getElementById('category-'+categoryId).classList.remove('hidden');
        } else {
            console.log('1er chargement de la catégorie');
            utils.findAllByIn('categories', 'id', categoryId).then(function(category) {
                utils.findAllProjectsByCategory(categoryId).then(function(projectsCategory) {
                    let categoryProjects =  document.getElementById('category-projects');
                    
                    categoryProjects.classList.remove('hidden');

                    categoryProjects.innerHTML += 
                        `<section id="category-${categoryId}" class="projects__list">
                            <h1>Nom : ${category[0].name}</h1>
                            <p>Description : ${category[0].description}</p>
                        </section>`;

                    let categoryProjectsSection = categoryProjects.querySelector('section'),
                        promises = [];
                    for (let i = 0; i < projectsCategory.length; i++) {
                        (function(index) {
                            utils.findStudentsByProject(projectsCategory[i].id).then(function(students) {
                                var studentsNames = ``;
                                for (let k = 0; k < students.length; k++) {
                                    studentsNames += `${students[k].firstname} ${students[k].lastname} <em>(${students[k].option})</em> - `;


                                    if (k == students.length - 1) {
                                        let projectIdString = `projects-category-${projectsCategory[i].id}`;
                                        categoryProjectsSection.innerHTML += 
                                        `<div id="projects-category-${projectsCategory[i].id}"data-category="category-${categoryId}" class="projects__list-element">
                                        <h2>${projectsCategory[index].name}</h2>
                                        <p>By : ${studentsNames}</p>
                                        <hr>`;
                                        document.getElementById(projectIdString).addEventListener('click', function(){
                                            
                                        });
                                    }
                                }
                            });
                        })(i);
                        if (i == projectsCategory.length - 1) {
                            console.log('yeay');
                            console.log( document.querySelectorAll('.projects__list-element'));
                            document.querySelectorAll('.projects__list-element').forEach(function(projectElement){
                                console.log(projectElement);
                                projectElement.addEventListener('click', function(){
                                    console.log('hakuna matata');
                                })
                            })
                        }
                    }
                    window.scrollTo(0, 0);
                });
            });

        } 
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

    /* TODO: on click hide slides and show landing */
    

// utils.findOneByIn('students', 'firstname', 'Robin').then(function(data){
//     console.log(data)
// });

// utils.findStudentsByProject('1').then(function(data) {
//     console.log(data);
// })

// utils.findAllProjectsByCategory('0').then( function(data){
//     console.log(data)
// })