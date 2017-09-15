window.tscLib = window.tscLib || {}; window.tscLib['user-account']=window.tscLib['user-account'] || {}; window.tscLib['user-account'].templates = [{"filename":"sign-in.html","path":"forms/","full_path":"forms/sign-in.html","content":"<form id=\"sign-in\" style=\"display:none;\"  action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Sign In</h3>\n    </div>\n    <p>We just need some information so we can get you started</p>\n    <br />\n    <!-- Form log in -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"email\" id=\"defaultForm-email\" class=\"form-control email-input\">\n      <label data-error=\"invalid email\" for=\"defaultForm-email\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"defaultForm-pass\" class=\"form-control password-input\">\n      <label data-error=\"Invalid password\" for=\"defaultForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-default btn-lg\">Sign in</button>\n    </div>\n    <br />\n    <p>\n      If you don't have an account yet <a class=\"user-account-div__sign-up-link\" href=\"#\">get started here</a>\n    </p>\n    <p>\n      Other options:\n      <br />\n      <div class=\"providers-div\">\n\n       \n      </div>\n    </p>\n    <!-- <div id=\"firebaseui-auth-container\"></div>\n    <div id=\"sign-in-status\"></div>\n    <div id=\"sign-in\"></div>\n    <div id=\"account-details\"></div> -->\n    <!-- Form log in -->\n  </form>"},{"filename":"sign-up.html","path":"forms/","full_path":"forms/sign-up.html","content":"<form id=\"sign-up\"  style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Get Started</h3>\n    </div>\n    <p>Let's get to know each other.</p>\n    <br />\n    <!-- Form register -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-user prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-name\" class=\"form-control  name-input\">\n      <label for=\"orangeForm-name\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your name</label>\n    </div>\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-email\" class=\"form-control email-input\">\n      <label for=\"orangeForm-email\"><i class=\"fa fa-envelope\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"orangeForm-pass\" class=\"form-control password-input\">\n      <label for=\"orangeForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-primary btn-lg\">Continue</button>\n    </div>\n    <br />\n    <p>\n      If you already have an account with us <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in</a>\n    </p>\n    <!-- Form register -->\n<p>Other options</p>\n    <div class=\"providers-div\">\n      \n                       \n                      </div>\n  </form>"},{"filename":"signed-out.html","path":"forms/","full_path":"forms/signed-out.html","content":"<form id=\"signed-out\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p class=\"lead\"> You have successfully signed out. <br/> <small>See you again soon</small></p>\n      <p>\n        <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in again</a>\n      </p>\n\n\n    </div>\n\n    <!-- Form log in -->\n  </form>"},{"filename":"user-info.html","path":"forms/","full_path":"forms/user-info.html","content":"<form id=\"user-info\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p>Your are logged in as:</p>\n     <div class=\"row justify-content-center text-center\">\n        <div class=\"col-auto \">\n          {{profileAvatar}}\n            </div>\n            <p class=\"w-100\"></p>\n        <div class=\"col \">\n            <h1 id=\"user-name\" class=\"font-weight-normal thin\"> {{displayName}}</h1>\n          <p id=\"user-email\" class=\"lead\">{{email}}</p>\n          </div>\n          \n       </div>\n      <p>\n        Not you? <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in as a different user</a>\n      </p>\n      <div class=\"row\">\n          <span class=\"col\">\n              <button  class=\"btn btn-sm btn-secondary user-account-div__sign-out-link\">Sign out</button>\n              </span>\n              <span id=\"user-info-continue-button-col\" class=\"col\">\n                  <a href=\"#\" class=\"btn btn-sm btn-primary\">Continue</a>\n                  </span>\n      </div>\n    </div>\n\n    <!-- Form log in -->\n  </form>"}];
window.tscLib['user_account'] = {};
window.tscLib['user_account'].preparePluginConfig = function () {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var settings = {};
      try {
        settings = JSON.parse(xhr.responseText);
      } catch (err) {
        console.log('User account config error', err)
      }
      settings = settings || {};
      settings.config = settings.config || {};
      settings.config.namespace =  'user_account';
      settings.options = settings.options || {};
      // settings.config.user_account_uri =  settings.config.user_account_uri || '/plugins/user-account/';
      settings.config.locked_uris = settings.config.locked_uris || ['', '/plugins/user-account/', '/plugins/form-wizard/'];
      settings.config.firebase = settings.config.firebase || {};
      settings.options.container_selector = settings.options.container_selector || '#user-account-div.user-account-div';

      window.tscLib['user_account'].initializePlugin(settings);
    }
  };
  xhr.open(
    "GET",
    "https://cms.api.elyir.local:8443/projects/59062e028631a043f468fc73/plugins/user_account/config/?use_sandbox=true",
    true
  );
  xhr.send(null);
}


window.tscLib['user_account'].initializePlugin = function (settings){
  window.tscLib = window.tscLib || {};
  window.tscLib[settings.config.namespace] = window.tscLib[settings.config.namespace] || {};
  if (tscLib[settings.config.namespace].initialized) {
    return;
  }
  firebase.initializeApp(settings.config.firebase);
  tscLib[settings.config.namespace].initialized = true;
  const containerSelector = settings.options.container_selector;
  function switchToForm(formId) {
    var pluginDiv = $(containerSelector);
    pluginDiv.find('form').hide();
    pluginDiv.find('form#' + formId).show();
    event.preventDefault();
  }

  $(document).on('tsc:user_service:ready', function(event, user){
      Loader.hide('user-service-loader');
      const userFormService = new UserFormService(settings);
      
      window.tscLib.userFormService = userFormService;
      if (window.requireUserLogin) {
        window.tscLib.userService.redirectIfNotLoggedIn();
      }
      userFormService.renderPluginUI();
    });
    const userService = new UserService(settings);
    window.tscLib.userService = userService;
}

$(document).ready(function () {
  Loader.presentFullScreen({identifier:'user-service-loader', text:'Hang on, we are starting al the things...'});  
  window.tscLib['user_account'].preparePluginConfig();
});


function UserFormService(settings){
    let config = settings.config || {};
    let options = settings.options || {};
    let _userAccountModal = null;
    const _this = this;

    function allValid(inputArray) {
        var allIsValid = true;
        $.each(inputArray, function(index, input) {
            const validateFn = tscLib.userService.validate[$(input).attr('type')] || function(){return true};
             if(!validateFn($(input).val())){
                 allIsValid =false;
                 $(input).addClass('invalid').next().addClass('active').focus();
             }
        }) 
        return allIsValid;
     }

    _this.pluginUI = $('<div ></div>');

    const htmlFormContents = "";
    const formTemplates ={};
    _this.canAccessPage = function () {
        let uri = location.pathname.replace(/\//g,'');
        config.locked_uris = config.locked_uris || [];
        if(tscLib.userService.isLoggedIn()){
            return true;
        }
        let canAccess = true;
        $.each(config.locked_uris, function(i, locked_uri) {
            let cleaned_locked_uri=locked_uri.replace(/\//g,'');
             if(uri===cleaned_locked_uri){
                canAccess = false;
                return canAccess;
            }
        });

        return canAccess;
    }
    _this.showForm = function(formId, data){
        const pluginDiv = _this._pluginDiv || $(options.container_selector);
        // if(formId === 'user-info' && _userAccountModal && _userAccountModal.length>0){
        //    setTimeout(function(){
        //     _userAccountModal.modal('hide');
        //    }, 2000);
        // }
        pluginDiv.find('form').hide();
        var form = pluginDiv.find('form#'+formId);
        if(form && form.length>0){
            form.show();
            if(data){
                _this.renderContentData(form, data);
            }
        }
    }

    

    _this.showUserAccountModal = function(){
        return new Promise(function(resolve, reject){
            let modalString = `<div class="modal fade " id="user-account-modal" tabindex="-1" role="dialog" aria-labelledby="user-account-modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div id="user-account-modal-body" class="modal-body d-block p-5 text-center ">
              ...
            </div>
          </div>
        </div>
      </div>`;
      let pluginDiv =  $('body #user-account-modal');
      if(pluginDiv.length<1){
        pluginDiv = $(modalString);
        $('body').append(pluginDiv);
      }
      _userAccountModal = pluginDiv;
      _userAccountModal.on('show.bs.modal', function (e) {
        resolve({});
      });
      _userAccountModal.find('#user-account-modal-body').html('').append(_this.pluginUI);
      _userAccountModal.modal({backdrop:'static', keyboard:false});
      _this._pluginDiv = _userAccountModal;
      _this.renderProvidersUI();
      _this.postRender();
    });
    }
    _this.renderContentData = function(form, data){
        re = /{{([^}]*)}}/g
        var html = formTemplates[form[0].id];
        if(!html){
           html = form.html();
           formTemplates[form[0].id] = html;
        }
        html = parseContentData(html, data);
        //     var arr = html.match(re);
        // $.each(arr, function(i, e){
        //     properyName = $.trim(e.replace('{{','').replace('}}',''));
        //     var prop = data[properyName] ||'';
        //     html = html.replace(e, prop);
        // });
        form.html(html);
    }
    _this.renderPluginUI = function(){
        const pluginDiv = $(options.container_selector);
        pluginDiv.html('');  
        if(pluginDiv.length>0){
            pluginDiv.append(_this.pluginUI);
            _this._pluginDiv = pluginDiv;
            _this.renderProvidersUI(); 
            _this.postRender();           
        }else{
            let inUrl = false;
            let hash = location.hash || '';
            hash= hash.split('?')[0] || hash;
            if(!hash || hash!=='#user-account'){
                let search = location.search || '';
                $.each(search.replace('?', '').split('&'), function(i, s){
                    let k = s.split('=');
                    if(k[0].toLowerCase() ==='user-account'){
                        inUrl = true;
                    }
                });
            }else{
                inUrl = true;
            }
            if(inUrl){
                _this.showUserAccountModal();
            }
        }

          tscLib.userService.postSignIn();
    } 
    _this.renderProvidersUI =function(){
        let arr = tscLib.userService.options.providers;
        var parent =_this._pluginDiv.find('.providers-div').html('').addClass('row');
        $.each(arr, function(i, provider){
            const button = $(provider.uiButton);
            button.on('click', function(event){
                event.preventDefault();
                tscLib.userService.thirdPartySignIn(button.data('provider'));
            })
            const btnSpan = $('<div class="col-12 col-md-6 mt-3 p-0" ></div>').append(button);
            parent.append(btnSpan);
        });

    }

    _this.postRender = function(){
        tscLib.isUserAccountPage = true;
        let redirectUrl = _this.getRedirectUri();
        let col = $('#user-info #user-info-continue-button-col').hide();
        if(redirectUrl){
           col.find('a').prop('href', redirectUrl);
           col.show();
           $('body').on('click', '#user-info #user-info-continue-button-col a', function(event){
               try {
                _userAccountModal.modal('hide');
               } catch (err) { }
            });
        }else if(_userAccountModal && _userAccountModal.length>0){
            $('body').on('click', '#user-info #user-info-continue-button-col a', function(event){
                try {
                    _userAccountModal.modal('hide');
                   } catch (err) { }
                event.preventDefault();
            });
            col.show().find('a').prop('href','#').html('close');
        }
        $('body').on('click', '.user-account-div__sign-in-link', function(event){
            event.preventDefault();
            _this.showForm('sign-in');
        });
        $('body').on('click', '.user-account-div__sign-up-link', function(event){
            event.preventDefault();
            _this.showForm('sign-up');
        });
    
        $('body').on('click', '.user-account-div__sign-out-link', function(event){
            event.preventDefault();
            tscLib.userService.signOut();
        });
    
        $('body').on('submit',' #sign-up', function(event){
            const inputs = $(this).find('input');
            event.preventDefault();
            if(allValid(inputs)){
                const email = $(this).find('input.email-input').val();
                const password = $(this).find('input.password-input').val();
                const displayName = $(this).find('input.name-input').val();
                tscLib.userService.signUp(email, password, displayName);
            }
        });
        $('body').on('submit',' #sign-in', function(event){
            const inputs = $(this).find('input');
            event.preventDefault();
            if(allValid(inputs)){
                const email = $(this).find('input.email-input').val();
                const password = $(this).find('input.password-input').val();
                tscLib.userService.signIn(email, password);
            }
        });
        $('body').on('input','#sign-in input, #sign-in input', function(event){
            $(this).removeClass('invalid');
        });
    }

    _this.getRedirectUri = function(){
        let query = [];
       try{
            query = ((location.search ||  '').replace('?','').split('&')).filter(a=>!(!a)) 
        }catch(e){ }
    try{
       if(!query|| query.length<1){
            query = (location.href.split('?')[1].split('&')) ||[];
       }    
    }catch(e){}
    try{
        query = query ||[];
        let queryObj = {};
        $.each(query, function(i, q){
            let arr = q.split('=');
            queryObj[arr[0]]=arr[1];
         });
         query = queryObj;
    }catch(e){}
        return query['redirectUrl'];
    }    
    _this.ensureProperAccess = function(){        
        if(!tscLib.userService.isLoggedIn() && !_this.canAccessPage()){
            let user_account_uri = config.user_account_uri;        
            if(user_account_uri && !tscLib.isUserAccountPage){
                let currentUrl = location.href;
                let loginUri = location.protocol+'//'+location.host+'/'+user_account_uri+'?redirectUrl='+currentUrl;
                location.href = loginUri;
            }
        }
    }
    function insertTemplates(){
        $.each(tscLib['user-account'].templates, function(index, template){
            _this.pluginUI.append($(template.content).hide());
        });
    }
    _this.setup = function(){
        insertTemplates();
        
    }
    this.setup();
}

function UserService(settings) {
    settings = settings || {};
    let config = settings.config || {};
    let options = settings.options || {};
    const _this = this;
    signedOut = false;
    function postSignIn() {
        const user = _this.getUserInfo();
        if (user) {
            tscLib.userFormService.showForm('user-info', user);
        }
    }
    _this.postSignIn = postSignIn;
    _this.signIn = function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            postSignIn();
            // console.info(result);
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            // ...
        });
    }
    _this.signOut = function () {
        signedOut = true;
        firebase.auth().signOut().then(data => {
            tscLib.userFormService.showForm('signed-out');
        });
    }
    _this.getToken = function () {
        const user = _this.getUserInfo();
        if (!user) {
            _this.redirectToLogin();
        }
        return user.getIdToken();
    }
    _this.signUp = function (email, password, displayName) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                user.updateProfile({
                    displayName: displayName
                }).then(function () {
                    // Update successful.
                    console.log('User updated', _this.getUserInfo());

                }).catch(function (error) {
                    // An error happened.
                });
                if (!user.isVerified) {
                    user.sendEmailVerification().then(function () {
                        console.log('Verification email sent');
                        // Email sent.
                    }).catch(function (error) {
                        // An error happened.
                    });
                }
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                // ...
            });
    }
    _this.getUserInfo = function () {
        return firebase.auth().currentUser;
    }
    _this.isLoggedIn = function () {
        let loggedIn = false;
        try {
            loggedIn = JSON.parse(localStorage.getItem('logged_in'));
        } catch (er) { }
        return loggedIn;
    }

    _this.redirectIfNotLoggedIn = function (args = {}) {
        let options = { redirectToUrl: '', forceShowLogin: true };
        $.extend(options, args);
        if (!_this.isLoggedIn()) {
            _this.redirectToLogin();
        }
    }
    _this.redirectToLogin = function () {
        let redirectToUrl = options.redirectToUrl;
        let user_account_uri = config.user_account_uri;
        let loginUri = location.href;
        let currentUrl = location.href;
        if (redirectToUrl) {
            loginUri = redirectToUrl;
        } else {
            if (user_account_uri) {
                loginUri = location.protocol + '//' + location.host + '/' + user_account_uri;
            } else {
                loginUri = currentUrl;
            }
        }
        loginUri += '#user-account?redirectUrl=' + currentUrl;
        location.href = loginUri;
    }
    _this.watchAuth = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            $(document).trigger('tsc:user_service:ready', [user]);
            if (user) {
                // User is signed in.
                setUserColor(user);
                setUserInitials(user);
                user.displayName = user.displayName || email;
                let text = user.photoURL ? '' : user.initials;
                let avatar = `<div style="background-color:${user.profileColor.value};
                background-image:url(${user.photoURL}); 
                background-size:cover; border-radius:50%; 
                margin:1rem;width:4rem; font-size:1.5rem; font-weight:300; height:4rem;
                 line-height:3rem; text-align:center; color:white">${text}</div>`
                user.profileAvatar = avatar;
                postSignIn();
                localStorage.setItem('logged_in', 'true');
                $(document).trigger('tsc:user_service:logged-in', [user]);
            } else {
                localStorage.setItem('logged_in', 'false');
                const view = signedOut ? 'signed-out' : 'sign-in';
                $(document).trigger('tsc:user_service:' + (signedOut ? 'logged-out' : 'not-logged-in'), [user]);
                tscLib.userFormService.showForm(view);

            }
        });
    }
    _this.validateEmail = function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    _this.validatePassword = function validateEmail(password) {
        password = password || '';
        return $.trim(password).length > _this.options.password_requirements.minLength;
    }

    _this.validate = {
        email: _this.validateEmail,
        password: _this.validatePassword
    }
    _this.options = {
        password_requirements: {
            minLength: 6
        },
        providers: [
            {
                name: "Google",
                uiButton: $(`<button class="btn btn-google btn-social-login waves-effect text-left">
                <span class="row m-0">
                <span class="col-auto p-0 pr-2"><img  
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span><span class=" p-0 col
                  d-none d-md-inline">Continue with Google</span><span class="p-0 col d-md-none">Continue with Google
                  </span> </span></button>`).data('provider', new firebase.auth.GoogleAuthProvider())
                ,
                uiIcon: '<span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span>',
            },
            {
                name: "Facebook",
                uiButton: $(`<button class="btn btn-facebook btn-social-login waves-effect text-left">
               <span class="row m-0">
               <span class="col-auto p-0 pr-2"><img  
                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"></span><span class=" p-0 col
                 d-none d-md-inline">Continue with Facebook</span><span class="p-0 col d-md-none">Continue with Facebook
                 </span> </span></button>`)
                    .data('provider', new firebase.auth.FacebookAuthProvider()),
                
                uiIcon: '<span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" \
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"></span>',
            }
        ]
    }

    _this.thirdPartySignIn = function (provider) {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    const userColors = [
        { name: 'red', value: '#b71c1c' },
        { name: 'purple', value: '#4a148c' },
        { name: 'blue', value: '#1976d2' },
        { nae: 'green', value: '#2e7d32' },
        { name: 'orange', value: '#e65100' },
        { name: 'gray', value: '#37474f' },
        { name: 'pink', value: '#d81b60' }
    ];

    function setUserColor(user) {
        user.profileColor = getColorFromString(user.email);
    }

    function getColorFromString(str) {
        let num = getLettersNumber(str, true);
        if (num < userColors.length) num = userColors.length;
        let index = num % userColors.length;
        return userColors[index];
    }

    function setUserInitials(user) {
        user.initials = getInitials(user.displayName);
    }

    function getInitials(name) {
        var initials = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
        let result = initials;

        return (initials.join('').toUpperCase()).substr(0, 2);
    }
    function getLettersNumber(text, add = true) {
        var str = "";
        var added = 0;
        for (var i = 0; i < text.length; i++) {
            var code = text.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) {
                str += (code - 64) + " ";
                added += (code - 64);
            }
        }
        return add ? added : str.slice(0, str.length - 1);
    }

    _this.setup = function () {
        _this.watchAuth();
    }
    this.setup();


}


