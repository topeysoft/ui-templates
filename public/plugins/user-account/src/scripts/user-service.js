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


