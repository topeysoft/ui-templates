let namespace =  'getting-started-wiz';
window.tscLib = window.tscLib||{};
window.tscLib[namespace] = {};
window.tscLib[namespace].preparePluginConfig = function (user) {
    let httpClient = new HttpClient();
    httpClient.get(api_base_url+"plugins/getting_started/config/?use_sandbox=true")
    .then(function(settings){
       continueToInit(settings);
    }).catch(function(err){
       continueToInit();
    });
     function continueToInit(settings) {
        settings = settings || {};
        settings.config = settings.config || {};
        settings.options = settings.options || {};
        settings.config.namespace = 'getting-started-wiz';
        settings.options.container_selector = settings.options.container_selector || '#form-wizard.form-wizard';

        tscLib[settings.config.namespace].initializePlugin(settings);
         
     }
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
          const formWizard = new GettingStartedWizard(settings, uiManager);
        window.tscLib[config.namespace].gettingStartedWizard = formWizard;
          window.tscLib[config.namespace].tscBraintreeClient = new TscBraintreeClient(settings, formWizard, uiManager);
            Loader.hide('tsc:getting-started-loader');
    
      });
      
}

$(document).ready(function(){
    Loader.presentFullScreen({identifier:'tsc:getting-started-loader', text:'Preparing the good stuff...'});
    $(document).on('tsc:user_service:logged-in', function(event, user){
        window.tscLib[namespace].preparePluginConfig(user);
    });
    $(document).on('tsc:user_service:not-logged-in', function(event){
        window.tscLib.userService.redirectToLogin();
    });
});
