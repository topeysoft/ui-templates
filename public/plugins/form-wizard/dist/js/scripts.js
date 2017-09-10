window.tscLib = window.tscLib || {}; window.tscLib['form-wizard']=window.tscLib['form-wizard'] || {}; window.tscLib['form-wizard'].templates = {"forms/sign-in.html":"<form id=\"sign-in\" style=\"display:none;\"  action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Sign In</h3>\n    </div>\n    <p>We just need some information so we can get you started</p>\n    <br />\n    <!-- Form log in -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"email\" id=\"defaultForm-email\" class=\"form-control email-input\">\n      <label data-error=\"invalid email\" for=\"defaultForm-email\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"defaultForm-pass\" class=\"form-control password-input\">\n      <label data-error=\"Invalid password\" for=\"defaultForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-default btn-lg\">Sign in</button>\n    </div>\n    <br />\n    <p>\n      If you don't have an account yet <a class=\"user-account-div__sign-up-link\" href=\"#\">get started here</a>\n    </p>\n    <p>\n      Other options:\n      <br />\n      <div class=\"providers-div\">\n\n       \n      </div>\n    </p>\n    <!-- <div id=\"firebaseui-auth-container\"></div>\n    <div id=\"sign-in-status\"></div>\n    <div id=\"sign-in\"></div>\n    <div id=\"account-details\"></div> -->\n    <!-- Form log in -->\n  </form>","forms/sign-up.html":"<form id=\"sign-up\"  style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <h3><i class=\"fa fa-lock\"></i> Get Started</h3>\n    </div>\n    <p>Let's get to know each other.</p>\n    <br />\n    <!-- Form register -->\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-user prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-name\" class=\"form-control  name-input\">\n      <label for=\"orangeForm-name\"><i class=\"fa fa-user-circle-o\"></i>&nbsp; &nbsp; Your name</label>\n    </div>\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-envelope prefix grey-text\"></i> -->\n      <input type=\"text\" id=\"orangeForm-email\" class=\"form-control email-input\">\n      <label for=\"orangeForm-email\"><i class=\"fa fa-envelope\"></i>&nbsp; &nbsp; Your email</label>\n    </div>\n\n    <div class=\"md-form\">\n      <!-- <i class=\"fa fa-lock prefix grey-text\"></i> -->\n      <input type=\"password\" id=\"orangeForm-pass\" class=\"form-control password-input\">\n      <label for=\"orangeForm-pass\"><i class=\"fa fa-lock\"></i>&nbsp; &nbsp; Your password</label>\n    </div>\n\n    <div class=\"text-center\">\n      <button class=\"btn btn-primary btn-lg\">Continue</button>\n    </div>\n    <br />\n    <p>\n      If you already have an account with us <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in</a>\n    </p>\n    <!-- Form register -->\n<p>Other options</p>\n    <div class=\"providers-div\">\n      \n                       \n                      </div>\n  </form>","forms/signed-out.html":"<form id=\"signed-out\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p class=\"lead\"> You have successfully signed out. <br/> <small>See you again soon</small></p>\n      <p>\n        <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in again</a>\n      </p>\n\n\n    </div>\n\n    <!-- Form log in -->\n  </form>","forms/user-info.html":"<form id=\"user-info\" style=\"display:none;\" action=\"/plugins/form-wizard\">\n    <div class=\"form-header\">\n      <p>Your are logged in as:</p>\n     <div class=\"row justify-content-center text-center\">\n        <div class=\"col-auto \">\n          {{profileAvatar}}\n            </div>\n        <div class=\"col \">\n            <h1 id=\"user-name\" class=\"font-weight-normal thin\"> {{displayName}}</h1>\n          <p id=\"user-email\" class=\"lead\">{{email}}</p>\n          </div>\n          \n       </div>\n      <p>\n        Not you? <a class=\"user-account-div__sign-in-link\" href=\"#\">sign in as a different user</a>\n      </p>\n      <div class=\"row\">\n          <span class=\"col\">\n              <button  class=\"btn btn-sm btn-secondary user-account-div__sign-out-link\">Sign out</button>\n              </span>\n              <span id=\"user-info-continue-button-col\" class=\"col\">\n                  <a href=\"#\" class=\"btn btn-sm btn-primary\">Continue</a>\n                  </span>\n      </div>\n    </div>\n\n    <!-- Form log in -->\n  </form>"};
function TscBraintreeClient() {
  _this = this;

  function initialize() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var token = xhr.responseText;
        setupPaymentInfoValidation(token);
        setupPaypalButton(token);
      }
    };
    xhr.open(
      "GET",
      "https://cms.api.elyir.local:8443/projects/59062e028631a043f468fc73/plugins/braintree/client_token?use_sandbox=true",
      true
    );
    xhr.send(null);
  }



  function setupPaymentInfoValidation(token) {
    var form = document.querySelector('#bt-payment-form');
    var submit = document.querySelector('#button-pay');

    braintree.client.create({
      authorization: token //'sandbox_g42y39zw_348pk9cgf3bgyw2b'
    }, function (err, clientInstance) {
      if (err) {
        console.error(err);
        return;
      }

      // Create input fields and add text styles  
      braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          'input': {
            'color': '#282c37',
            'font-size': '16px',
            'transition': 'color 0.1s',
            'line-height': '3'
          },
          // Style the text of an invalid input
          'input.invalid': {
            'color': '#E53A40'
          },
          // placeholder styles need to be individually adjusted
          '::-webkit-input-placeholder': {
            'color': 'rgba(0,0,0,0.6)'
          },
          ':-moz-placeholder': {
            'color': 'rgba(0,0,0,0.6)'
          },
          '::-moz-placeholder': {
            'color': 'rgba(0,0,0,0.6)'
          },
          ':-ms-input-placeholder': {
            'color': 'rgba(0,0,0,0.6)'
          }

        },
        // Add information for individual fields
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '**** **** **** ****'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '***'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'mm / yyyy'
          }
        }
      }, function (err, hostedFieldsInstance) {
        if (err) {
          console.error(err);
          return;
        }

        hostedFieldsInstance.on('validityChange', function (event) {
          // Check if all fields are valid, then show submit button
          var formValid = Object.keys(event.fields).every(function (key) {
            return event.fields[key].isValid;
          });

          if (formValid) {
            $('#form-container').addClass('show-button');
          } else {
            $('#form-container').removeClass('show-button');
          }
        });

        hostedFieldsInstance.on('empty', function (event) {
          $('#bt-payment-form header').removeClass('header-slide');
          $('#card-image').removeClass();
          $(form).removeClass();
        });

        hostedFieldsInstance.on('cardTypeChange', function (event) {
          // Change card bg depending on card type
          if (event.cards.length === 1) {
            $(form).removeClass().addClass(event.cards[0].type);
            $('#card-image').removeClass().addClass(event.cards[0].type);
            $('#bt-payment-form header').addClass('header-slide');

            // Change the CVV length for AmericanExpress cards
            if (event.cards[0].code.size === 4) {
              hostedFieldsInstance.setAttribute({
                field: 'cvv',
                attribute: 'placeholder',
                value: '****'
              });
            }
          } else {
            hostedFieldsInstance.setAttribute({
              field: 'cvv',
              attribute: 'placeholder',
              value: '***'
            });
          }
        });

        submit.addEventListener('click', function (event) {
          event.preventDefault();

          hostedFieldsInstance.tokenize(function (err, payload) {
            if (err) {
              console.error(err);
              return;
            }
            submitPaymentWithNonce(payload);
            // This is where you would submit payload.nonce to your server
          });
        }, false);
      });
    });
  }


  function setupPaypalButton(CLIENT_AUTHORIZATION) {
    // Be sure to have PayPal's checkout.js library loaded on your page.
    // <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>

    // Create a client.
    braintree.client.create({
      authorization: CLIENT_AUTHORIZATION
    }, function (clientErr, clientInstance) {

      // Stop if there was a problem creating the client.
      // This could happen if there is a network error or if the authorization
      // is invalid.
      if (clientErr) {
        console.error('Error creating client:', clientErr);
        return;
      }

      // Create a PayPal Checkout component.
      braintree.paypalCheckout.create({
        client: clientInstance
      }, function (paypalCheckoutErr, paypalCheckoutInstance) {

        // Stop if there was a problem creating PayPal Checkout.
        // This could happen if there was a network error or if it's incorrectly
        // configured.
        if (paypalCheckoutErr) {
          console.error('Error creating PayPal Checkout:', paypalCheckoutErr);
          return;
        }

        // Set up PayPal with the checkout.js library
        paypal.Button.render({
          env: 'sandbox',
          payment: function () {
            return paypalCheckoutInstance.createPayment({
              flow: 'vault',
              billingAgreementDescription: 'Your agreement description (TopeySoft Computers)',
              enableShippingAddress: false,
              shippingAddressEditable: false
            });
          },

          onAuthorize: function (data, actions) {
            return paypalCheckoutInstance.tokenizePayment(data)
              .then(function (payload) {
                // Submit `payload.nonce` to your server.
                submitPaymentWithNonce(payload);
              });
          },

          onCancel: function (data) {
            console.log('checkout.js payment cancelled', JSON.stringify(data, 0, 2));
          },

          onError: function (err) {
            console.error('checkout.js error', err);
          }
        }, '#paypal-button').then(function () {
          // The PayPal button will be rendered in an html element with the id
          // `paypal-button`. This function will be called when the PayPal button
          // is set up and ready to be used.
        });

      });

    });
  }

  function submitPaymentWithNonce(payload) {
    alert('Submit your nonce to your server here!');
    console.log(payload);
  }

  function setup() {
    initialize();
  }

  setup();
}
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
        // {
        //     label: 'Your  <span class="d-none d-md-inline">registered</span> domain name  <span class="d-none d-md-inline">(optional)</span>',
        //     value: '',
        //     type: 'text',
        //     invalid_message: 'Please provide us with domain name',
        //     valid_message: 'Thanks, got it'
        // },
        // {
        //     label: 'Business category  <span class="d-none d-md-inline">(Ex. Non-profit)</span>',
        //     value: '',
        //     type: 'text',
        //     invalid_message: '',
        //     valid_message: 'Thanks, got it'
        // },
        // {
        //     label: 'Yes we have a business logo',
        //     question: 'Do you have a business logo?',
        //     true_value: 'Yes we have a business logo',
        //     false_value: 'No we do not have a business logo',
        //     value: true,
        //     checked: false,
        //     type: 'checkbox'
        // }
    ];
    const steps_validity = [
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
                // var inputs = wizardContents.eq(index).find('input[required]');
                // var valid = true;
                // inputs.each(function (i, el) {
                //     if ($.trim($(el).val()).length < 1) {
                //         $(el).addClass('invalid').next().addClass('active');
                //         valid = false;
                //     }
                // });
                scrollToSelector(wizardContents.eq(index).find('#card-number'));
                wizardContents.eq(index).find('#card-number').focus();
                return false;
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
        // setupPaymentInfoValidation();
        callOnWizardNext.push(function () {
            window.tscLib = window.tscLib || {};
            if(window.tscLib.userService){
                tscLib.userService.redirectIfNotLoggedIn();
            }
        });
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
                $(this).removeClass('invalid');
            }
            
            $('body').on('change', '#form-wizard #info-inputs .basic-info-input', handleChange);
            $('body').on('input', '#form-wizard #info-inputs .basic-info-input', handleChange);
            $('body').on('click', '#form-wizard .page-item.wizard-step.passed a', function(event){
                console.log($(this).index())
            });
        });

        let stepParent = $('#form-wizard .wizard-steps').html('');
        for(var i=0; i<(steps_validity.length-1); i++){
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

    populatePlans();
    setup();
    gotoToStepByIndex(0, false);

   // _GSW.selectPlan = selectPlan;
    _GSW.selectedPlan = selectedPlan;
   // _GSW.isFinished = isFinished;
   // _GSW.markFinished = markFinished;
    _GSW.businessInfo = basicInfo;
    
}
(function ($) {
    window.tscLib = window.tscLib || {};
    window.tscLib.gettingStartedWizard = new GettingStartedWizard();
    window.tscLib.tscBraintreeClient = new TscBraintreeClient();
}( jQuery ));