window.tscLib = window.tscLib||{};
window.tscLib['user_account'] = {};
window.tscLib['user_account'].preparePluginConfig = function (user) {
    let httpClient = new HttpClient();
    httpClient.get("#{{__login_base_url__}}#config/"+project_id+"/?use_sandbox=true", false)
    .then(function(settings){
       continueToInit(settings);
    }).catch(function(err){
       continueToInit();
    });
     function continueToInit(settings) {
      settings = settings || {};
      settings.config = settings.config || {};
      settings.config.namespace =  'user_account';
      settings.options = settings.options || {};
      settings.config.locked_uris = settings.config.locked_uris || ['', '/plugins/user-account/', '/plugins/form-wizard/'];
      settings.config.firebase = settings.config.firebase || {};
      settings.options.container_selector = settings.options.container_selector || '#user-account-div.user-account-div';

      window.tscLib['user_account'].initializePlugin(settings);         
     }
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
  Loader.presentFullScreen({identifier:'user-service-loader', text:'Loading...'});  
  window.tscLib['user_account'].preparePluginConfig();
});

