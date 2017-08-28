function getStarted() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var token = xhr.responseText;
      setupPaymentInfoValidation(token);
      setupPaypalButton(token);
    }
  };
  xhr.open(
    "GET",
    "https://my.elyir.local:8443/59062e028631a043f468fc73/client_token",
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
          $('header').removeClass('header-slide');
          $('#card-image').removeClass();
          $(form).removeClass();
        });
    
        hostedFieldsInstance.on('cardTypeChange', function (event) {
          // Change card bg depending on card type
          if (event.cards.length === 1) {
            $(form).removeClass().addClass(event.cards[0].type);
            $('#card-image').removeClass().addClass(event.cards[0].type);
            $('header').addClass('header-slide');
            
            // Change the CVV length for AmericanExpress cards
            if (event.cards[0].code.size === 4) {
              hostedFieldsInstance.setAttribute({
                field: 'cvv',
                attribute: 'placeholder',
                value: '1234'
              });
            } 
          } else {
            hostedFieldsInstance.setAttribute({
              field: 'cvv',
              attribute: 'placeholder',
              value: '123'
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
            shippingAddressEditable: false,
            // shippingAddressOverride: {
            //   recipientName: 'Scruff McGruff',
            //   line1: '1234 Main St.',
            //   line2: 'Unit 1',
            //   city: 'Chicago',
            //   countryCode: 'US',
            //   postalCode: '60652',
            //   state: 'IL',
            //   phone: '123.456.7890'
            // }
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

function submitPaymentWithNonce(payload){
    alert('Submit your nonce to your server here!');
    console.log(payload);
}