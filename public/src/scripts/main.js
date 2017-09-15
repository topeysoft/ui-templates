const viewport = {xs:true, sm:true, md:true, lg:true, xl:true};
function setViewport(){
  let div = $('#viewport-div')
  if(div.length<1){
    div = $(`<div id="viewport-div">
    <i id="viewport-xs" class="d-block d-sm-none"></i>
    <i id="viewport-sm" class="d-none d-sm-block d-md-none"></i>
    <i id="viewport-md"  class="d-none d-md-block d-lg-none"></i>
    <i id="viewport-lg"  class="d-none d-lg-block d-xl-none"></i>
    <i id="viewport-xl" class="d-none d-xl-block"></i>
    </div>`)
    $('body').append(div);
  }
  $.each(viewport, function (size, value){
    viewport[size] = $('#viewport-'+size).is(":visible");
    if(viewport[size]){
      $('body').attr('data-viewport', size)
    }
  });
   console.log('viewport', viewport);
}
(function($) {
  setViewport();
  $.extend({
    stickToBottom: function(args) {
      let options = {css_class:'fixed', scrollSelector:'body'};
      $.extend(options, args);
      $(document.body).on("scroll", function() {
        try {
          var scrollElem = $(options.scrollSelector);
          var stickyElem = $(options.stickySelector);
          var offset = -stickyElem.innerHeight();
          // if(!stickyElem.data('position')){
          //   stickyElem.data('position', stickyElem.css('position'));
          // }
          // if(!stickyElem.data('bottom')){
          //   stickyElem.data('bottom', stickyElem.css('bottom'));
          // }
          if (
            scrollElem.offset().top + scrollElem.outerHeight() <=
            window.scrollY + $(window).innerHeight() + offset
          ) {
            stickyElem
            // .css('position', stickyElem.data('position'))
            // .css('bottom', stickyElem.data('bottom'))
            .removeClass(options.css_class)
            .removeClass("fixed-bottom");
          } else {
            stickyElem
            // .css('position', 'fixed')
            // .css('bottom', '0')
            .addClass(options.css_class)
            .addClass("fixed-bottom");
          }
        } catch (err) {
          console.log(err)
        }
      });
    }
  });

  $.stickToBottom({
    scrollSelector: "#form-wizard #fix-break-point",
    stickySelector: "#form-wizard .wizard-footer",
    css_class:'z-depth-2'
  });



  $('body').on('click', '.main-menu-toggle', function(event){
    $('body').toggleClass('show-menu');
  });

$(window).on('resize', function(event){
  setViewport();
})

    // if(window.tscLib.plugins){
    //   $.each(window.tscLib.plugins, (function(i, plugin){
    //      if(!plugin.initialized){
    //         plugin.initialize();
    //         plugin.initialized =true;
    //      };
    //   }))
    // }
})(jQuery);