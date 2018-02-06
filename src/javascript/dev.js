var utils = require('./modules/utils-test');

var body = document.querySelector('body');

utils.findAllIn('lea').then(function(categories) {
    for (let i = 0; i < 1; i++) {
        var table = document.createElement('table');
        document.body.appendChild(table);
        table.style.border = '1px solid red';
        table.innerHTML = '<caption>'+categories[i].name+'</caption><thead><tr><th>Nom projet</th><th>Chemin fichier screens</th><th>Chemin fichier projet</th><th>Binomes</th></tr></thead><tbody></tbody>';
        var tbody = table.querySelector('tbody'),
            projectsList = categories[i].projectsList;

        for (let k = 0; k < projectsList.length ; k++) {
            utils.findStudentsByProject(projectsList[k].id.toString()).then(function(students) {
                var studentsNames = '';
                for (let j = 0; j < students.length; j++) {
                    studentsNames += students[j].lastname + ' ' + students[j].firstname + ' - ';
                    if (j == students.length - 1){
                        tbody.innerHTML += '<tr><td>'+projectsList[k].name+' </td><td>'+categories[i].ident+'/'+projectsList[k].id+'_'+projectsList[k].ident+'/screen</td><td>'+categories[i].ident+'/'+projectsList[k].id+'_'+projectsList[k].ident+'/projet</td><td>'+studentsNames+'</td></tr>';
                    }
                }
            })
        }
    }
});