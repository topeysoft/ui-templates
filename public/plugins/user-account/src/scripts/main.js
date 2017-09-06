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

   