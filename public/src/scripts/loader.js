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
