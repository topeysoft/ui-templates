function TscBraintreeClient(settings, formWizard, uiManager) {
  _this = this;

  function initialize() {
    var httpClient = new HttpClient(true);
    httpClient.get(api_base_url+"plugins/braintree/client_token?use_sandbox=true")
      .then(function (token) {
        setupPaymentInfoValidation(token);
        setupPaypalButton(token);
      }).catch(function (err) {
        console.log('Error setting up client', err);
      });
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
          Loader.presentFullScreen({identifier:'user-braintree-pmt-service-loader', text:'Hang on, we just want to make sure this is valid...'});                        
          hostedFieldsInstance.tokenize(function (err, payload) {
          Loader.hide('user-braintree-pmt-service-loader');                        
            if (err) {
              console.error(err);
              return;
            }
            showTermsAndCondition(payload);
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
            Loader.presentFullScreen({identifier:'tsc-paypal-service-loader', text:'Please wait while we contact paypal...'});              
            return paypalCheckoutInstance.tokenizePayment(data)
              .then(function (payload) {
                Loader.hide('tsc-service-loader');                  
                showTermsAndCondition(payload);
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

  function showTermsAndCondition(payload) {
    let agreeButton = formWizard.pluginUI.find('#agree-and-checkout-btn');
    if (agreeButton.length < 1) {
      agreeButton = $('<button id="agree-and-checkout-btn" class="btn col-12 col-md-6 col-xl-4 btn-primary btn-lg">I agree, continue</button>');
    }
    formWizard.pluginUI.find('#agree-and-checkout').before(agreeButton)
    agreeButton.on('click', function () {
      Loader.presentFullScreen({identifier:'tsc-service-checkout-loader', text:'We are almost done. This won\'t take long.'});              
      agreeButton.prop('disabled', true);
      $('.wiz-continue, .wiz-back').prop('disabled', true);
      if(payload && payload.nonce){
        submitPaymentWithNonce(payload.nonce)
      }else if(payload && payload.token){
        submitPaymentWithToken(payload.token)
      }
    });
    formWizard.nextStep(true);
  }

  function createPaymentMethod(customerId, paymentMethodNonce) {
    const payload = {};
    payload.customerId = customerId;
    payload.paymentMethodNonce = paymentMethodNonce;
    const paymentMethodRestClient = new RestClient(api_base_url + 'plugins/braintree/payment-methods');
    return paymentMethodRestClient.create(payload);
    // .then(function(data){
    //     console.log('Payment method created', data);
    // })
    // .catch(function(err){
    //     console.log('Payment method create error', err);
    // })
  }
  function createSubscription(planId, paymentMethodToken) {
    const payload = {};
    payload.planId = planId;
    payload.paymentMethodToken = paymentMethodToken;
    const subscriptionRestClient = new RestClient(api_base_url + 'plugins/braintree/subscriptions');
    return subscriptionRestClient.create(payload);
    // .then(function(data){
    //     console.log('Subscription created', data);
    // })
    // .catch(function(err){
    //     console.log('Subscription create error', err);
    // });
  }
  function upsertCustomer(paymentMethodNonce) {
    let user = window.tscLib.userService.getUserInfo();
    if (user) {
      const payload = {};
      if (user.displayName) {
        let names = user.displayName.replace('  ', ' ').split(' ');
        if (names[0]) {
          payload.firstName = names[0];
        }
        if (names[2]) {
          payload.lastName = names[2];
        } else if (names[1]) {
          payload.lastName = names[1]
        }
      }
      payload.id = user.uid;
      let contactEmail = (formWizard.getBasicInfo() || []).find(function(info){return info.id==='contact_email'}) || {};
      let contactPhone = (formWizard.getBasicInfo() || []).find(function(info){return info.id==='contact_phone'}) || {};
      let company = (formWizard.getBasicInfo() || []).find(function(info){return info.id==='company_name'}) || {};
      let preferredContactMethod = (formWizard.getBasicInfo() || []).find(function(info){return info.id==='preferred_contact_method'}) || {};
      payload.email = contactEmail.value || user.email;
      payload.phone = contactPhone.value || '';
      payload.company = company.value;
      payload.customFields = {}
      payload.customFields.preferred_contact_method = preferredContactMethod.value;
      if (paymentMethodNonce) {
        payload.paymentMethodNonce = paymentMethodNonce;
      }
      const customerRestClient = new RestClient(api_base_url + 'plugins/braintree/customers');
      return customerRestClient.upsert(user.uid, payload);
      // .then(function(data){
      //     console.log('Customer upserted', data);
      // })
      // .catch(function(err){
      //     console.log('Customer upsert error', err);
      // })
    }
  }
  function getExistingCustmer() {
    let user = window.tscLib.userService.getUserInfo();
    if (user) {
      const customerRestClient = new RestClient(api_base_url + 'plugins/braintree/customers');
      return customerRestClient.findById(user.uid);
      // .then(function(data){
      //     console.log('Customer upserted', data);
      // })
      // .catch(function(err){
      //     console.log('Customer upsert error', err);
      // })
    }
  }


  function submitPaymentWithNonce(nonce) {
    upsertCustomer(nonce)
      .then(function (data) {
          createSubscription(formWizard.getSelectedPlan().id, data.customer.paymentMethods[data.customer.paymentMethods.length-1].token)
            .then(function (data) {
              paymentProcessComplete();
            })
            .catch(function (err) {
              console.log('Subscription create error', err);
            })
      })
      .catch(function (err) {
        console.log('Customer upsert error', err);
      })
  }
  function submitPaymentWithToken(token) {
    upsertCustomer()
      .then(function (data) {
          createSubscription(formWizard.getSelectedPlan().id, token)
            .then(function (data) {
              paymentProcessComplete();
            })
            .catch(function (err) {
              console.log('Subscription create error', err);
            })
      })
      .catch(function (err) {
        console.log('Customer upsert error', err);
      })
  }

 function paymentProcessComplete(){
      Loader.hide('tsc-service-checkout-loader');              
      formWizard.nextStep(true);
  }


  function setup() {
    Loader.presentFullScreen({identifier:'tsc:braintree-service-loader', text:'Making sure we have everything in order...'});
    initialize();
    getExistingCustmer()
    .then(function(customer){
      // uiManager.setExistingCustomer(customer);
      formWizard.setExistingCustomer(customer, showTermsAndCondition);
      Loader.hide('tsc:braintree-service-loader');    
    }).catch(function(err){
      formWizard.setExistingCustomer(null);
      Loader.hide('tsc:braintree-service-loader');    
      console.log('Error in getExistingCustmer', err);
    });
    // formWizard.pluginUI.on('tsc:getting_started:finish_and_subscribe', function(event){

    // });

  }

  setup();

  //_this.showTermsAndCondition = showTermsAndCondition;
}