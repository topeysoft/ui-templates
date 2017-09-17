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
