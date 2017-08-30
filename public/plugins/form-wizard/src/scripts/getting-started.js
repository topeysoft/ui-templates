(function ($) {
    getStarted();
    new GettingStartedWizard();
    
}( jQuery ));


function GettingStartedWizard (){
    _GSW = this;
    




    let selectedPlan = {};
    let isFinished = false;

    const basicInfo = [
        {
            label: 'Your company/ <span class="d-none d-md-inline">business</span> name',
            value: '',
            type: 'text',
            invalid_message: 'Please provide us with your business name',
            valid_message: 'Thanks, got it',
            required: true
        },
        {
            label: 'Your  <span class="d-none d-md-inline">registered</span> domain name  <span class="d-none d-md-inline">(optional)</span>',
            value: '',
            type: 'text',
            invalid_message: 'Please provide us with domain name',
            valid_message: 'Thanks, got it'
        },
        {
            label: 'Business category  <span class="d-none d-md-inline">(Ex. Non-profit)</span>',
            value: '',
            type: 'text',
            invalid_message: '',
            valid_message: 'Thanks, got it'
        },
        {
            label: 'Yes we have a business logo',
            question: 'Do you have a business logo?',
            true_value: 'Yes we have a business logo',
            false_value: 'No we do not have a business logo',
            value: true,
            checked: false,
            type: 'checkbox'
        }
    ];
    const steps_validity = [
        {
            name: 'Basic information',
            invalid_message: 'Please provide a valid business name',
            valid: false,
            isValid: function (index) {
                var inputs = wizardContents.eq(index).find('input[required]');
                var valid = true;
                inputs.each(function (i, el) {
                    if ($.trim($(el).val()).length < 1) {
                        $(el).addClass('invalid').next().addClass('active');
                        valid = false;
                    }
                });
                if (!valid && inputs && inputs[0]) {
                    inputs.eq(0).focus();
                }
                return valid;
            }
        },
        {
            name: 'Choose a plan',
            invalid_message: 'Please select a plan to continue',
            isValid: function (index) {
                return (selectedPlan && selectedPlan.name);
            }
        },
         {
            name: 'Review',
            invalid_message: 'Please review your entry before you proceed',
            valid: true,
            isValid: function (index) {
                return true;
            }
        },
        {
            name: 'Select payment method',
            invalid_message: 'Please setup a payment method',
            valid: false,
            isValid: function (index) {
                var inputs = wizardContents.eq(index).find('input[required]');
                var valid = true;
                inputs.each(function (i, el) {
                    if ($.trim($(el).val()).length < 1) {
                        $(el).addClass('invalid').next().addClass('active');
                        valid = false;
                    }
                });
                return valid;
            }
        },
       
        {
            name: 'Finish',
            invalid_message: '',
            valid: true,
            isValid: function (index) {
                return true;
            }
        }
    ];
    const plans = [
        {
            name: "Basic",
            price_per_month: 50,
            setup_fee: 30,
            text_color_class: 'green',
            btn_color_class: 'default',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda.",
            features: [{
                description: "Includes support and help and all that fun stuff",
                included: false
            }]
        },
        {
            name: "Advanced",
            price_per_month: 90,
            setup_fee: 50,
            text_color_class: 'purple',
            btn_color_class: 'purple',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda.",
            features: [{
                description: "Includes support and help and all that fun stuff",
                included: true
            }]
        },
        {
            name: "Premium",
            price_per_month: 150,
            setup_fee: 100,
            text_color_class: 'rose',
            btn_color_class: 'pink',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda.",
            features: [{
                description: "Includes support and help and all that fun stuff",
                included: true
            }]
        }
    ];

    
    var wizardContentWrapper = $('#form-wizard .wizard-step-content-wrapper');
    var wizardContents = $('#form-wizard .wizard-step-content');
    var wizardSteps = $('#form-wizard .wizard-steps .wizard-step');
    var wizardPassedSteps = $('#form-wizard  .wizard-steps .wizard-step.passed');
    var plainItems = $('#form-wizard .plan-item');
    var plainItemButton = $('#form-wizard .plan-item-button');
    var callBeforWizardNext = [];
    var callOnWizardNext = [];


    // wizardContents.hide();
    // showStepByIndex(0);
    // function showStepByIndex(index) {
    //     wizardContents.hide();
    //     wizardContents.eq(index).show();
    // }
    

    function setup() {
        // setupPaymentInfoValidation();
        callOnWizardNext.push(function () {
            var summary = $('#form-wizard .basic-info-summary');
            var summaryHtml = '';
            $.each(basicInfo, function (i, info) {
                summaryHtml += '<p class="font-weight-normal">' + (info.type === 'checkbox' ? info.question : info.label) + ' <br/>\
             <span class="font-italic font-weight-normal">' + (info.type === 'checkbox' ? (info.checked ? info.true_value : info.false_value) : info.value) + '</span></p>';
            });
            summary.html(summaryHtml);
        });
        callOnWizardNext.push(function () {
            var summary = $('#form-wizard .selected-plan-summary');
            summary.html('\
            <p class="font-weight-normal">You selected <span class="font-weight-bold text-'+ selectedPlan.text_color_class + '">' + selectedPlan.name + ' plan</span>. <br/> You will be charged a one-time *refundable fee of \
             <span class="font-weight-bold text-'+ selectedPlan.text_color_class + '">$' + selectedPlan.setup_fee + '</span></p>\
             <br />\n\
             <p class=" font-weight-normal" >Your monthly payment will be <span class="font-weight-bold text-'+ selectedPlan.text_color_class + '">$' + selectedPlan.price_per_month + '</span>/month starting from the date your website goes live.</h4>\
             <p>* Setup fee refund is subject to terms and condition. <a href="#">Please see details here</a>  </p>\
        ');
            var totalSummary = $('#form-wizard .total-payment-summary');
            var dueToday = (+selectedPlan.setup_fee) + (+selectedPlan.price_per_month);
            totalSummary.html('\
            <hr class="border" />\
            <div class="row  ">\
                <p class="h4  font-weight-normal col-6 text-md-right">Due monthly: <br />\
                <p class="h4  font-weight-normal col-6 ">$'+ selectedPlan.price_per_month + '</p> \
            </div>\
            <hr class="border" />\
            <div class="row ">\
                <p class="h4  font-weight-bold col-6 text-md-right">Due today: </p> \
                <p class="h4  font-weight-bold col-6">$'+ (dueToday) + '</p> \
            </div>\
            <hr class="border" />\
            ');
        });
        callOnWizardNext.push(function populateInfoInputs() {
            const infoInputDiv = $('#form-wizard #info-inputs');
            var inputs = '';
            $.each(basicInfo, function (i, info) {
                inputs += '<div class="mt-4">\
                                <p class="'+ (info.type === 'checkbox' ? 'form-group text-left' : 'md-form') + '">\
                                        <input data-index="'+ i + '" ' + (info.checked ? 'checked=checked' : '') + ' \
                                        '+ (info.required ? 'required=required' : '') + ' type="' + info.type + '" id="info-input_' + i + '" value="' + info.value + '" \
                                            class="'+ (info.type === 'checkbox' ? '' : 'form-control  validate') + ' basic-info-input">\
                                        <label for="info-input_'+ i + '"data-error="' + info.invalid_message + '" data-success="' + info.valid_message + '" class="' + (info.value && $.trim(info.value).length > 0 ? 'active' : '') + '">' + info.label + '</label>\
                                    </p>\
                                    </div>';

            });
            infoInputDiv.html(inputs);
            function handleChange(event) {
                var info = basicInfo[$(this).data('index')];
                if (!info) {
                    return;
                }
                info.value = $(this).val();
                if (info.type === 'checkbox') {
                    info.checked = $(this).prop('checked');
                }
            }
            $('body').on('change', '#form-wizard #info-inputs .basic-info-input', handleChange);
            $('body').on('input', '#form-wizard #info-inputs .basic-info-input', handleChange);
            $('body').on('click', '#form-wizard .page-item.wizard-step.passed a', function(event){
                console.log($(this).index())
            });
        });
    }
    function activateStepIndicatorByIndex(index) {
        wizardSteps.removeClass('active').removeClass('passed');
        wizardSteps.eq(index).addClass('active').prevAll().addClass('passed');
    }
    function reFocusActiveStep() {
        gotoToStepByIndex($('#form-wizard .wizard-step-content.active').index(), true);
    }
    function resetContinueText(index) {
        var btn = $('#form-wizard  .wiz-continue, #form-wizard  #wiz-continue');
        var text = $('#form-wizard  .wiz-continue .text, #form-wizard  #wiz-continue .text');
        if (index === wizardContents.length - 1) {
            return $('#form-wizard  .wizard-footer').hide();
        }
        if (index === wizardContents.length - 2) {
            text.text('Finish');
            btn.removeClass('btn-primary').addClass('btn-default');
        } else {
            text.text('Continue')
            btn.removeClass('btn-default').addClass('btn-primary');
        }
    }
    function gotoToStepByIndex(index) {
        var rect = wizardContentWrapper[0].getBoundingClientRect();
        var width = index * -(rect.width);
        wizardContents.removeClass('invisible').css('transform', 'translateX(' + width + 'px)');
        $(wizardContents).not(wizardContents.eq(index)).removeClass('active').addClass('invisible');
        wizardContents.eq(index).addClass('active');
        var childRect = wizardContents.get(index).getBoundingClientRect();
        wizardContentWrapper.css('height', childRect.height);
        scrollToSelector('#form-wizard');
        activateStepIndicatorByIndex(index);
        resetContinueText(index);
        $.each(callOnWizardNext, function (i, fn) {
            fn();
        });
    }

    function markFinished(isFinished) {
        isFinished = true;
    }
    function notifyInvalidStep(index) {
        toastr["error"](steps_validity[index].invalid_message);
    }

    function advanceStepByIndex(index) {
        var currIndex = index - 1;
        if (!steps_validity[currIndex].isValid(currIndex)) {
            return notifyInvalidStep(currIndex);
        }
        gotoToStepByIndex(index);
        if(index === wizardSteps.length-1){
            markFinished(true);
        }
    }
    function revertStepByIndex(index) {
        gotoToStepByIndex(index);
    }
    function wizardContinue() {
        var current = $('#form-wizard .wizard-step-content.active');
        var index = current.index();
        if (index < (wizardContents.length - 1)) {
            index += 1;
        }
        advanceStepByIndex(index);
    }
    function wizardBack() {
        var current = $('#form-wizard .wizard-step-content.active');
        var index = current.index();
        if (index > 0) {
            index -= 1;
        }
        revertStepByIndex(index);
    }
    $('body').on('click', '#form-wizard  #wiz-continue, #form-wizard  .wiz-continue', function (event) {
        wizardContinue();
    })
    $('body').on('click', '#form-wizard  #wiz-back, #form-wizard  .wiz-back', function (event) {
        wizardBack();
    });
    $(window).on('resize', function (event) {
        reFocusActiveStep();
    });
    function scrollToSelector(selector, duration = 200) {
        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, duration);
    }

    function selectPlan(index) {
        selectedPlan = plans[index];
        plainItems.removeClass('active');
        plainItems.eq(index).addClass('active');
        plainItemButton.each(function (i, b) {
            var btn = $(b);
            btn.addClass('btn-' + plans[btn.data('index')].btn_color_class)
                .prop('disabled', false)
                .text('Select this plan');
        });
        plainItemButton.eq(index).prop('disabled', true)
            .text('Selected');
            wizardContinue();
        // .removeClass('btn-' + selectedPlan.btn_color_class).addClass('btn-secondary');


    }
    function populatePlans() {
        var planGroup = $('#form-wizard #plan-group');
        var plansContent = '';
        $.each(plans, function (i, plan) {
            var features = '';
            $.each(plan.features, function (i, feat) {
                features += '<div class="row">\
                                                <div class="col-auto"> <i class="fa  '+ (feat.included ? 'fa-check-circle' : 'fa-times') + ' p-0 m-0"></i></div>\
                                                <div class="col text-left">\
                                                    '+ feat.description + '\
                                                </div>\
                                            </div>\
                                            <hr class="d-block d-md-none d-xl-block"/>'; 
                if (feat.included) {

                }
            });
<<<<<<< HEAD
            plansContent += '<div class="col-12 col-xl-4 plan-item text-left">\n\
                                     <div class="row">\
                                        <div class="col-12 col-md-8 col-xl-12">\
                                            <h1 class="feature-title font-weight-normal text-'+ plan.text_color_class + '"><i class="fa fa-check select-indicator"></i> ' + plan.name + '</h1>\n\
                                            <p class="">'+ plan.description + '</p>\n\
                                            <div class="">\n\
                                                <div class="lead ">\n\
                                                    <span class="display-4 text-'+ plan.text_color_class + '">$' + plan.price_per_month + '</span>/mo\n\
                                                </div>\n\
                                                <span class="text-default">* Plus <span class="font-weight-bold">$'+ plan.setup_fee + '</span> on-time setup fee</span>\n\
                                                <hr class=" d-none d-md-block"/>\n\
=======
            plansContent += '<div class="col-md-4 mb-r plan-item">\n\
                                        <h1 class="feature-title font-weight-normal"><i class="fa fa-check select-indicator"></i> ' + plan.name + '</h1>\n\
                                        <p class="">'+ plan.description + '</p>\n\
                                        <div class="p-2">\n\
                                            <div class="lead text-center">\n\
                                                <span class="display-4 text-'+ plan.text_color_class + '">$' + plan.price_per_month + '</span>/mo\n\
>>>>>>> 905ade2360fd51602b23838062bc1439979233d9
                                            </div>\n\
                                            <div class="p-2 d-none d-md-block">\
                                                '+ features + '\
                                            </div>\
                                        </div>\
                                        <div class="col-12 col-md-4 col-xl-12">\
                                            <a class="mt-1 mb-1 mt-md-5 mb-md-1 d-none d-md-block" href="#" target="_blank">Learn more</a> <br/>\
                                            <button data-index="'+ i + '"  class="btn btn-lg btn-' + plan.btn_color_class + 'mt-1 mt-md-0 mt-xl-5 plan-item-button">Select this plan</button>\
                                        </div>\
                                     </div>\
                                     <hr class=" d-block border"/>\n\
                                    </div>';
        });

        planGroup.html(plansContent);
        $('body').on('click', '#form-wizard .plan-item-button', function (event) {
            selectPlan($(this).data('index'));
        });

    }

    populatePlans();
    setup();
    gotoToStepByIndex(0, false);

    _GSW.selectPlan = selectPlan;
    _GSW.selectedPlan = selectedPlan;
    _GSW.isFinished = isFinished;
    _GSW.markFinished = markFinished;
    _GSW.setup = setup;
    
}