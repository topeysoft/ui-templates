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

  window.tscLib['user_account'].preparePluginConfig();

});

