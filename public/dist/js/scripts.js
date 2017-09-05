window.tscLib = window.tscLib || {}; window.tscLib['main']=window.tscLib['main'] || {}; window.tscLib['main'].templates = {};
(function($) {
  $.extend({
    stickToBottom: function(options) {
      $(window).on("scroll", function() {
        try {
          var scrollElem = $(options.scrollSelector);
          var stickyElem = $(options.stickySelector);
          var offset = -stickyElem.innerHeight();
          if (
            scrollElem.offset().top + scrollElem.outerHeight() <=
            window.scrollY + $(window).innerHeight() + offset
          ) {
            stickyElem.removeClass("fixed-bottom");
          } else {
            stickyElem.addClass("fixed-bottom");
          }
        } catch (err) {}
      });
    }
  });

  $.stickToBottom({
    scrollSelector: "#form-wizard #fix-break-point",
    stickySelector: "#form-wizard .wizard-footer"
  });
})(jQuery);
