function UiManager(settings) {
    let _this = this;
    const config = settings.config || {};
    const options = settings.options || {};

    _this.existingCustomer = null;
    _this.uiElements = {};
    _this.pluginUI = $(options.container_selector);
    _this.setExistingCustomer = function (customer) {
        _this.existingCustomer = customer;
        _this.pluginUI.find()
    }
    _this.prepareTemplates = function (cb) {
        // _this.pluginUI.html('');
        let stepTemplates = [];
        let stepWrapperTemplate = [];
        let stepIndicatorWraperTemplate = [];
        $.each(tscLib['form-wizard'].templates, function (index, template) {
            if (template.path === 'steps/') {
                stepTemplates.push(template);
            }
            if (template.full_path === 'step-indicator.html') {
                stepIndicatorWraperTemplate = template;
            }
            if (template.full_path === 'step-wrapper.html') {
                stepWrapperTemplate = template;
            }
        });
        let baseHtml = stepIndicatorWraperTemplate.content
            + stepWrapperTemplate.content;
        _this.pluginUI.html(baseHtml);
        _this.uiElements.stepContentWrapper = _this.pluginUI.find('.wizard-step-content-wrapper');
        let stepHtml = '';
        $.each(stepTemplates, function (i, template) {
            stepHtml += template.content;
        });
        let userInfo = window.tscLib.userService.getUserInfo();
        _this.uiElements.stepContentWrapper.html(parseContentData(stepHtml, userInfo));
        cb();
    }

    _this.getInfoSummaryHtml = function (info) {
        let response = '';
        let question = '';
        info.options = info.options || {};
        if(info.type === 'checkbox'){
            response = (info.checked) ? info.true_value : info.false_value;
            question = info.question;
            }else if(info.type === 'select' ||  info.type==='radio'){
                let value = info.options[info.value] || {};
                response = value.response || info.default || '';  
            question = info.question;
            } else{
                response = info.value;
                question = info.label;                
            }
       return '<div class="mt-4 text-left">\
                <p class="font-weight-normal">' + question + ' <br/>\
                <span class="lead font-weight-normal">' + response+ '</span></p>\
                                    </div>';
    }
    _this.getPlanSummaryHtml = function (selectedPlan) {
        var summary = $('#form-wizard .selected-plan-summary');
        summary.html('\
            <p class="font-weight-normal">You selected <span class="font-weight-bold text-' + selectedPlan.text_color_class + '">' + selectedPlan.name + ' plan</span>. <br/> You will be charged a one-time *refundable fee of \
            <span class="font-weight-bold text-' + selectedPlan.text_color_class + '">$' + selectedPlan.setup_fee + '</span></p>\
            <br />\n\
            <p class=" font-weight-normal" >Your monthly payment will be <span class="font-weight-bold text-' + selectedPlan.text_color_class + '">$' + selectedPlan.price_per_month + '</span>/month starting from the date your website goes live.</h4>\
            <p>* Setup fee refund is subject to terms and condition. <a href="#">Please see details here</a>  </p>\
        ');
        var totalSummary = $('#form-wizard .total-payment-summary');
        var dueToday = (+selectedPlan.setup_fee) + (+selectedPlan.price_per_month);
        totalSummary.html('\
            <hr class="border" />\
            <div class="row  ">\
                <p class="h4  font-weight-normal col-6 text-md-right">Due monthly: <br />\
                <p class="h4  font-weight-normal col-6 ">$' + selectedPlan.price_per_month + '</p> \
            </div>\
            <hr class="border" />\
            <div class="row ">\
                <p class="h4  font-weight-bold col-6 text-md-right">Due today: </p> \
                <p class="h4  font-weight-bold col-6">$' + (dueToday) + '</p> \
            </div>\
            <hr class="border" />\
            ');
    }

    _this.populateInfoInputs = function (_GSW) {
        const basicInfo = _GSW.getBasicInfo();
        const infoInputDiv = $(settings.options.container_selector + ' #info-inputs');
        const infoTitle = $(settings.options.container_selector + ' #basic-info-title');
        let whatWeHave = 'Here is what we know so far.';
        let tellUs = 'Tell us about your business';
        infoTitle.html(_GSW.getExistingCustomer() ? whatWeHave : tellUs);
        var inputs = '';
        infoInputDiv.html('');
        $.each(basicInfo, function (i, info) {

            createInfoInput(info, i, infoTitle, whatWeHave, infoInputDiv);

        });
        // infoInputDiv.html(inputs);
        function handleChange(event) {
            var info = basicInfo[$(this).data('index')];
            if (!info) {
                return;
            }
            info.value = $(this).val();
            if (info.type === 'checkbox') {
                info.checked = $(this).prop('checked');
            }
            $(this).removeClass('invalid');
        }

        // $('body #form-wizard #info-inputs .basic-info-input').each(function(i, elem){
        //    if(elem.data('format') && elem.data('separator')){
        //     MaskedInput({
        //         elm: elem[0],
        //         format: elem.data('format'),
        //         separator: elem.data('separator')
        //      }); 
        //    } 
        // });
        
        $('body').on('change', '#form-wizard #info-inputs .basic-info-input', handleChange);
        $('body').on('input', '#form-wizard #info-inputs .basic-info-input', handleChange);
        $('body').on('click', '#form-wizard .page-item.wizard-step.passed a', function (event) {
            console.log($(this).index())
        });
    }

    function setup() {
    }
    function createInfoInput(info, i, infoTitle, whatWeHave, infoInputDiv) {
        let input = '';
        if (info.type === 'checkbox') {
            input = $('<div class="mt-4">\
                                <p class="form-group text-left">\
                                        <input data-index="' + i + '" ' + (info.checked ? 'checked=checked' : '') + ' \
                                        ' + (info.required ? 'required=required' : '') + ' type="' + info.type + '" id="info-input_' + i + '" value="' + info.value + '" \
                                            class="form-control   basic-info-input">\
                                        <label for="info-input_' + i + '"data-error="' + info.invalid_message + '" data-success="' + info.valid_message + '" class="' + (info.value && $.trim(info.value).length > 0 ? 'active' : '') + '">' + info.label + '</label>\
                                    </p>\
                                    </div>');
            edit = $('<a href="#" class="btn-sm">Edit</a>').on('click', function (event) {
                event.preventDefault();
                display.hide();
                input.show();
            });
        } else if (info.type === 'radio') {
            input = $('<div class="mt-4">\
                                    <p class="form-group text-left">\
                                    <label for="info-input_' + i + '" data-error="' + info.invalid_message + '" data-success="' + info.valid_message + '" class="' + (info.value && $.trim(info.value).length > 0 ? 'active' : '') + '">' + info.label + '</label>\
                                         <div class="input-row">\
                                         </div>\
                                        </p>\
                                        </div>');
            $.each(info.options, function(key, option){
                let optionInput = '<div  class="form-check form-check-inline">\
                <label for="'+info.id+'_'+i+'_'+key+'">\
                <input name="info-input_' + i + '" data-index="' + i + '" ' + (key===info.value ? 'checked=checked' : '') + ' \
                ' + (info.required ? 'required=required' : '') + ' type="' + info.type + '" id="'+info.id+'_'+i+'_'+key+'" value="' + key + '" \
                    class="' + (info.type === 'checkbox' ? '' : 'form-control  validate') + ' basic-info-input">\
                    '+option.label+'</label>\
                </div>';
                input.find('.input-row').append(optionInput)
            });
        } else if (info.type === 'select') {
            let optionItems = ''
            $.each(info.options, function(key, option){
                 optionItems += '<option value="'+key+'" '+(key===info.value?'selected="selected"':'')+'>'+option.label+'</option>';
            });
            let select ='<select  data-index="' + i + '"   class="  basic-info-input custom-select">'+optionItems+'</select>';
            input = $('<div class="mt-4">\
                                    <p class="form-group text-left">\
                                    <label for="info-input_' + i + '" data-error="' + info.invalid_message + '" data-success="' + info.valid_message + '" class="' + (info.value && $.trim(info.value).length > 0 ? 'active' : '') + '">' + info.label + '</label>\
                                         '+select+'</p>\
                                        </div>');
        } else {
            input = $('<div class="mt-4">\
                                    <p class="md-form">\
                                            <input data-index="' + i + '"  \
                                            ' + (info.required ? 'required=required' : '') + ' type="' + info.type + '" id="info-input_' + i + '" value="' + info.value + '" \
                                                class="form-control  validate basic-info-input">\
                                            <label for="info-input_' + i + '"data-error="' + info.invalid_message + '" data-success="' + info.valid_message + '" class="' + (info.value && $.trim(info.value).length > 0 ? 'active' : '') + '">' + info.label + '</label>\
                                        </p>\
                                        </div>');
        }
        let display = $(_this.getInfoSummaryHtml(info));
        let edit = $('<a href="#" class="btn-sm">Edit</a>').on('click', function (event) {
            event.preventDefault();
            display.hide();
            input.show();
        });
        display.find('p').append(edit);
        if (info.value) {
            display.show();
            input.hide();
            infoTitle.html(whatWeHave);
        }
        else {
            display.hide();
            input.show();
        }
        infoInputDiv.append(input).append(display);
    }

    setup();

}