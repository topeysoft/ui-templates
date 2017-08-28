(function($) {
  $.extend({
    stickToBottom: function(options) {
      var $elem = this;
      $(window).on("scroll", function() {
        try {
          var scrollElem = $(options.scrollSelector);
          var stickyElem = $(options.stickySelector);
          if (
            scrollElem.offset().top + scrollElem.outerHeight() <=
            window.scrollY + $(window).innerHeight() + options.offset
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
    stickySelector: "#form-wizard .wizard-footer",
    offset: 0
  });
})(jQuery);
