window.tscLib = window.tscLib || {}; window.tscLib['main']=window.tscLib['main'] || {}; window.tscLib['main'].templates = {};
(function($) {
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



  $('body').on('click', 'main-menu-toggle', function(event){
    $('body').toggleClass('show-menu');
  });
})(jQuery);
