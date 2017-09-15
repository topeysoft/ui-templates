function GettingStartedWizard(settings, uiManager) {
    _GSW = this;
    settings = settings || {};
    const config = settings.config || {};
    const options = settings.options || {};

    _GSW.getExistingCustomer = function () {
        return _GSW.existingCustomer;
        }
    _GSW.setExistingCustomer = function (customer, doneCallback) {
        _GSW.existingCustomer = customer;
        if(!customer){
            return;
        }
        let contactEmail = (_GSW.getBasicInfo() || []).find(function(info){return info.id==='contact_email'}) || {};
        let contactPhone = (_GSW.getBasicInfo() || []).find(function(info){return info.id==='contact_phone'}) || {};
        let company = (_GSW.getBasicInfo() || []).find(function(info){return info.id==='company_name'}) || {};
        let preferredContactMethod = (_GSW.getBasicInfo() || []).find(function(info){return info.id==='preferred_contact_method'}) || {};
        
        customer.customFields = customer.customFields || [];
        contactEmail.value = customer.email || '';
        contactPhone.value = customer.phone || '';
        company.value = customer.company || '';
        preferredContactMethod.value = customer.customFields['preferredContactMethod'] || 'email';
        
        renderSavedPaymentMethods(doneCallback);
    }
    _GSW.getSelectedPlan = function () { return selectedPlan; }
    _GSW.getPaymentMethod = function () { return selectedPaymentMethod; }
    _GSW.getBasicInfo = function () { return basicInfo; }
    _GSW.pluginUI = $(options.container_selector);
    _GSW.gotoStepByIndex = gotoStepByIndex;
    _GSW.nextStep = wizardContinue;
    _GSW.previousStep = wizardBack;


    let selectedPlan = {};
    let isFinished = false;
    let selectedPaymentMethod = false;

    const basicInfo = config.basic_info_data;
    const steps_validity = [
        {
            name: 'intro',
            invalid_message: '',
            valid: true,
            isValid: function () {
                return true;
            },
            hide_step_indicator: true,
            hide_nav_on_mobile: true
        },
        {
            name: 'Business information',
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
            },
            disable_back: true,
            hide_back_button: true,

        },
        {
            name: 'Choose a plan',
            invalid_message: 'Please select a plan<span class="d-none d-md-inline"> to continue</span>',
            isValid: function (index) {
                return (selectedPlan && selectedPlan.name);
            }
        },
        {
            name: 'Review',
            invalid_message: 'Please review your entry before you proceed',
            valid: true,
            isValid: function (index) {
                $(options.container_selector).trigger('tsc:getting_started:review-completed');
                return true;
            }
        },
        {
            name: 'Select payment method',
            invalid_message: 'Please setup a payment method',
            valid: false,
            before_show: function () {
                // renderSavedPaymentMethods();
            },
            isValid: function (index) {
                scrollToSelector(wizardContents.eq(index).find('#card-number'));
                wizardContents.eq(index).find('#card-number').focus();
                return false;
            }
        },

        {
            name: 'Terms and condition',
            invalid_message: '',
            valid: true,
            isValid: function (index) {
                return true;
            },
            hide_nav_on_mobile: true
        },
        {
            name: 'Finish',
            invalid_message: '',
            valid: true,
            before_show: function () {
                if(config.finish_text){
                    $(options.container_selector).find('#finish-text').html(config.finish_text);
                }
            },
            isValid: function (index) {
                return true;
            },
            hide_step_indicator: true
        }
    ];
    const plans = [
        {
            name: "Basic",
            id: "tsc_web_basic",
            price_per_month: 50,
            setup_fee: 30,
            text_color_class: 'green',
            btn_color_class: 'default',
            description: "Ideal for basic online presence to showcase your product or service.",
            features: [
                {
                    description: "Includes support and help and all that fun stuff",
                    included: false
                },
                {
                    description: "Includes more support and help and all that fun stuff",
                    included: false
                }
            ]
        },
        {
            name: "Advanced",
            id: "tsc_web_advanced",
            price_per_month: 90,
            setup_fee: 50,
            text_color_class: 'purple',
            btn_color_class: 'purple',
            description: "Contains features of the basic plan but also include user management (membership system). Suitable for online reservaion, appointment booking, etc",
            features: [{
                description: "Includes support and help and all that fun stuff",
                included: true
            },
            {
                description: "Includes more support and help and all that fun stuff",
                included: false
            }
            ]
        },
        {
            name: "Premium",
            id: "tsc_web_premium",
            price_per_month: 150,
            setup_fee: 100,
            text_color_class: 'rose',
            btn_color_class: 'pink',
            description: "Contains all the features of the advanced plan but also include shopping cart capability. Suitable for e-commerce.",
            features: [{
                description: "Includes support and help and all that fun stuff",
                included: true
            },
            {
                description: "Includes more support and help and all that fun stuff",
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
        // renderSavedPaymentMethods();
        callOnWizardNext.push(function () {
            window.tscLib = window.tscLib || {};
            if (window.tscLib.userService) {
                tscLib.userService.redirectIfNotLoggedIn();
            }
        });
        callOnWizardNext.push(function (nextStepIndex) {
            if (steps_validity[nextStepIndex] && steps_validity[nextStepIndex].disable_back) {
                $('.wiz-back').prop('disabled', true);
            } else {
                $('.wiz-back').prop('disabled', false);
            }
            if (steps_validity[nextStepIndex] && steps_validity[nextStepIndex].hide_back_button) {
                $('.wiz-back').hide();
                $('.wiz-continue').closest('.col').removeClass('text-right');
            } else {
                $('.wiz-back').show();
                $('.wiz-continue').closest('.col').addClass('text-right');
            }
            if (steps_validity[nextStepIndex] && steps_validity[nextStepIndex].hide_step_indicator) {
                $(options.container_selector + ' .wizard-steps').hide();
            } else {
                $(options.container_selector + ' .wizard-steps').show();
            }
            if (steps_validity[nextStepIndex] && steps_validity[nextStepIndex].hide_nav_on_mobile) {
                $('.wizard-footer').addClass('d-none');
            } else {
                $('.wizard-footer').removeClass('d-none');
            }
        });
        callOnWizardNext.push(function () {
            var summary = $('#form-wizard .basic-info-summary');
            var summaryHtml = '';
            $.each(basicInfo, function (i, info) {
                summaryHtml += uiManager.getInfoSummaryHtml(info);
            });
            summary.html(summaryHtml);
        });

        callOnWizardNext.push(function () {
            uiManager.getPlanSummaryHtml(selectedPlan);
        });
        callOnWizardNext.push(function(){
            uiManager.populateInfoInputs(_GSW);
        });

        let stepParent = $('#form-wizard .wizard-steps').html('');
        for (var i = 0; i < (steps_validity.length - 1); i++) {
            var item = $('<li class="wizard-step-item wizard-step col pt-1"><li>');
            stepParent.append(item);
        }
        wizardSteps = $('#form-wizard .wizard-steps .wizard-step');

    }

        
    function activateStepIndicatorByIndex(index) {
        wizardSteps.removeClass('active').removeClass('passed');
        wizardSteps.eq(index).addClass('active').prevAll().addClass('passed');
    }
    function reFocusActiveStep() {
        gotoStepByIndex($('#form-wizard .wizard-step-content.active').index(), true);
    }
    function resetWizardHeight() {
        let index = $('#form-wizard .wizard-step-content.active').index();
        var childRect = wizardContents.get(index).getBoundingClientRect();
        wizardContentWrapper.css('height', childRect.height);
    }
    function resetContinueText(index) {
        var btn = $('#form-wizard  .wiz-continue, #form-wizard  #wiz-continue');
        var text = $('#form-wizard  .wiz-continue .text, #form-wizard  #wiz-continue .text');
        if (index === wizardContents.length - 1) {
            return $('#form-wizard  .wizard-footer').hide();
        }
        if (index === wizardContents.length - 2) {
            text.text('Finish');
            btn.removeClass('btn-primary').addClass('btn-success');
        } else {
            text.text('Continue')
            btn.removeClass('btn-success').addClass('btn-primary');
        }
    }
    function gotoStepByIndex(index) {
        if (steps_validity[index] && steps_validity[index].before_show) {
            steps_validity[index].before_show();
        }
        var rect = wizardContentWrapper[0].getBoundingClientRect();
        var width = index * -(rect.width);
        wizardContents.removeClass('invisible').css('transform', 'translateX(' + width + 'px)');
        $(wizardContents).not(wizardContents.eq(index)).removeClass('active').addClass('invisible');
        wizardContents.eq(index).addClass('active');
        resetWizardHeight();
        scrollToSelector('#form-wizard');
        activateStepIndicatorByIndex(index);
        resetContinueText(index);
        $.each(callOnWizardNext, function (i, fn) {
            fn(index);
        });
    }

    function markFinished(isFinished) {
        isFinished = true;
    }
    function notifyInvalidStep(index) {
        toastr["error"](steps_validity[index].invalid_message);
    }

    function advanceStepByIndex(index, suppressValidation) {
        var currIndex = index - 1;
        if (!suppressValidation && !steps_validity[currIndex].isValid(currIndex)) {
            return notifyInvalidStep(currIndex);
        }
        gotoStepByIndex(index);
        if (index === wizardSteps.length - 1) {
            markFinished(true);
        }
    }
    function revertStepByIndex(index) {
        gotoStepByIndex(index);
    }
    function wizardContinue(suppressValidation = false) {
        var current = $('#form-wizard .wizard-step-content.active');
        var index = current.index();
        if (index < (wizardContents.length - 1)) {
            index += 1;
        }
        advanceStepByIndex(index, suppressValidation);
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
                features += '<hr class="d-block"/>\
                <div class="row">\
                                                <div class="col-auto"> <i class="fa  '+ (feat.included ? 'fa-check-circle' : 'fa-times') + ' p-0 m-0"></i></div>\
                                                <div class="col text-left">\
                                                    '+ feat.description + '\
                                                </div>\
                                            </div>\
                                            ';
                if (feat.included) {

                }
            });
            plansContent += '<div class="text-left col-12 col-xl-4 plan-item">\n\
                                    <div class="row">\
                                        <div class="col-12 col-xl-12 col-md-8">\
                                            <h1 class="feature-title font-weight-normal"><i class="fa fa-check select-indicator"></i> ' + plan.name + '</h1>\n\
                                            <p class="">'+ plan.description + '</p>\n\
                                            <div class="p-2">\n\
                                                <div class="lead">\n\
                                                    <span class="display-4 text-'+ plan.text_color_class + '">$' + plan.price_per_month + '</span>/mo\n\
                                                </div>\n\
                                                <div class="p-2 d-none d-xl-block">\
                                                    '+ features + '\
                                                </div>\
                                            </div>\
                                            </div>\
                                            <div class="col-12 col-md-4 col-xl-12">\
                                                <a class="mt-1 mb-1 mt-md-5 mb-md-1 d-none d-md-block" href="#" target="_blank">Learn more</a> <br/>\
                                                <button data-index="'+ i + '"  class="btn btn-lg btn-' + plan.btn_color_class + ' mt-1 mt-md-0 mt-xl-5 plan-item-button">Select this plan</button>\
                                            </div>\
                                        </div>\
                                        <hr class="d-block border"/>\n\
                                     </div>\
                                    </div>';
        });

        planGroup.html(plansContent);
        $('body').on('click', '#form-wizard .plan-item-button', function (event) {
            selectPlan($(this).data('index'));
        });

    }


    function renderSavedPaymentMethods(doneCallback) {

        let existingMethods = $(options.container_selector + ' #existing-payment-methods');
        let newMethod = $(options.container_selector + ' #braintree-hosted-form');
        let wrapper = existingMethods.find('.methods-wrapper');
        existingMethods.hide();
        newMethod.show();
        wrapper.html('');
        if (!_GSW.existingCustomer) {
            return;
        }
        let newButton = $('<button class="btn btn-secondary mt-4">Setup new payment method</button>')
            .on('click', function (event) {
                newMethod.show();
                existingMethods.hide();
                resetWizardHeight();
            });
        let existingButton = $('<button class="btn btn-secondary mt-4" id="use-saved">Use saved payment method</button>')
            .on('click', function (event) {
                newMethod.hide();
                existingMethods.show();
                resetWizardHeight();
            });
        if (newMethod.find('#use-saved').length < 1) {
            newMethod.append(existingButton);
        }
        renderCreditCards(newMethod, existingMethods, wrapper, newButton);
        renderPayPal(newMethod, existingMethods, wrapper, newButton);
        wrapper.find('.btn-use-this-pmt').on('click', function (event) {
            event.preventDefault();
            let token = $(this).data('data');
            doneCallback({ token: token });
        });
    }
    function renderPayPal(newMethod, existingMethods, wrapper, newButton) {
        if (_GSW.existingCustomer.paypalAccounts
            && _GSW.existingCustomer.paypalAccounts.length > 0) {
            newMethod.hide();
            existingMethods.show();
            let cards = $(`<div class="mt-4 card">
        <h4 class="card-header">PayPal Accounts</h4>
           
          </div>`);
            let cardGroup = $('<div id="card-group"> <div> ');
            $.each(_GSW.existingCustomer.paypalAccounts, function (i, acc) {
                let html = `<div class="card-body pt-1 pb-1">
                <div class="row">
                  <div class="col-auto">
                    <span class="d-inline-block" style="width:4.5rem; height:3rem;background-image:url('${acc.imageUrl}'); background-size:100% 100%;"></span>
                  </div> 
                  <div class="col">
                      <p class ="card-text"> ${acc.email}  <a href="#" data-data="${acc.token}" class ="btn btn-primary btn-use-this-pmt btn-sm">Use this</a>  </p>
                  </div> 
              </div>
          </div>`;
                if (i !== _GSW.existingCustomer.paypalAccounts.length - 1) {
                    html += '<hr />';
                }
                cardGroup.append(html);
            });
            wrapper.append(cards.append(cardGroup));
            wrapper.append(newButton);

        }
    }

    function renderCreditCards(newMethod, existingMethods, wrapper, newButton) {
        if (_GSW.existingCustomer.creditCards
            && _GSW.existingCustomer.creditCards.length > 0) {
            newMethod.hide();
            existingMethods.show();
            let cards = $(`<div class="card">
            <h4 class="card-header">Credit Cards</h4>
           
          </div>`);
            let cardGroup = $('<div id="card-group"> <div> ');
            $.each(_GSW.existingCustomer.creditCards, function (i, card) {
                let html = `<div class="card-body pt-1 pb-1">
              <div class="row">
                <div class="col-auto">
                    <span class="d-inline-block" style="width:4.5rem; height:3rem;background-image:url('${card.imageUrl}'); background-size:100% 100%;"></span>
                </div> 
                <div class="col">
                    <p class ="card-text">**** **** **** ${card.last4}   <a href="#" data-data="${card.token}" class ="btn btn-primary btn-use-this-pmt btn-sm">Use this</a>  </p>
                </div> 
            </div>
        </div>`;
                if (i !== _GSW.existingCustomer.creditCards.length - 1) {
                    html += '<hr class="m-0" />';
                }
                cardGroup.append(html);
            });
            wrapper.append(cards.append(cardGroup));
            if (_GSW.existingCustomer.paypalAccounts
                && _GSW.existingCustomer.paypalAccounts.length > 0) {
                wrapper.append(newButton);
            }
        }
    }

    populatePlans();
    setup();
    gotoStepByIndex(0, false);

    
}