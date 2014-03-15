var mult = 1;
var count = 0;

$(document).ready(function(){
  SC.initialize({
    client_id: "38d6d47852a0d5e30bdedc439090ba88"
  });

  var iframe = document.querySelector('.iframe');

  var sc_url = 'https://w.soundcloud.com/player/?url=https://soundcloud.com/maquinal/';
  iframe.src = sc_url;

    var widget = SC.Widget(iframe);

  var eventKey, eventName;

  $(".svg-logo-in").click(function(){
    widget.play();
  });

  widget.bind(SC.Widget.Events.PLAY,function(e){
    id = intervalTrigger();
  });

  widget.bind(SC.Widget.Events.FINISH,function(e){

    window.clearInterval(id);
    $('.svg-logo-in').animate({
        "width": 150
    },time/2,'easeOutElastic');
    
  });

  widget.bind(SC.Widget.Events.PAUSE,function(e){
    $('.svg-logo-in').animate({
        "width": 150
    },time/2,'easeOutElastic');
    window.clearInterval(id);
    
  });

});

function intervalTrigger(){
  return window.setInterval(function(){
    $('.svg-logo-in').animate({
        "width": (100 + (50 * mult) ) 
    },time/2,'easeOutElastic');

    if(count % 4 === 0){
      $('.svg-logo-in').animateRotate(90 * mult);  
    }
    

    mult *= -1;
    count++;
  },time);
};
var id;
var time = 1000;


$.fn.animateRotate = function(angle, duration, easing, complete) {
    return this.each(function() {
        var $elem = $(this);

        $({deg: 0}).animate({deg: angle}, {
            duration: duration,
            easing: easing,
            step: function(now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

