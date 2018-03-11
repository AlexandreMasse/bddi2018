// Burger > au clic "fais la fonction" : ajoute la classe 'open'

$( document ).ready(function() {
  	$('#burger').click(function(event) {
  		$('#menu').toggleClass('open');
  		$(this).toggleClass('active');

// Burger > Clique sur le lien, enlève la classe 'open', burger enlève la classe 'active'
  		$("#menutexte a").click(function(event) {
  			$('#menu').removeClass('open')
  			$('#burger').removeClass('active')
  		});
  	});



// Carousel
  		// On before slide change

  	$('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  	  var first = $(this).find('.slick-active').first();
  	  var last = $(this).find('.slick-active').last();
  	  $(first).addClass('pouet');
  	});


  	$('.carousel').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000,
	  dots: true,
	  centerMode: true,
	  variableWidth: true
	});
  	
// if (width < 960) {
  		
//   		$('.carousel').slick({
//   		autoplay: false,
//   		dots: false,
//   		});
//   	}



Node.prototype.getPosition = function(isCenter){
  var left = 0;
  var top = 0;
  var e = this;

  if (isCenter == true) {
      console.log("center")
      left = e.offsetWidth / 2;
      top = e.offsetWidth / 2;
  }

  /*Tant que l'on a un élément parent*/
  while (e.offsetParent != undefined && e.offsetParent != null) {
      /*On ajoute la position de l'élément parent*/
      left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
      top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
      e = e.offsetParent;
  }

  return {
      x: left,
      y: top
  };
}

Object.defineProperties(window, {
    scrollTop: {
        get: function() {
            return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        },
        set: function(value) {
            var scrollTop = ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
            scrollTop = value;
        }
    }
});

var DynamicTitle = {
	offset: 300,
	setCurrent: function(el){
		var self = this;
		if( !this.label.className.match("hide") && this.label.innerHTML != el.getAttribute("data-scroll")) {
			this.current = el; 
			this.label.classList.add("hide");
			setTimeout(function(){
				self.label.classList.remove("hide");
			}, 400)
			this.label.innerHTML = el.getAttribute("data-scroll");
			console.log("Toggle");
		}
		
	}, 
	initEvent: function(){
		var self = this;
		window.addEventListener("scroll", function(){
			var top = this.scrollTop;
			var elTop;
			for(var i=0; i<self.els.length; i++){
				elTop = self.els[i].getPosition().y;
				if(top + self.offset > elTop && top + self.offset < elTop+window.innerHeight){
					console.log("Yeahh;");
					self.setCurrent(self.els[i]);	
				}
			}
		}, false)
	},
	init: function(){
		this.els = document.querySelectorAll("*[data-scroll]");
		this.label = document.querySelector("#label-dynamic");
		this.initEvent();
	}
}

DynamicTitle.init();

// window.onscroll = function(){
// 	var h = window.innerHeight;
// 	var doc = document.documentElement;
// 	var value = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);


// 	if ( value > h && value < h * 2 - 300) {
// 		$('.top h2').text('ABOUT')
// 	}

// 	if ( value > h * 2 ) {
// 		$('.top h2').text('LATEST PROJECTS')
// 	}
// };



























});

