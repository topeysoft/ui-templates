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


