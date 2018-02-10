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
                `<li class="menu__items-item" data-id="category-${categories[i].id}" data-ident="category__${categories[i].ident}">
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
                    <div class="projects__category-thumbnail" style="background-image:url('images/thumbnail-${categories[i].id}.jpg')" /></div>
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
                    categoryContent.setAttribute('class','category__content');
            const   categoryDescription = document.createElement('p');
                    categoryDescription.setAttribute('class','category__description');
            const   projectsList  = document.createElement('div');
            const   projectsScreens = document.createElement('div');
                    projectsScreens.classList.add('project__screens', 'hidden');
                    projectsList.classList.add('project__list');
            const   iframe = document.createElement('iframe');
                    iframe.classList.add('project-iframe', 'hidden');

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
                                    projectItem.setAttribute('data-url', `${pathFile}/projet`);
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
                                            <img src="projets/${pathFile}/screens/${l}.jpg" alt=""/>
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
                        categorySection.appendChild(projectsList);
                        categorySection.appendChild(iframe);
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
                            iframe.setAttribute('src', 'projets/'+projectItem.getAttribute('data-url'));

                    switch (projectItem.getAttribute('data-view')) {
                        case 'code':
                            iframe.setAttribute('src', 'projets/'+projectItem.getAttribute('data-url'));
                            break;
                        case 'screen':
                            console.log(projectScreens);
                            break;
                        case 'code-screen':
                            console.log(projectScreens);
                            break;
                    }
                })
            });

        });

    }

})();
