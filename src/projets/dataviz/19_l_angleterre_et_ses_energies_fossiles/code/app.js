var scene = document.getElementById('scene'),
    request = new XMLHttpRequest(),
    keyYears = [1961, 1973, 1984, 2015];

var start = document.getElementById('start'),
    html = document.querySelector('html');

// window.onload = function() {
//     console.log("Hey");
//     window.scrollTo(0, 0);
// }

function init() {

    html.style.overflowX = "hidden";

    loadJSON(function(response) {

        var json = JSON.parse(response),
            nbEnergies = json.length,
            production = productionData(json, keyYears, nbEnergies),
            compare = comparaisonData(json, keyYears, nbEnergies, -1);

        scene.addEventListener('load', function() {

            var svg = scene.contentDocument; // Retrieve content

            setYearFigures(svg);
            setTooltipFigure(svg, compare);
            setToolTipContainer(svg);
            setAnime(svg);

            // Start animations
            if (start) {
                start.addEventListener('click', function() {
                    var loader = document.querySelector('.loader');
                    html.style.overflowX = "scroll";
                    TweenMax.to(loader, .5, {opacity: 0});
                    setTimeout(function(){
                        loader.style.display = "none";
                        startAnimation(svg);
                    }, 300);

                });
            }

            // Points pulsate
            var pulses = svg.querySelectorAll('.pulse');

            TweenMax.set(pulses, {
                transformOrigin: '50% 50%' // center the origine
            });

            for (var i = 0, c = pulses.length; i < c; i++){
                var pulsate = new TimelineMax();
                pulsate
                    .to(pulses[i], .4, {scale: 1.8})
                    .to(pulses[i], .6, {scale: 1})
                pulsate.repeat(-1);
            }

            for (var i = 0, c = pulses.length; i < c; i++) {
                pulses[i].setAttribute("style", "cursor: pointer");

                // Events listener
                var drawTooltip,
                    underline,
                    fadeIndication;

                pulses[i].addEventListener('mouseenter', function() {

                    var targetClass = this.getAttribute("data-name"), // Tooltip
                        targetElm = svg.querySelector('.tooltip.' + targetClass),
                        targetElmCircle = targetElm.querySelector('circle'),
                        targetElmLine = targetElm.querySelector('line'),
                        targetElmText = svg.querySelectorAll('.tooltip-figures text.' + targetClass);

                    var currentView = this.getAttribute("data-view"), // Retrieve current view
                        targetFigure = svg.querySelector('.large-figures text[data-view="'+ currentView +'"]'), // Retrieve areas
                        targetIndication = svg.querySelector('.indication[data-view="'+ currentView +'"] .indication-target');

                    // Update data
                    if (this.classList.contains('oil')) {
                        targetFigure.innerHTML = production[currentView - 1].oil + "%";
                        targetIndication.innerHTML = "le pétrole";
                    } else if (this.classList.contains('naturalGas')) {
                        targetFigure.innerHTML = production[currentView - 1].naturalGas + "%";
                        targetIndication.innerHTML = "le gaz naturel";
                    } else {
                        targetFigure.innerHTML = production[currentView - 1].coal + "%";
                        targetIndication.innerHTML = "le charbon";
                    }

                    // Indication fadeIn
                    var targetResource = svg.querySelector('.indication[data-view="'+ currentView +'"]');
                    fadeIndication = TweenMax.to(targetResource, .4, {opacity: 1});

                    // Underline the element
                    var targetUnderline = getUnderline(svg, currentView, this);
                    underline = TweenMax.to(targetUnderline, .4, {opacity: 1, scale: 1});
                    underline.play();

                    function getUnderline(svg, currentView, elm) {
                        var targetUnderlines = svg.querySelector('.tirets[data-view="'+ currentView +'"]');
                        if (elm.classList.contains('oil')) {
                            return targetUnderline = targetUnderlines.querySelector('.tiret.oil');
                        } else if (elm.classList.contains('naturalGas')) {
                            return targetUnderline = targetUnderlines.querySelector('.tiret.naturalGas');
                        } else {
                            return targetUnderline = targetUnderlines.querySelector('.tiret.coal');
                        }
                    }

                    // Tooltip animation
                    drawTooltip = new TimelineMax();
                    drawTooltip
                        .to(targetElmLine, .2, {opacity: 1, scale:1})
                        .to(targetElmCircle, .4, {opacity: 1, scale:1})
                        .to(targetElmText, .4, {opacity: 1, scale:1});
                    drawTooltip.play();
                    pulsate.pause();
                });

                pulses[i].addEventListener('mouseleave', function() {
                    drawTooltip.reverse();
                    pulsate.play();
                    underline.reverse();
                    fadeIndication.reverse();

                    // Update the data with the date
                    var currentView = this.getAttribute("data-view"), // Retrieve current view
                        targetFigure = svg.querySelector('.large-figures text[data-view="'+ currentView +'"]'); // Retrieve area
                    targetFigure.innerHTML = keyYears[currentView - 1];
                });
            }

        });
    });
}

function loadJSON(callback) {
    request.open('GET', './assets/data.json', true); // asynchrone : keep running
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == "200") {
            callback(this.responseText);
        }
    }
    request.send(null);
}

// Set the scene
function setYearFigures(svg) {
    var figures = svg.querySelectorAll('.large-figures text'),
        j = keyYears.length - 1;
    for (var i = 0, c = figures.length; i < c; i++) {
        figures[i].innerHTML = keyYears[j];
        j--;
    }
}
function setTooltipFigure(svg, compare) {
    var tooltipFiguresContainer = svg.querySelectorAll('.tooltip-figures'), // Each year
        k = compare.length - 1;

    // Tooltip
    for (var i = 0, c = tooltipFiguresContainer.length; i < c; i++) {
        if(compare[k].naturalGas < 0) {
            tooltipFiguresContainer[i].querySelector('.figure-percent.naturalGas').innerHTML = (compare[k].naturalGas)*-1 + "%";
            // querySelector : only one ressource per view
            var tooltipIndication = tooltipFiguresContainer[i].querySelector('.figure-percent-indication.naturalGas');
            if (tooltipIndication) {
                tooltipIndication.innerHTML = " de diminuation par ";
            }
        } else {
            tooltipFiguresContainer[i].querySelector('.figure-percent.naturalGas').innerHTML = compare[k].naturalGas + "%";
        }

        if(compare[k].coal < 0) {
            tooltipFiguresContainer[i].querySelector('.figure-percent.coal').innerHTML = (compare[k].coal)*-1 + "%";
            var tooltipIndication = tooltipFiguresContainer[i].querySelector('.figure-percent-indication.coal');
            if (tooltipIndication) {
                tooltipIndication.innerHTML = " de diminuation par ";
            }
        } else {
            tooltipFiguresContainer[i].querySelector('.figure-percent.coal').innerHTML = compare[k].coal + "%";
        }

        if(compare[k].oil < 0) {
            tooltipFiguresContainer[i].querySelector('.figure-percent.oil').innerHTML = (compare[k].oil)*-1 + "%";
            var tooltipIndication = tooltipFiguresContainer[i].querySelector('.figure-percent-indication.oil');
            if (tooltipIndication) {
                tooltipIndication.innerHTML = " de diminuation par ";
            }
        } else {
            tooltipFiguresContainer[i].querySelector('.figure-percent.oil').innerHTML = compare[k].oil + "%";
        }
        k--;
    }

    // function setNegativeFigure(ressource, k, i) {
    //     if(compare[k].ressource < 0) {
    //         tooltipFiguresContainer[i].querySelector('.figure-percent.' + ressource).innerHTML = (compare[k].ressource)*-1 + "%";
    //         var tooltipIndication = tooltipFiguresContainer[i].querySelector('.figure-percent-indication.' + ressource);
    //         if (tooltipIndication) {
    //             tooltipIndication.innerHTML = " de diminuation par ";
    //         }
    //     } else {
    //         tooltipFiguresContainer[i].querySelector('.figure-percent.' + ressource).innerHTML = compare[k].ressource + "%";
    //     }
    // }

    // Year
    var m = keyYears.length - 1;
    for (var i = 0, c = tooltipFiguresContainer.length; i <= c; i++) {
        var tooltipYear = tooltipFiguresContainer[i].querySelectorAll('.figure-percent-year');
        for (var j = 0, c = tooltipYear.length; j < c; j++) {
            tooltipYear[j].innerHTML = keyYears[m] - 1; // Previous year
        }
        m--;
    }
}
function setToolTipContainer(svg) {

    // Hide lines and circles and set positions at the beginning

    var tooltipsCircles = svg.querySelectorAll('.tooltip circle'),
        tooltipsLines = svg.querySelectorAll('.tooltip line'),
        tooltipText = svg.querySelectorAll('.tooltip-figures text'),
        dataLines = svg.querySelectorAll('.tiret'),
        dataIndications = svg.querySelectorAll('.indication');

    for (var i = 0, c = tooltipsLines.length; i < c; i++){
        var coordinates = [
            {
                x1: tooltipsLines[i].getAttribute("x1"),
                y1: tooltipsLines[i].getAttribute("y1")
            }, {
                x2: tooltipsLines[i].getAttribute("x2"),
                y2: tooltipsLines[i].getAttribute("y2")
            }
        ];
        var result = compareCoordinates(coordinates);

        // Tooltip : Set lines, circles and texts
        if (result == "pp") {
            TweenMax.set(tooltipsLines[i], {opacity: 0, scale: 0, transformOrigin: '100% 100%' });
            TweenMax.set(tooltipsCircles[i], {opacity: 0, scale: 0, transformOrigin: '85% 85%' });
        } else if (result == "pn") {
            TweenMax.set(tooltipsLines[i], {opacity: 0, scale: 0, transformOrigin: '100% 0%' });
            TweenMax.set(tooltipsCircles[i], {opacity: 0, scale: 0, transformOrigin: '85% 0%' });
        } else if (result == "np") {
            TweenMax.set(tooltipsLines[i], {opacity: 0, scale: 0, transformOrigin: '0% 100%' });
            TweenMax.set(tooltipsCircles[i], {opacity: 0, scale: 0, transformOrigin: '0% 85%' });
        } else {
            TweenMax.set([tooltipsLines[i],tooltipsCircles[i]] , {opacity: 0, scale: 0 });
        }
        TweenMax.set(tooltipText[i], {opacity: 0, scale: 0, transformOrigin: '50% 50%' });

        // Indication : Set text, lines
        TweenMax.set(dataLines[i], {opacity: 0, scale: 0});
        if (dataIndications[i]) {
            TweenMax.set(dataIndications[i], {opacity: 0});
        }
    }
}
function setAnime(svg) {
    TweenMax.set(svg.getElementById('_1960pylone_1'), {scale: 100, transformOrigin: '100% 50%'});
    TweenMax.set(svg.getElementById('_1960pylone_2'), {scale: 400, transformOrigin: '10% 80%'});
    TweenMax.set(svg.getElementById('_1960pylone_3'), {scale: 450, transformOrigin: '80% 50%'});
    TweenMax.set(svg.getElementById('_1973pylone_4'), {scale: 300, transformOrigin: '50% 100%'});

    TweenMax.set(svg.getElementById('_1960lignepylone1_1'), {scale: 0});
    TweenMax.set(svg.getElementById('_1960lignepylone1_2'), {scale: 0});
    TweenMax.set(svg.getElementById('_1960lignepylone1_3'), {scale: 0});

    TweenMax.set(svg.getElementById('_1960lignepylone2_1'), {scale: 0, transformOrigin: '0% 100%'})
    TweenMax.set(svg.getElementById('_1960lignepylone2_2'), {scale: 0, transformOrigin: '0% 100%'})
    TweenMax.set(svg.getElementById('_1960lignepylone2_3'), {scale: 0, transformOrigin: '0% 100%'})

    TweenMax.set(svg.getElementById('_1960lignepylone3_1'), {scale: 0});
    TweenMax.set(svg.getElementById('_1960lignepylone3_2'), {scale: 0});
    TweenMax.set(svg.getElementById('_1960lignepylone3_3'), {scale: 0});

    TweenMax.set(svg.getElementById('_1960lignepylone4_1'), {scale: 0});
    TweenMax.set(svg.getElementById('_1960lignepylone4_2'), {scale: 0});
    TweenMax.set(svg.getElementById('_1960lignepylone4_3'), {scale: 0});
}

// Start the animation
function startAnimation(svg) {

    var pylones = svg.querySelectorAll('.pylone'),
        timeline = new TimelineMax();

    timeline
        .to(svg.getElementById('_1960pylone_1'), 1.5, {scale: 1})
        .to(svg.getElementById('_1960pylone_2'), 2.5, {scale: 1})
        .to(svg.getElementById('_1960pylone_3'), 1.2, {scale: 1}, "-=3")
        .to(svg.getElementById('_1973pylone_4'), 1.5, {scale: 1}, "-=.75")

        .to(svg.getElementById('_1960lignepylone1_1'), .5, {scale: 1}, "-=1")
        .to(svg.getElementById('_1960lignepylone1_2'), 1, {scale: 1}, "-=.25")
        .to(svg.getElementById('_1960lignepylone1_3'), .25, {scale: 1}, "+=.5")

        .to(svg.getElementById('_1960lignepylone2_1'), .5, {scale: 1}, "-= 1")
        .to(svg.getElementById('_1960lignepylone2_2'), .75, {scale: 1}, "+=.5")
        .to(svg.getElementById('_1960lignepylone2_3'), .5, {scale: 1}, "-=.25")

        .to(svg.getElementById('_1960lignepylone3_1'), .5, {scale: 1}, "-=2")
        .to(svg.getElementById('_1960lignepylone3_2'), .15, {scale: 1})
        .to(svg.getElementById('_1960lignepylone3_3'), .25, {scale: 1}, "-=3")

        .to(svg.getElementById('_1960lignepylone4_1'), .25, {scale: 1}, "-=1")
        .to(svg.getElementById('_1960lignepylone4_2'), .15, {scale: 1}, "-=2")
        .to(svg.getElementById('_1960lignepylone4_3'), .5, {scale: 1}, "-=1.5")
}

// Retrieve ressources information with a years array
function productionData(data, yearsArray, length) {
    var retrieveData = [];

    for (var i = 0, count = yearsArray.length; i < count; i++) {
        var date = yearsArray[i],
            ressources = {};

        for (var j = 0; j < length; j ++) {
            var elm = data[j],
                name = elm.name,
                quantity = Math.round(elm.data[date]);
            ressources[name] = quantity; // create an object with different dates
        }
        retrieveData.push(ressources);
    }
    return retrieveData;
}

// Retrieve ressources information with a years array between a step (from a year)
function comparaisonData(data, yearsArray, length, step) {
    var retrieveData = [];

    for (var i = 0, count = yearsArray.length; i < count; i++) {
        var date = yearsArray[i],
            ressources = {};

        for (var j = 0; j < length; j ++) {
            var elm = data[j],
                prevDate = date + step,
                name = elm.name;

                // Check if previous or next data exist
                if (elm.data[prevDate]) {
                    quantity = Math.round(elm.data[date] - elm.data[prevDate]);
                } else {
                    quantity = 0;
                }
            ressources[name] = quantity;
        }
        retrieveData.push(ressources);
    }
    return retrieveData;
}

function compareCoordinates(array) {
    var coordinates = array;

    var deltaX = coordinates[0].x1 - coordinates[1].x2;
    var deltaY = coordinates[0].y1 - coordinates[1].y2;

    if (deltaX > 0 && deltaY > 0) {
        return "pp";
    } else if (deltaX > 0 && deltaY < 0) {
        return "pn";
    } else if (deltaX < 0 && deltaY > 0) {
        return "np";
    } else {
        return "nn"
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min; //min (incluse) and max (exclue)
}

init();
