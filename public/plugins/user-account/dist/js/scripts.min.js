window.tscLib = window.tscLib || {}; window.tscLib['user-account']=window.tscLib['user-account'] || {}; window.tscLib['user-account'].templates = {"forms/sign-in.html":"<form id=\"sign-in\" style=\"display:none;\"  action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Sign In</h3>\n    </div>\n    <p>We just need some information so we can get you started</p>\n    <br />\n    <!-- Form log in -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"email\" id=\"defaultForm-email\" class=\"form-control email-input\">\n      <label data-error=\"invalid email\" for=\"defaultForm-email\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"defaultForm-pass\" class=\"form-control password-input\">\n      <label data-error=\"Invalid password\" for=\"defaultForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-default btn-lg\">Sign in</button>\n    </div>\n    <br />\n    <p>\n      If you don't have an account yet <a class=\"user-account-div__sign-up-link\" href=\"#\">get started here</a>\n    </p>\n    <p>\n      Other options:\n      <br />\n      <div class=\"providers-div\">\n\n       \n      </div>\n    </p>\n    <!-- <div id=\"firebaseui-auth-container\"></div>\n    <div id=\"sign-in-status\"></div>\n    <div id=\"sign-in\"></div>\n    <div id=\"account-details\"></div> -->\n    <!-- Form log in -->\n  </form>","forms/sign-up.html":"<form id=\"sign-up\"  style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Get Started</h3>\n    </div>\n    <p>Let's get to know each other.</p>\n    <br />\n    <!-- Form register -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-user prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-name\" class=\"form-control  name-input\">\n      <label for=\"orangeForm-name\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your name</label>\n    </div>\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-email\" class=\"form-control email-input\">\n      <label for=\"orangeForm-email\"><i class=\"fa fa-envelope\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"orangeForm-pass\" class=\"form-control password-input\">\n      <label for=\"orangeForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-primary btn-lg\">Continue</button>\n    </div>\n    <br />\n    <p>\n      If you already have an account with us <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in</a>\n    </p>\n    <!-- Form register -->\n<p>Other options</p>\n    <div class=\"providers-div\">\n      \n                       \n                      </div>\n  </form>","forms/signed-out.html":"<form id=\"signed-out\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h1 class=\"font-weight-normal thin\"> See you again soon</h1>\n      <p class=\"lead\"></p>\n      <p>\n        <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in again</a>\n      </p>\n\n\n    </div>\n\n    <!-- Form log in -->\n  </form>","forms/user-info.html":"<form id=\"user-info\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p>Your are logged in as:</p>\n      <h1 id=\"user-name\" class=\"font-weight-normal thin\"> {{displayName}}</h1>\n      <p id=\"user-email\" class=\"lead\">{{email}}</p>\n      <p>\n        Not you? <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in as a different user</a>\n      </p>\n      <div>\n        <a href=\"/plugins/form-wizard\" class=\"btn btn-sm btn-primary\">Continue</a>\n      </div>\n    </div>\n\n    <!-- Form log in -->\n  </form>"};
// initApp = function() {
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var uid = user.uid;
//         var phoneNumber = user.phoneNumber;
//         var providerData = user.providerData;
//         user.getIdToken().then(function(accessToken) {
//           document.getElementById('sign-in-status').textContent = 'Signed in';
//           document.getElementById('sign-in').textContent = 'Sign out';
//           document.getElementById('account-details').textContent = JSON.stringify({
//             displayName: displayName,
//             email: email,
//             emailVerified: emailVerified,
//             phoneNumber: phoneNumber,
//             photoURL: photoURL,
//             uid: uid,
//             accessToken: accessToken,
//             providerData: providerData
//           }, null, '  ');
//         });
//       } else {
//         // User is signed out.
//         document.getElementById('sign-in-status').textContent = 'Signed out';
//         document.getElementById('sign-in').textContent = 'Sign in';
//         document.getElementById('account-details').textContent = 'null';
//       }
//     }, function(error) {
//       console.log(error);
//     });
//   };

//   window.addEventListener('load', function() {
//     initApp()
//   });
// var uiConfig = {
//     signInSuccessUrl: '<url-to-redirect-to-on-success>',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       firebase.auth.PhoneAuthProvider.PROVIDER_ID
//     ],
//     // Terms of service url.
//     tosUrl: '<your-tos-url>'
//   };

//   // Initialize the FirebaseUI Widget using Firebase.
//   var ui = new firebaseui.auth.AuthUI(firebase.auth());
//   // The start method will wait until the DOM is loaded.
//   ui.start('#firebaseui-auth-container', uiConfig);
function preparePluginConfig() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var config = xhr.responseText;
        initializePlugin(config);
      }
    };
    xhr.open(
      "GET",
      "https://cms.api.elyir.local:8443/projects/59062e028631a043f468fc73/plugins/59062e028631a043f468fc73/config/?use_sandbox=true",
      true
    );
    xhr.send(null);
  }

  function initializePlugin(config){
     config = {
        apiKey: "AIzaSyDbMpLUdyhNsfPNPcaXv-csyQb8DVAqR-I",
        authDomain: "cms-admin-8e3fb.firebaseapp.com",
        // databaseURL: "https://cms-admin-8e3fb.firebaseio.com",
        projectId: "cms-admin-8e3fb",
        storageBucket: "cms-admin-8e3fb.appspot.com",
        messagingSenderId: "721305448570"
      };
      firebase.initializeApp(config);

    function switchToForm(formId) {
      var pluginDiv = $('.user-account-div');
      pluginDiv.find('form').hide();
      pluginDiv.find('form#'+formId).show();
      event.preventDefault();
      // console.log(pluginDiv);
    }
    const userService = new UserService;
    const userFormService = new UserFormService;

    window.tscLib = window.tscLib||{};
    window.tscLib.userService = userService;
    window.tscLib.userFormService = userFormService;

    $('body').on('click', '.user-account-div__sign-in-link', function(event){
        event.preventDefault();
        switchToForm('sign-in');
    });
    $('body').on('click', '.user-account-div__sign-up-link', function(event){
        event.preventDefault();
        switchToForm('sign-up');
    });
    $('body').on('submit','.user-account-div #sign-up', function(event){
        const inputs = $(this).find('input');
        event.preventDefault();
        if(allValid(inputs)){
            const email = $(this).find('input.email-input').val();
            const password = $(this).find('input.password-input').val();
            const displayName = $(this).find('input.name-input').val();
            userService.signUp(email, password, displayName);
        }
    });
    $('body').on('submit','.user-account-div #sign-in', function(event){
        const inputs = $(this).find('input');
        event.preventDefault();
        if(allValid(inputs)){
            const email = $(this).find('input.email-input').val();
            const password = $(this).find('input.password-input').val();
            userService.signIn(email, password);
        }
    });
    $('body').on('input','.user-account-div #sign-in input', function(event){
        $(this).removeClass('invalid');
    });
    
    function allValid(inputArray) {
       var allIsValid = true;
       $.each(inputArray, function(index, input) {
           const validateFn = userService.validate[$(input).attr('type')] || function(){return true};
            if(validateFn($(input).val())){
                console.log('VALID ', $(input).val())
            }else{
                allIsValid =false;
                $(input).addClass('invalid').next().addClass('active').focus();
            }
       }) 
       return allIsValid;
    }

    ( function renderProvidersUI(){
        let arr = tscLib.userService.options.providers;
        var parent =$('.user-account-div').find('.providers-div').html('').addClass('row');
        $.each(arr, function(i, provider){
            const button = $(provider.uiButton);
            button.on('click', function(event){
                event.preventDefault();
                tscLib.userService.thirdPartySignIn(button.data('provider'));
            })
            const btnSpan = $('<div class="col-12 col-md-6 mt-3 p-0" ></div>').append(button);
            console.log(btnSpan);
            parent.append(btnSpan);
        });
    })();
  }

  $(document).ready(function(){
     // Initialize Firebase
     preparePluginConfig();


    
});

   
function UserFormService(options={formsParent:'.user-account-div'}){
    const _this = this;
    const htmlFormContents = "";
    const formTemplates ={};
    _this.showForm = function(formId, data){
        var pluginDiv = $(options.formsParent);
        pluginDiv.find('form').hide();
        var form = pluginDiv.find('form#'+formId);
        form.show();
        if(data){
            _this.renderContentData(form, data);
        }
    }
    _this.renderContentData = function(form, data){
        re = /{{([^}]*)}}/g
        var html = formTemplates[form[0].id];
        if(!html){
           html = form.html();
           formTemplates[form[0].id] = html;
        }
        console.log(form, formTemplates);
        var arr = html.match(re);
        $.each(arr, function(i, e){
            properyName = $.trim(e.replace('{{','').replace('}}',''));
            var prop = data[properyName] ||'';
            html = html.replace(e, prop);
        });
        form.html(html);
    }
    
    
    _this.setup = function(){
        var pluginDiv = $(options.formsParent);
         pluginDiv.html('');  
        $.each(tscLib['user-account'].templates, function(key, template){
            pluginDiv.append($(template).hide());
        })
    }
    this.setup();
}

function UserService() {
    const _this = this;

    function postSignIn() {
        const user = _this.getUserInfo();
        if (user) {
            tscLib.userFormService.showForm('user-info', user);
        }
    }
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
    _this.signOut = function () { }
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
        var user = firebase.auth().currentUser;
        if (user) {
            return true;
        }
        else {
            return false;
        }
    }


    _this.watchAuth = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                postSignIn();

                //   var displayName = user.displayName;
                //   var email = user.email;
                //   var emailVerified = user.emailVerified;
                //   var photoURL = user.photoURL;
                //   var isAnonymous = user.isAnonymous;
                //   var uid = user.uid;
                //   var providerData = user.providerData;
                // ...
            } else {
                tscLib.userFormService.showForm('signed-out');

                // User is signed out.
                // ...
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
                uiButton: $('<button class="btn\
                                firebaseui-idp-google firebaseui-id-idp-button" data-provider-id="google.com" data-upgraded=",MaterialButton">\
                                <span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">\
                                </span><span class="firebaseui-idp-text firebaseui-idp-text-long">Continue with Google</span>\
                                <span class="firebaseui-idp-text firebaseui-idp-text-short">Google</span></button>').data('provider', new firebase.auth.GoogleAuthProvider())
                ,
                uiIcon: '<span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span>',
            },
            {
                name: "Google",
                uiButton: $('<button class="btn firebaseui-idp-facebook firebaseui-id-idp-button">\
                <span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" \
                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"></span><span class="firebaseui-idp-text \
                 firebaseui-idp-text-long">Continue with Facebook</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Facebook</span></button>')
                    .data('provider', new firebase.auth.FacebookAuthProvider())
                ,
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
    _this.setup = function () {
        _this.watchAuth();
    }
    this.setup();
}


