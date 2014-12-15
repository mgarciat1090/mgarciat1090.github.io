var MG = MG || {};


var contactApp = angular.module('contactApp',['firebase']);
contactApp.value('FIREBASE_URL','https://intense-fire-9074.firebaseio.com/');

contactApp.controller('ContactController',function($scope,$firebase,FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var contact = $firebase(ref);

	$scope.contactForm = contact.$asObject();

	$scope.addContact = function(){
		contact.$push({
			name : $scope.email,
			message : $scope.message,
			date : Firebase.ServerValue.TIMESTAMP
		}).then(function(){
			$scope.email = ''; 
			$scope.message = ''; 

			sweetAlert("Your message has been sent!");
		})
		
	}
});



(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');



MG.Counter = function(elem){
	this.$elem = $(elem),
	this._per = parseInt(this.$elem.attr("data-per")),
	this.inner = $("<div class='inner-percent'></div>");

	this.$elem.append(this.inner);

	return this;
};

MG.Counter.prototype.animate = function(){
	var self = this,
	parentWidth = this.$elem.width(),
	newWidth = parentWidth * this._per * .01;

	this.inner.stop(true,true).animate({
		"width" : newWidth
	},{
		easing : "easeOutQuad",
		duration: 1000
	})
};

$(document).ready(function(){
	
	$(".percentage").each(function(iter,elem){
		var instance = new MG.Counter(elem);
		MG.Counter.prototype.animate.call(instance);
	});

	$(window).smartresize(function(){

	});

	$('body').scrollspy({ target: '.navbar' })

	$(".goDetail").click(function(e){
		e.preventDefault();
		$("html, body").animate({ scrollTop: $("#detail").offset().top });
	})
});