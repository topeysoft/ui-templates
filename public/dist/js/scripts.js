window.tscLib = window.tscLib || {}; window.tscLib['main']=window.tscLib['main'] || {}; window.tscLib['main'].templates = {"forms/sign-in.html":"<form id=\"sign-in\" style=\"display:none;\"  action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Sign In</h3>\n    </div>\n    <p>We just need some information so we can get you started</p>\n    <br />\n    <!-- Form log in -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"email\" id=\"defaultForm-email\" class=\"form-control email-input\">\n      <label data-error=\"invalid email\" for=\"defaultForm-email\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"defaultForm-pass\" class=\"form-control password-input\">\n      <label data-error=\"Invalid password\" for=\"defaultForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-default btn-lg\">Sign in</button>\n    </div>\n    <br />\n    <p>\n      If you don't have an account yet <a class=\"user-account-div__sign-up-link\" href=\"#\">get started here</a>\n    </p>\n    <p>\n      Other options:\n      <br />\n      <div class=\"providers-div\">\n\n       \n      </div>\n    </p>\n    <!-- <div id=\"firebaseui-auth-container\"></div>\n    <div id=\"sign-in-status\"></div>\n    <div id=\"sign-in\"></div>\n    <div id=\"account-details\"></div> -->\n    <!-- Form log in -->\n  </form>","forms/sign-up.html":"<form id=\"sign-up\"  style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Get Started</h3>\n    </div>\n    <p>Let's get to know each other.</p>\n    <br />\n    <!-- Form register -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-user prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-name\" class=\"form-control  name-input\">\n      <label for=\"orangeForm-name\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your name</label>\n    </div>\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-email\" class=\"form-control email-input\">\n      <label for=\"orangeForm-email\"><i class=\"fa fa-envelope\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"orangeForm-pass\" class=\"form-control password-input\">\n      <label for=\"orangeForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-primary btn-lg\">Continue</button>\n    </div>\n    <br />\n    <p>\n      If you already have an account with us <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in</a>\n    </p>\n    <!-- Form register -->\n<p>Other options</p>\n    <div class=\"providers-div\">\n      \n                       \n                      </div>\n  </form>","forms/signed-out.html":"<form id=\"signed-out\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p class=\"lead\"> You have successfully signed out. <br/> <small>See you again soon</small></p>\n      <p>\n        <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in again</a>\n      </p>\n\n\n    </div>\n\n    <!-- Form log in -->\n  </form>","forms/user-info.html":"<form id=\"user-info\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p>Your are logged in as:</p>\n     <div class=\"row justify-content-center text-center\">\n        <div class=\"col-auto \">\n          {{profileAvatar}}\n            </div>\n        <div class=\"col \">\n            <h1 id=\"user-name\" class=\"font-weight-normal thin\"> {{displayName}}</h1>\n          <p id=\"user-email\" class=\"lead\">{{email}}</p>\n          </div>\n          \n       </div>\n      <p>\n        Not you? <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in as a different user</a>\n      </p>\n      <div class=\"row\">\n          <span class=\"col\">\n              <button  class=\"btn btn-sm btn-secondary user-account-div__sign-out-link\">Sign out</button>\n              </span>\n              <span id=\"user-info-continue-button-col\" class=\"col\">\n                  <a href=\"#\" class=\"btn btn-sm btn-primary\">Continue</a>\n                  </span>\n      </div>\n    </div>\n\n    <!-- Form log in -->\n  </form>"};
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
