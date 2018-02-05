function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Error with URL " + url);
    });
    req.send(null);
}

//List all objects from file
exports.findAllIn = function(file, callback) {
    if (file && callback){
        ajaxGet('./data/'+file+'.json', function(data) {
            callback(JSON.parse(data));
        });
    }  
}

//Find an object from file with attribute as attr, and value as value
exports.findOneByIn = function(file, attr, value, callback) {
    if (file && attr && value && callback) {
        this.findAllIn(file, function(datas) {
            for (let i = 0; i < datas.length; i++) {
                if (datas[i][attr] == value) {
                    callback(datas[i]);         
                }
            }
        });   
    } 
}

//Find all objects from file with attribute as attr, and values as values 
exports.findAllByIn = function(file, attr, values, callback){
    if (file && attr && values && callback) {
        var list = [];
        for (let i = 0; i < values.length; i++) {
            this.findOneByIn(file, attr, values[i], function(datas) {
                list.push(datas);
                if (i == values.length - 1) {
                    callback(list);
                }
            });
        }   
    }
}

//Lists all projects by categoryId
exports.findAllProjectsByCategory = function(categoryId, callback) {
    if (categoryId && callback) {
        this.findOneByIn('categories', 'id', categoryId, function(datas) {
            callback(datas.projectsList);
        });   
    } 
}

//List all students by projectId
exports.findStudentsByProject = function(projectId, callback) {
    if (projectId && callback) {
        var ctx = this;
        // TODO: use findAllProjectsByCategory
        ctx.findAllIn('categories', function(datas) { //Gets all datas
            for (let i = 0; i < datas.length; i++) { //Loops in all categories
                var projectsList = datas[i].projectsList;
                for (let k = 0; k < projectsList.length; k++) {
                    if (projectsList[k].id == projectId) {
                        ctx.findAllByIn('students', 'id', projectsList[k].studentsList, function(datas) {
                            callback(datas);
                        })
                    }
                }
            }
        });   
    } 
}