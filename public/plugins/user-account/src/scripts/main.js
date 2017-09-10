function preparePluginConfig() {
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
        settings.options = settings.options || {};
        // settings.config.user_account_uri =  settings.config.user_account_uri || '/plugins/user-account/';
        settings.config.locked_uris =  settings.config.locked_uris || ['', '/plugins/user-account/', '/plugins/form-wizard/'];
        settings.config.firebase = settings.config.firebase || {};
        settings.options.container_selector = settings.options.container_selector || '#user-account-div.user-account-div';

        initializePlugin(settings);
      }
    };
    xhr.open(
      "GET",
      "https://cms.api.elyir.local:8443/projects/59062e028631a043f468fc73/plugins/user_account/config/?use_sandbox=true",
      true
    );
    xhr.send(null);
  }

  function initializePlugin(settings){
    window.tscLib = window.tscLib||{};
    window.tscLib.user_account = window.tscLib.user_account||{};
    if(tscLib.user_account.initialized){
        return;
      }
      firebase.initializeApp(settings.config.firebase);
      tscLib.user_account.initialized = true;
    const containerSelector = settings.options.container_selector;
    function switchToForm(formId) {
      var pluginDiv = $(containerSelector);
      pluginDiv.find('form').hide();
      pluginDiv.find('form#'+formId).show();
      event.preventDefault();
    }
    
    const userService = new UserService(settings);
    const userFormService = new UserFormService(settings);

    window.tscLib.userService = userService;
    window.tscLib.userFormService = userFormService;
    if(window.requireUserLogin){
        userService.redirectIfNotLoggedIn();
    }
    userFormService.renderPluginUI();
    
    
   
  }

  $(document).ready(function(){
     // Initialize Firebase
     preparePluginConfig();


    
});

   