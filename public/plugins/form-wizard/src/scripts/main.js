let namespace =  'getting-started-wiz';
window.tscLib = window.tscLib||{};
window.tscLib[namespace] = {};
window.tscLib[namespace].preparePluginConfig = function (user) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var settings = {};
        try {
            settings = JSON.parse(xhr.responseText);
        } catch (err) { 
            console.log('Getting started config error', err)
        }
        settings = settings || {};
        settings.config = settings.config || {};
        settings.options = settings.options || {};
        settings.config.namespace = 'getting-started-wiz';
        settings.options.container_selector = settings.options.container_selector || '#form-wizard.form-wizard';

        tscLib[settings.config.namespace].initializePlugin(settings);
      }
    };
    window.tscLib.userService.getToken()
    .then(function(token){
       xhr.open(
         "GET",
         "https://api.elyir.local:8443/cms-api/projects/59062e028631a043f468fc73/plugins/form_wizard/config/?use_sandbox=true",
         true
       );
        xhr.setRequestHeader('Authorization', 'Bearer '+token);
    xhr.send(null);
}).catch(err=>{
  console.log('Invalid user', err);  
});
  }


  window.tscLib[namespace].initializePlugin = function (settings){
    window.tscLib = window.tscLib||{};
    settings = settings || {};
    const config = settings.config || {};
    const options = settings.options || {};
    window.tscLib[config.namespace] = window.tscLib[config.namespace]||{};
    if(tscLib[config.namespace].initialized){
        return;
      }
      tscLib[config.namespace].initialized = true;
      const  uiManager = new UiManager(settings);
      window.tscLib[config.namespace].uiManager = uiManager;
      uiManager.prepareTemplates( function(){
          const formWizard = new GettingStartedWizard(settings);
        window.tscLib[namespace].gettingStartedWizard = formWizard;
          window.tscLib[config.namespace].tscBraintreeClient = new TscBraintreeClient(settings, formWizard);
      });
      
}

$(document).ready(function(){
    $(document).on('tsc:user_service:ready', function(event, user){
        window.tscLib[namespace].preparePluginConfig(user);
    });
});
