window.tscLib = window.tscLib || {}; window.tscLib['main']=window.tscLib['main'] || {}; window.tscLib['main'].templates = [];
var api_base_url = 'https://api.elyir.com/cms-api/projects/' + project_id;
function HttpClient(useAuthorization = true) {
    var _this = this;
    function callBackend(payload, callWithAuth = useAuthorization) {
        if (!payload) {
            return;
        }

        return new Promise(function (resolve, reject) {
            if (callWithAuth) {
                window.tscLib.userService.getToken().then(function (token) {
                    makeCall(token);
                }).catch(err => {
                    console.log('Invalid user', err);
                    reject(err)
                });
            } else {
                makeCall();
            }
            function makeCall(token) {
                if (token) {
                    payload.headers = payload.headers || {};
                    payload.headers['Authorization'] = 'Bearer ' + token;
                }
                $.ajax(payload).done(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err.responseText);
                });
            }
        });
    }
    _this.get = function (url, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'GET'
        }
        return callBackend(payload, useAuth);
    }
    _this.post = function (url, data, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'POST',
            data: data
        }
        return callBackend(payload, useAuth);

    }
    _this.put = function (url, data, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'PUT',
            data: data
        }
        return callBackend(payload, useAuth);
    }
    _this.patch = function (url, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'PATCH',
            data: data
        }
        return callBackend(payload, useAuth);
    }
    _this.delete = function (url, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'DELETE'
        }
        return callBackend(payload, useAuth);
    }
    _this.options = function (url, useAuth=false) {
        let payload = {
            url: url,
            method: 'OPTIONS'
        }
        return callBackend(payload, useAuth);
    }

}

function Loader() {};

Loader.present = function(options){
    options = options || {};
    let args = {bock_interaction:true, text:'Loading...', identifier:'main-loader', translucent:false, type:'inline', auto_exit:false, parent:'body'};
     $.extend(args, options);
     let loader = $(parent).find('#loader-div');
     if(loader.length<1){
        loader = $(`<div id="loader-div" class="">
        <div class="wrapper d-inlne align-middle text-center">
            <img src="https://s3-us-west-2.amazonaws.com/tscdms/shared/loaders/earth-64.png" /><br />
            <div id="loader-text" class="loader-text"></div>
        </div>
        </div>`).appendTo(args.parent);
     }
     loader.find('#loader-text').html(args.text);
     loader.addClass(args.identifier);

     loader.attr('data-id', args.identifier);
     loader.attr('data-type', args.type);
     if(args.translucent){
         loader.removeClass('translucent');
     }else{
        loader.addClass('translucent');
    }
    loader.show();
         if(args.auto_exit && typeof auto_exit === 'number'){
             setTimeout(function() {
                 loader.hide();
             }, args.auto_exit);
        }

     return loader;
}
Loader.presentInline = function(options){
    options = options || {};
    let args = {bock_interaction:false, type:'inline'};
     $.extend(args, options);
     return Loader.present(args);
}
Loader.presentFullScreen = function(options){
    options = options || {};
    let args = {bock_interaction:false, type:'full-screen'};
     $.extend(args, options);
     return Loader.present(args);
}
Loader.presentCover = function(options){
    options = options || {};
    let args = {bock_interaction:false, type:'cover'};
     $.extend(args, options);
     return Loader.present(args);
}
Loader.hideAll = function(){
    $('#loader-div').hide();
}
Loader.hide = function(instance='main-loader'){
    $('#loader-div[data-id="'+instance+'"]').hide();
}

var viewport = {xs:true, sm:true, md:true, lg:true, xl:true};
function setViewport(){
  let div = $('#viewport-div')
  if(div.length<1){
    div = $(`<div id="viewport-div">
    <i id="viewport-xs" class="d-block d-sm-none"></i>
    <i id="viewport-sm" class="d-none d-sm-block d-md-none"></i>
    <i id="viewport-md"  class="d-none d-md-block d-lg-none"></i>
    <i id="viewport-lg"  class="d-none d-lg-block d-xl-none"></i>
    <i id="viewport-xl" class="d-none d-xl-block"></i>
    </div>`)
    $('body').append(div);
  }
  $.each(viewport, function (size, value){
    viewport[size] = $('#viewport-'+size).is(":visible");
    if(viewport[size]){
      $('body').attr('data-viewport', size)
    }
  });
   console.log('viewport', viewport);
}
(function($) {
  setViewport();
  $.extend({
    stickToBottom: function(args) {
      let options = {css_class:'fixed', scrollSelector:'body'};
      $.extend(options, args);
      $(document.body).on("scroll", function() {
        try {
          var scrollElem = $(options.scrollSelector);
          var stickyElem = $(options.stickySelector);
          var offset = -stickyElem.innerHeight();
          // if(!stickyElem.data('position')){
          //   stickyElem.data('position', stickyElem.css('position'));
          // }
          // if(!stickyElem.data('bottom')){
          //   stickyElem.data('bottom', stickyElem.css('bottom'));
          // }
          if (
            scrollElem.offset().top + scrollElem.outerHeight() <=
            window.scrollY + $(window).innerHeight() + offset
          ) {
            stickyElem
            // .css('position', stickyElem.data('position'))
            // .css('bottom', stickyElem.data('bottom'))
            .removeClass(options.css_class)
            .removeClass("fixed-bottom");
          } else {
            stickyElem
            // .css('position', 'fixed')
            // .css('bottom', '0')
            .addClass(options.css_class)
            .addClass("fixed-bottom");
          }
        } catch (err) {
          console.log(err)
        }
      });
    }
  });

  $.stickToBottom({
    scrollSelector: "#form-wizard #fix-break-point",
    stickySelector: "#form-wizard .wizard-footer",
    css_class:'z-depth-2'
  });



  $('body').on('click', '.main-menu-toggle', function(event){
    $('body').toggleClass('show-menu');
  });

$(window).on('resize', function(event){
  setViewport();
})

    // if(window.tscLib.plugins){
    //   $.each(window.tscLib.plugins, (function(i, plugin){
    //      if(!plugin.initialized){
    //         plugin.initialize();
    //         plugin.initialized =true;
    //      };
    //   }))
    // }
})(jQuery);

// // masked_input_1.4-min.js
// // angelwatt.com/coding/masked_input.php
// (function(a){a.MaskedInput=function(f){if(!f||!f.elm||!f.format){return null}if(!(this instanceof a.MaskedInput)){return new a.MaskedInput(f)}var o=this,d=f.elm,s=f.format,i=f.allowed||"0123456789",h=f.allowedfx||function(){return true},p=f.separator||"/:-",n=f.typeon||"_YMDhms",c=f.onbadkey||function(){},q=f.onfilled||function(){},w=f.badkeywait||0,A=f.hasOwnProperty("preserve")?!!f.preserve:true,l=true,y=false,t=s,j=(function(){if(window.addEventListener){return function(E,C,D,B){E.addEventListener(C,D,(B===undefined)?false:B)}}if(window.attachEvent){return function(D,B,C){D.attachEvent("on"+B,C)}}return function(D,B,C){D["on"+B]=C}}()),u=function(){for(var B=d.value.length-1;B>=0;B--){for(var D=0,C=n.length;D<C;D++){if(d.value[B]===n[D]){return false}}}return true},x=function(C){try{C.focus();if(C.selectionStart>=0){return C.selectionStart}if(document.selection){var B=document.selection.createRange();return -B.moveStart("character",-C.value.length)}return -1}catch(D){return -1}},b=function(C,E){try{if(C.selectionStart){C.focus();C.setSelectionRange(E,E)}else{if(C.createTextRange){var B=C.createTextRange();B.move("character",E);B.select()}}}catch(D){return false}return true},m=function(D){D=D||window.event;var C="",E=D.which,B=D.type;if(E===undefined||E===null){E=D.keyCode}if(E===undefined||E===null){return""}switch(E){case 8:C="bksp";break;case 46:C=(B==="keydown")?"del":".";break;case 16:C="shift";break;case 0:case 9:case 13:C="etc";break;case 37:case 38:case 39:case 40:C=(!D.shiftKey&&(D.charCode!==39&&D.charCode!==undefined))?"etc":String.fromCharCode(E);break;default:C=String.fromCharCode(E);break}return C},v=function(B,C){if(B.preventDefault){B.preventDefault()}B.returnValue=C||false},k=function(B){var D=x(d),F=d.value,E="",C=true;switch(C){case (i.indexOf(B)!==-1):D=D+1;if(D>s.length){return false}while(p.indexOf(F.charAt(D-1))!==-1&&D<=s.length){D=D+1}if(!h(B,D)){c(B);return false}E=F.substr(0,D-1)+B+F.substr(D);if(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1){D=D+1}break;case (B==="bksp"):D=D-1;if(D<0){return false}while(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1&&D>1){D=D-1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);break;case (B==="del"):if(D>=F.length){return false}while(p.indexOf(F.charAt(D))!==-1&&F.charAt(D)!==""){D=D+1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);D=D+1;break;case (B==="etc"):return true;default:return false}d.value="";d.value=E;b(d,D);return false},g=function(B){if(i.indexOf(B)===-1&&B!=="bksp"&&B!=="del"&&B!=="etc"){var C=x(d);y=true;c(B);setTimeout(function(){y=false;b(d,C)},w);return false}return true},z=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if((C.metaKey||C.ctrlKey)&&(B==="X"||B==="V")){v(C);return false}if(C.metaKey||C.ctrlKey){return true}if(d.value===""){d.value=s;b(d,0)}if(B==="bksp"||B==="del"){k(B);v(C);return false}return true},e=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if(B==="etc"||C.metaKey||C.ctrlKey||C.altKey){return true}if(B!=="bksp"&&B!=="del"&&B!=="shift"){if(!g(B)){v(C);return false}if(k(B)){if(u()){q()}v(C,true);return true}if(u()){q()}v(C);return false}return false},r=function(){if(!d.tagName||(d.tagName.toUpperCase()!=="INPUT"&&d.tagName.toUpperCase()!=="TEXTAREA")){return null}if(!A||d.value===""){d.value=s}j(d,"keydown",function(B){z(B)});j(d,"keypress",function(B){e(B)});j(d,"focus",function(){t=d.value});j(d,"blur",function(){if(d.value!==t&&d.onchange){d.onchange()}});return o};o.resetField=function(){d.value=s};o.setAllowed=function(B){i=B;o.resetField()};o.setFormat=function(B){s=B;o.resetField()};o.setSeparator=function(B){p=B;o.resetField()};o.setTypeon=function(B){n=B;o.resetField()};o.setEnabled=function(B){l=B};return r()}}(window));
function RestClient(entityBaseUrl, useAuthorization=true, use_sanbox=true) {
    var _this = this;
    var httpClient = new HttpClient(useAuthorization);
    var sandbox = use_sanbox?'?use_sandbox=true':'';
    _this.findById = function (id) {
        return httpClient.get(`${entityBaseUrl}/${id}${sandbox}`);
    }
    _this.find = function () {
        return httpClient.get(entityBaseUrl+sandbox);
    }
    _this.create = function (entity) {
        return httpClient.post(entityBaseUrl+sandbox, entity);
    }
    _this.update = function (id, entity) {
        return httpClient.put(`${entityBaseUrl}/${id}${sandbox}`, entity);
    }
    _this.merge = function (id, entity) {
        return httpClient.patch(`${entityBaseUrl}/${id}${sandbox}`, entity);
    }
    _this.delete = function (id) {
        return httpClient.delete(`${entityBaseUrl}/${id}${sandbox}`);
    }

    _this.upsert = function (id, entity) {
        return new Promise(function (resolve, reject) {
            _this.update(id, entity).then(resolve)
            .catch(function(err){
                _this.create(entity).then(resolve)
                .catch(reject);
            });
        });
    }
}
function parseContentData(htmlTemplateString, data) {
    re = /{{([^}]*)}}/g
    var html = htmlTemplateString;

    var arr = html.match(re);
    $.each(arr, function (i, e) {
        properyName = $.trim(e.replace('{{', '').replace('}}', ''));
        var prop = data[properyName] || '';
        html = html.replace(e, prop);
    });
    return html;
}

