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





exports.fadeOut = function(el, duration, delay = 0) {
    el.style.transition = "opacity 0.3s";
    var s = el.style;
    s.opacity = 1;
    setTimeout(function () {
        (function fade() {
            (s.opacity-=.1) < -0.5 ? s.display="none" : setTimeout(fade,duration * 100)
        })();
    },delay * 1000)

    window.scrollTo({
        "behavior": "smooth",
        "left": 0,
        "top":0
    });
}

exports.fadeIn = function(el, duration, delay = 0) {
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
