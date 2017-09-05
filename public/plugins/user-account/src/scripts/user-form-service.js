function UserFormService(options={formsParent:'.user-account-div'}){
    const _this = this;
    const htmlFormContents = "";
    const formTemplates ={};
    _this.showForm = function(formId, data){
        var pluginDiv = $(options.formsParent);
        pluginDiv.find('form').hide();
        var form = pluginDiv.find('form#'+formId);
        form.show();
        if(data){
            _this.renderContentData(form, data);
        }
    }
    _this.renderContentData = function(form, data){
        re = /{{([^}]*)}}/g
        var html = formTemplates[form[0].id];
        if(!html){
           html = form.html();
           formTemplates[form[0].id] = html;
        }
        console.log(form, formTemplates);
        var arr = html.match(re);
        $.each(arr, function(i, e){
            properyName = $.trim(e.replace('{{','').replace('}}',''));
            var prop = data[properyName] ||'';
            html = html.replace(e, prop);
        });
        form.html(html);
    }
    
    
    _this.setup = function(){
        var pluginDiv = $(options.formsParent);
         pluginDiv.html('');  
        $.each(tscLib['user-account'].templates, function(key, template){
            pluginDiv.append($(template).hide());
        })
    }
    this.setup();
}
