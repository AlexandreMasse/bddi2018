var $ = require('jquery')
var niceModule = require('./modules/niceModule')
var utils = require('./modules/utils-test')
var animation = require('./modules/animation')


utils.findAllIn('students').then(function (data) {
    console.log(data);
});


utils.findOneByIn('students', 'firstname', 'Robin').then(function(data){
    console.log(data)
});

utils.findStudentsByProject('1').then(function(data) {
    console.log(data);
})

utils.findAllProjectsByCategory('0').then( function(data){
    console.log(data)
})
