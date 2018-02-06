//var $ = require('jquery');
var niceModule = require('./modules/niceModule')
var utils = require('./modules/utils')
var dev = require('./dev')

utils.findAllIn('students');

utils.findOneByIn('students', 'firstname', 'Robin', function(data){
    // console.log(data)
});

utils.findStudentsByProject('1', function(data) {
    // console.log(data);
})

utils.findAllProjectsByCategory('0', function(data){
    // console.log(data)
})