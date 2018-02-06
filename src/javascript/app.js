//var $ = require('jquery');
var niceModule = require('./modules/niceModule')
var dev = require('./dev') 
var utils = require('./modules/utils-test')

// utils.findAllIn('students').then(function(data) {
//     console.log(data);
// });


//Show category list in homepage
var categoriesList = document.getElementById('categories-list');
if (categoriesList) {
    utils.findAllIn('categories').then(function(data) {
        for (let i = 0; i < data.length; i++) {
            let categoryName = data[i].name,
                longCategoryTitle = categoryName.length > 15 ? 'projects__category-title-long' : '';
                console.log(categoryName.length);
            var categoryHTML = 
            `<section class="projects__category">
                <div class="projects__category-title ${longCategoryTitle}">
                        <h2>${categoryName}</h2>
                    </div>
                    <div class="projects__category-content">
                    <div class="projects__category-thumbnail"></div>
                        <div class="projects__category-description">
                            <p>${data[i].description}</p>
                            <span>Next</span>
                        </div>
                    </div>
            </section>`;
            categoriesList.innerHTML += categoryHTML;
        }
    });
}

// utils.findOneByIn('students', 'firstname', 'Robin').then(function(data){
//     console.log(data)
// });

// utils.findStudentsByProject('1').then(function(data) {
//     console.log(data);
// })

// utils.findAllProjectsByCategory('0').then( function(data){
//     console.log(data)
// })