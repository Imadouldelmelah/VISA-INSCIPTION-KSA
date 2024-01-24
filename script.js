// ------------register-steps--------------
$(document).ready(function () {
  $(".round-progress").circleProgress({
      fill: {
          color: '#25ce68'
      },
      startAngle: -3.14
  });

  $('.nav-tabs > li a[title]').tooltip();
  //Wizard
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var $target = $(e.target);
      if ($target.hasClass('disabled')) {
          return false;
      }

      var circle = $(".round-progress").circleProgress({
          fill: {
              color: '#25ce68',
          },
          startAngle: -3.14
      }).on("circle-animation-progress", function( event, animationProgress, stepValue) {
          var instance = $(this).data("circle-progress");
          instance.arcFill = setGradient(stepValue);
      });

      // handle with prgressbar 
      var step = $(e.target).data('step');
      var cirpercent = (parseInt(step) / 4);
      circle.circleProgress('value', cirpercent); 
      $('.round-progress-bar').text('Step ' + step + ' of 4');
      
    
  });
  
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
      var $target = $(e.target);
      $target.parent().addClass('active');
  });

  $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
      var $target = $(e.target);
      $target.parent().removeClass('active');
  });


  $(".next-step").click(function (e) {
      var $active = $('.wizard .nav-tabs li a.active');
      $active.parent().next().children().removeClass('disabled');
      $active.parent().addClass('done');
      nextTab($active);
  });

  $(".prev-step").click(function (e) {
      var $active = $('.wizard .nav-tabs li a.active');
      prevTab($active);
  });
});

function nextTab(elem) {
  $(elem).parent().next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
  $(elem).parent().prev().find('a[data-toggle="tab"]').click();
}