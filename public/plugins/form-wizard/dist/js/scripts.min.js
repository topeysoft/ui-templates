window.tscLib = window.tscLib || {}; window.tscLib['form-wizard']=window.tscLib['form-wizard'] || {}; window.tscLib['form-wizard'].templates = [{"filename":"step-indicator.html","path":"","full_path":"step-indicator.html","content":"<div class=\"wizard-step-indicator-wrapper d-none d-md-block  justify-content\">\n    <ul class=\"wizard-steps  row m-0 p-0\">\n        <!-- <li class=\"wizard-step-item wizard-step col d-flex \"><span class=\"checked\">&#10004;</span> <span class=\"align-middle\"> Basic information</span></li>\n            <li class=\"wizard-step-item wizard-step col \"><span class=\"checked\">&#10004;</span><span class=\"align-middle\">  Choose a plan</span></li>\n            <li class=\"wizard-step-item wizard-step col \"><span class=\"checked\">&#10004;</span> <span class=\"align-middle\"> Review</span></li>\n            <li class=\"wizard-step-item wizard-step col \"><span class=\"checked\">&#10004;</span> <span class=\"align-middle\"> Select payment method</span></li>\n            <li class=\"wizard-step-item wizard-step col \"><span class=\"checked\">&#10004;</span> <span class=\"align-middle\"> Finish</span></li> -->\n\n\n    </ul>\n</div>"},{"filename":"step-wrapper.html","path":"","full_path":"step-wrapper.html","content":"<div class=\"wizard-step-content-wrapper mt-5\">\n</div>\n<div id=\"fix-break-point\" class=\"mb-5\"></div>\n\n<div id=\"wizard-footer\" class=\"wizard-footer mt-5 mb-0 d-md-none\">\n    <!-- <hr class=\"d-block d-md-none p-0 col-12 m-0\" /> -->\n    <div class=\"row bg-white  pt-2 pb-2\">\n        <div class=\"col text-left\">\n            <button class=\"wiz-back btn btn-secondary btn-simple\">   <i class=\"fa fa-long-arrow-left \"></i> \n                                        <span class=\"text\"> Back</span> </button>\n        </div>\n        <div class=\"col text-right\">\n            <button class=\"wiz-continue  btn-simple btn btn-primary\">\n                                        <span class=\"text \">Continue</span> \n                                         <i class=\"fa fa-long-arrow-right\"></i></button>\n        </div>\n    </div>\n</div>"},{"filename":"step-0-intro.html","path":"steps/","full_path":"steps/step-0-intro.html","content":"<div class=\"wizard-step-content\">\n    <p class=\"display-4\">\n        Hi {{displayName}},\n    </p>\n    <p class=\"lead\">\n        We will be setting up our service for you in the next few steps. <br /> Here is what to expect.\n    </p>\n    <p>\n        We will ask you some basic information about your business, <br /> then you will choose a suitable service plan.\n        <br />At the next step, you will be able to review your previous entries  <br />and finally, you will be asked to set up a payment\n        method.\n    </p>\n\n    <p>\n        <button class=\"btn btn-primary btn-lg wiz-continue \">Continue</button>\n    </p>\n</div>"},{"filename":"step-1-business-info.html","path":"steps/","full_path":"steps/step-1-business-info.html","content":"<div id=\"basic-info\" class=\"wizard-step-content active\">\n        <div class=\"step-header text-center\">\n            <h3>Tell us about your business</h3>\n            <br />\n        </div>\n        <div class=\"row justify-content-center \">\n            <div class=\"col-12 col-md-8 col-xl-6\">\n                <div class=\"p-sm-4\" id=\"info-inputs\">\n                    <p class=\"p-5 m-5\"></p>\n                    <!-- <div class=\"md-form\">\n                        <input type=\"text\" id=\"company-name\" class=\"form-control\">\n                        <label for=\"company-name\">Your company<span class=\"d-none d-md-inline\">/business</span> name</label>\n                    </div>\n\n                    <div class=\"md-form\">\n                        <input data-error=\"invalid domain name\" type=\"url\" id=\"your-name\" class=\"form-control\">\n                        <label for=\"your-name\">Your <span class=\"d-none d-md-inline\">registered</span> domain name <span class=\"d-none d-md-inline\">(optional)</span></label>\n                    </div>\n                    <div class=\"md-form\">\n                        <input type=\"text\" id=\"company-category\" class=\"form-control\">\n                        <label for=\"company-category\">Business category<span class=\"d-none d-md-inline\"> (Ex. Non-profit)</span></label>\n                    </div>\n\n                    <div class=\"form-group text-left\">\n                        <input type=\"checkbox\" id=\"checkbox1\">\n                        <label for=\"checkbox1\">We have a business logo</label>\n                    </div> -->\n                </div>\n            </div>\n            <div class=\"col-12 col-md-auto d-none d-md-flex align-items-center\">\n                <div class=\"p-2 d-block\">\n                    <button id=\"wiz-continue\" class=\"btn btn-primary btn-lg\"><span class=\"\">Continue</span> &rarr;</button>\n                    <p class=\"d-none\" style=\"color:rgba(0,0,0, 0.1); font-size:20rem; height:20rem;line-height:20rem;\">\n                        <i class=\"fa fa-info-circle\"></i>\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>\n"},{"filename":"step-2-plans.html","path":"steps/","full_path":"steps/step-2-plans.html","content":"<div id=\"choose-plan\" class=\"wizard-step-content\">\n        <!-- <div class=\"step-header text-left\">\n            <h3>Basic information</h3>\n            <p>We just need some information so we can get you started</p>\n            <br />\n        </div> -->\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <!--Section heading-->\n                <h3 class=\"section-heading pt-4\">Choose a plan to continue</h3>\n                <br />\n                <!--Section description-->\n                <!-- <p class=\"section-description lead grey-text\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum.</p> -->\n\n\n                <div id=\"plan-group\" class=\"row  features-small\">\n\n                    <!-- plans will be populated here -->\n\n                </div>\n                <p class=\"text-muted text-center\">\n                    All plans Includes non-refundable setup fee and monthly subscription starting from the date the website goes live. <br/>                                            * Setup fees can be discounted or completely waived in some cases. <a href=\"#\">Learn how you can save some money on the setup fee.</a>\n                </p>\n                <div class=\"row justify-content-center\">\n                    <div class=\"col-6 text-center d-none d-md-block w-100\">\n                        <button class=\" d-block w-100 wiz-back btn btn-secondary btn-lg\">&larr; <span class=\"text d-none d-sm-inline\">Back</span></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"},{"filename":"step-3-review.html","path":"steps/","full_path":"steps/step-3-review.html","content":"<div id=\"review\" class=\"wizard-step-content\">\n        <div class=\"row\">\n            <div class=\"col-12 text-left\">\n                <h3 class=\"pb-5 text-center\">Let's make sure we got everything right before we proceed. </h3>\n                <div class=\"row\">\n                    <div class=\"col-12 col-md-6\">\n                        <h4 class=\"font-weight-bold\">Your business information</h4>\n                        <div class=\"basic-info-summary\"></div>\n                    </div>\n                    <div class=\"col-12 col-md-6 mt-3 mt-md-auto\">\n                        <h4 class=\"font-weight-bold\">Plan details</h4>\n                        <div class=\"selected-plan-summary\"></div>\n\n                    </div>\n                    <div class=\"col-12 d-none d-md-block\">\n                        <div class=\"row\">\n                            <div class=\"col-6 text-right\">\n                                <button class=\"wiz-back btn btn-secondary btn-lg\">&larr; <span class=\"text d-none d-sm-inline\">Back</span></button>\n                            </div>\n                            <div class=\"col-6 text-left\">\n                                <button class=\"wiz-continue btn btn-primary btn-lg\"><span class=\"text d-none d-sm-inline\">Continue</span> &rarr;</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n"},{"filename":"step-4-payment.html","path":"steps/","full_path":"steps/step-4-payment.html","content":"<div id=\"payment-method\" class=\"wizard-step-content\">\n        <div class=\"row justify-content-md-center\">\n            <div class=\"w-100\">\n                <h3 class=\"section-heading pt-4\">Set up a payment method</h3>\n                <br />\n            </div>\n            <div class=\"col-md-6 text-left\">\n                <div class=\" p-3 selected-plan-summary\"></div>\n                <div class=\"total-payment-summary\"></div>\n                <div class=\"col-auto text-left d-none d-md-block\">\n                    <button id=\"wiz-back\" class=\"btn btn-secondary btn-lg\">&larr; <span class=\"text d-none  d-sm-inline\"> Back</span></button>\n                </div>\n            </div>\n\n            <div class=\"col-md-6\">\n\n                <div id=\"braintree-hosted-form\" class=\"braintree-hosted-form\">\n                    <div id=\"form-container\" class=\" form-container\">\n                        <div class=\"bg-illustration\">\n                            <svg width=\"801\" height=\"570\" viewBox=\"0 0 801 570\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M695.15 540.43c-20.954 6.55-43.243 8.226-64.932 4.89 26.065-11.507 55.1-15.426 83.328-12.16-6.065 2.907-12.257 5.35-18.397 7.27m-74.984-158.957c-21.38 10.4-43.668 18.945-66.534 25.507-10.876 3.124-21.884 5.796-32.982 8.01-9.54 1.897-19.777 4.24-29.407 1.474-3.74-1.074-7.995-3.277-9.628-7.045-1.683-3.892 5.25-9.335 7.905-12.03 7.204-7.305 15.39-13.605 24.186-18.898 17.312-10.42 36.777-16.946 56.58-20.74 29.96-5.74 61.745-5.98 91.927.11-13.534 8.686-27.587 16.578-42.047 23.61M500.756 239.7c-33.755 25.25-73.15 43.654-114.53 52.324-3.04.637-17.404 1.327-11.22-4.79 4.484-4.435 9.366-8.456 14.522-12.093 8.946-6.313 18.65-11.5 28.616-16.02 22.272-10.1 45.856-17.684 69.6-23.497 8.246-2.02 16.557-3.784 24.91-5.325-3.887 3.23-7.85 6.372-11.9 9.402M342.55 48.914c-6.185 9.275-13.586 17.906-21.198 26.05-29.246 31.28-66.41 55.228-107.156 68.748-9.036 2.998-18.98 6.006-28.552 3.737-3.216-.762-9.808-3.368-10.36-7.234-.303-2.117 2.287-5.23 3.342-6.96 1.356-2.23 2.805-4.4 4.337-6.514 12.736-17.588 30.818-30.666 49.696-41.077 34.208-18.862 71.874-31.495 110.664-37.96-.256.404-.51.81-.774 1.21m457.74 519.678c-22.864-19.48-51.17-31.804-80.733-36.312 9.67-5.095 18.695-11.365 26.732-18.812 14.05-13.024 24.878-30.252 26.41-49.644 1.64-20.754-7.21-41.398-19.804-57.542-20.985-26.902-53.498-42.06-86.39-49.197 2.876-1.887 5.738-3.798 8.565-5.757 17.06-11.824 34.41-25.288 44.125-44.053 8.667-16.737 10.507-38.63-.855-54.614-10.888-15.32-30.21-21.3-47.887-24.643-46.346-8.764-94.712-8.922-141.317-2.16-3.577.522-7.144 1.098-10.71 1.703 10.422-9.04 20.23-18.78 29.26-29.202 16.158-18.658 32.707-40.726 35.14-66.04 4.776-49.667-50.926-71.248-90.198-80.87-47.635-11.67-97.6-13.463-146.025-5.768 3.113-5.434 5.273-11.288 4.97-17.58-.47-9.854-7.347-18.123-15.74-22.784-11.377-6.32-25.098-5.845-37.625-4.418-23.028 2.626-45.735 8-67.582 15.672-43.49 15.276-83.362 39.604-118.428 69.25-36.16 30.574-67.404 66.832-93.41 106.278-6.348 9.625-12.37 19.457-18.1 29.46-.54.945.923 1.796 1.463.85 40.29-70.35 96.604-133.587 166.986-175.18C203.47 26.94 241.14 12.15 280.516 5.18c20.895-3.7 51.86-9.495 65.6 11.7 6.22 9.6 3.576 20.047-1.766 29.143-3.298.545-6.592 1.134-9.876 1.768-26.202 5.052-51.843 12.94-76.305 23.567-22.525 9.788-44.832 21.706-62.735 38.713-8.42 8-15.773 17.185-21.18 27.47-3.763 7.16 9.64 11.647 14.766 12.153 10.566 1.042 20.932-2.625 30.718-6.102 11.48-4.08 22.666-8.986 33.446-14.64 21.505-11.28 41.417-25.57 58.974-42.3 9.075-8.65 17.512-17.96 25.207-27.844 2.79-3.58 5.756-7.41 8.263-11.483 52.33-8.38 106.617-5.535 157.177 8.53 36.682 10.207 84.046 32.95 78.09 78.475-3.09 23.603-18.427 44.218-33.538 61.828-9.847 11.478-20.625 22.164-32.15 31.976-19.287 3.427-38.35 8.103-57.007 14.06-21.474 6.853-43.19 14.898-62.414 26.797-8.93 5.53-17.205 12.008-24.462 19.596-.195.202-.327.543-.22.82 3.423 8.837 16.933 4.033 23.404 2.455 11.922-2.908 23.653-6.584 35.105-10.975 22.774-8.73 44.46-20.26 64.415-34.24 7.58-5.31 14.908-10.972 21.96-16.955 39.06-6.903 79.05-8.58 118.555-4.88 21.537 2.018 45.684 4.04 65.153 14.28 9.745 5.127 18.006 12.924 21.967 23.337 3.86 10.146 3.67 21.456.824 31.83-6.102 22.25-24.29 38.393-42.392 51.46-5.212 3.767-10.53 7.39-15.925 10.896-1.224-.252-2.445-.517-3.667-.746-37.45-7.026-77.88-5.438-114.235 6.232-18.002 5.78-35.216 14.388-49.737 26.545-3.65 3.057-7.115 6.33-10.362 9.806-1.567 1.678-3.082 3.4-4.54 5.17-.875 1.064-2.49 2.35-2.57 3.775-.143 2.517 2.89 5.763 4.637 7.185 2.58 2.103 5.815 3.312 9.048 3.995 8.508 1.8 17.07.216 25.46-1.39 11.114-2.13 22.14-4.725 33.04-7.77 21.866-6.106 43.222-14.027 63.787-23.626 17.12-7.99 33.678-17.172 49.527-27.44 7.98 1.705 15.85 3.83 23.528 6.446 36.767 12.53 71.948 39.044 81.216 78.46 9.36 39.803-19.35 71.52-53.047 88.572-16.7-2.21-33.75-1.943-50.4.943-13.49 2.337-26.584 6.463-38.99 12.215-.637.294-.498 1.417.203 1.54 30.05 5.212 62.45.816 89.935-12.918 16.66 2.28 32.98 7.053 48.18 14.26 12.224 5.798 23.625 13.16 33.912 21.924.824.7 2.028-.486 1.197-1.193\"\n                                    fill=\"#FFF\" fill-rule=\"evenodd\" />\n                            </svg>\n\n                        </div>\n\n                        <header class=\"p-0\">\n                            <h1 >Card payment method</h1>\n                        </header>\n                        <form id=\"bt-payment-form\" class=\"scale-down\">\n                            <div class=\"cardinfo-card-number\">\n                                <label class=\"cardinfo-label\" for=\"card-number\">Card Number</label>\n                                <div class='input-wrapper' id=\"card-number\"></div>\n                                <div id=\"card-image\"></div>\n                            </div>\n\n                            <div class=\"cardinfo-wrapper\">\n                                <div class=\"cardinfo-exp-date\">\n                                    <label class=\"cardinfo-label\" for=\"expiration-date\">Valid Thru</label>\n                                    <div class='input-wrapper' id=\"expiration-date\"></div>\n                                </div>\n\n                                <div class=\"cardinfo-cvv\">\n                                    <label class=\"cardinfo-label\" for=\"cvv\">CVV</label>\n                                    <div class='input-wrapper' id=\"cvv\"></div>\n                                </div>\n                            </div>\n                        </form>\n\n                        <button class=\"btn m-4\" id=\"button-pay\" type=\"submit\">Continue</button>\n\n                        <div class=\"col-12 card pt-4 pb-4\">\n                            <p class=\"h4 pb-3\">Other options:</p>\n                            <div id=\"paypal-button\"></div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"},{"filename":"step-5-terms.html","path":"steps/","full_path":"steps/step-5-terms.html","content":"<div class=\"wizard-step-content\">\n    <p class=\"display-4\">\n        Terms and Condition\n    </p>\n    <p class=\"lead\">\n        Read and accept the terms and condition to continue.\n    </p>\n    <p>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non dictum turpis. Nullam vitae fringilla sapien, in pulvinar lacus. Maecenas imperdiet nec sapien at tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eleifend nisl sem, vitae finibus sem mollis vel. Ut a rutrum mauris, ut pretium lectus. Praesent dapibus, risus ac auctor porta, lorem magna dictum risus, commodo pharetra erat nulla et justo. Pellentesque metus justo, pulvinar vitae mi lobortis, tempor lacinia leo. Sed eu tortor eget nisi finibus venenatis. Aliquam ullamcorper justo sed nisl feugiat efficitur.\n        \n        Nulla facilisi. Ut ullamcorper quis dolor ut ultricies. Maecenas id lorem semper, ullamcorper metus sit amet, vulputate nulla. Duis quis ex turpis. Vestibulum in tortor ex. Etiam euismod laoreet ultricies. Mauris dui libero, efficitur consectetur efficitur sit amet, bibendum id tellus. Sed vel magna ut lectus hendrerit gravida et vel velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse viverra lobortis viverra.\n        \n        Maecenas auctor et mauris et pellentesque. Curabitur interdum lorem tempus dui dictum, nec volutpat nisl viverra. Sed sed risus in quam varius eleifend id nec nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed a sollicitudin purus. Nunc euismod risus vel commodo imperdiet. Cras laoreet at turpis ut hendrerit. Mauris varius sed nisl aliquam mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n        \n        Quisque et sodales nisl, quis efficitur nulla. In iaculis ullamcorper facilisis. Duis dictum, orci semper maximus dignissim, arcu enim volutpat nisi, quis interdum tortor diam id orci. Integer eu nulla imperdiet, tincidunt odio ac, accumsan nisi. Sed id libero nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sodales mi eget justo vestibulum sollicitudin eget sit amet dolor. Aenean non lectus vel tellus vulputate condimentum sit amet commodo augue. Praesent sed leo pharetra, viverra eros non, tempor urna. Mauris vehicula bibendum risus, vel facilisis magna suscipit ut. Proin dolor purus, feugiat et tortor eget, ullamcorper tempor turpis. Maecenas ornare arcu nec dapibus commodo.\n        \n        Quisque eu ullamcorper sem. Suspendisse gravida in mi ut aliquam. Nam egestas mi iaculis ornare gravida. Sed enim metus, fermentum a ultrices viverra, dapibus a ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut aliquam, lacus sit amet vulputate vehicula, tortor sapien sodales lorem, eu facilisis enim nisl quis sapien. Curabitur gravida luctus dui et suscipit. Sed posuere vestibulum justo, et viverra dolor bibendum ac. In auctor nunc in fermentum ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer bibendum velit ac lorem efficitur, eu sodales sem aliquet. Ut quis pharetra elit, et cursus mi. Nullam cursus placerat leo in porta.\n        \n        \n    </p>\n\n    <p class=\"row justify-content-center\">\n        <button class=\"btn col-12 col-md-6 col-xl-4 btn-primary btn-lg wiz-continue \">I agree, continue</button>\n        <button class=\"btn col-12 col-md-6 col-xl-4 btn-secondary wiz-back\">I don't agree</button>\n    </p>\n</div>"},{"filename":"step-6-complete.html","path":"steps/","full_path":"steps/step-6-complete.html","content":"<div id=\"finish\" class=\"wizard-step-content\">\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <p class=\"section-heading display-4 pt-4\">Finished</p>\n                <br />\n\n                <h3 class=\"\">Thank you for choosing our service ...</h3>\n            </div>\n        </div>\n    </div>\n    "}];
function TscBraintreeClient(settings, formWizard) {
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
    window.tscLib.userService.getToken().then(function(token){
      xhr.open(
        "GET",
        "https://api.elyir.local:8443/cms-api/projects/59062e028631a043f468fc73/plugins/braintree/client_token?use_sandbox=true",
        true
      );
      xhr.setRequestHeader('Authorization', 'Bearer '+token);
      xhr.send(null);
    }).catch(err=>{
      console.log('Invalid user', err);  
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
    // alert('Submit your nonce to your server here!');
    formWizard.nextStep(true);
    console.log(payload);
  }

  function setup() {
    initialize();
  }

  setup();
}
function GettingStartedWizard (settings){
    _GSW = this;
    settings = settings || {};
    const config = settings.config || {};
    const options = settings.options || {};




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
            name: 'intro',
            invalid_message: '',
            valid: true,
            isValid: function(){
                return true;
            },
            hide_step_indicator:true,
            hide_nav_on_mobile:true
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
            disable_back:true,
            hide_back_button:true,

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
            name: 'Terms and condition',
            invalid_message: '',
            valid: true,
            isValid: function (index) {
                return true;
            },
            hide_nav_on_mobile:true
        },
         {
            name: 'Finish',
            invalid_message: '',
            valid: true,
            isValid: function (index) {
                return true;
            },
            hide_step_indicator:true
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
        callOnWizardNext.push(function (nextStepIndex) {
            if(steps_validity[nextStepIndex] && steps_validity[nextStepIndex].disable_back){
                $('.wiz-back').prop('disabled', true);
            }else{
                $('.wiz-back').prop('disabled', false);
            }
            if(steps_validity[nextStepIndex] && steps_validity[nextStepIndex].hide_back_button){
                $('.wiz-back').hide();
                $('.wiz-continue').closest('.col').removeClass('text-right');
            }else{
                $('.wiz-back').show();
                $('.wiz-continue').closest('.col').addClass('text-right');
            }
            if(steps_validity[nextStepIndex] && steps_validity[nextStepIndex].hide_step_indicator){
                $(options.container_selector+' .wizard-steps').hide();
            }else{
                $(options.container_selector+' .wizard-steps').show();
            }
            if(steps_validity[nextStepIndex] && steps_validity[nextStepIndex].hide_nav_on_mobile){
                $('.wizard-footer').addClass('d-none');
            }else{
                $('.wizard-footer').removeClass('d-none');
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
        gotoStepByIndex($('#form-wizard .wizard-step-content.active').index(), true);
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
        if(index === wizardSteps.length-1){
            markFinished(true);
        }
    }
    function revertStepByIndex(index) {
        gotoStepByIndex(index);
    }
    function wizardContinue(suppressValidation=false) {
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

    populatePlans();
    setup();
    gotoStepByIndex(0, false);

   // _GSW.selectPlan = selectPlan;
    _GSW.selectedPlan = selectedPlan;
   // _GSW.isFinished = isFinished;
   // _GSW.markFinished = markFinished;
    _GSW.businessInfo = basicInfo;
    _GSW.gotoStepByIndex = gotoStepByIndex;
    _GSW.nextStep = wizardContinue;
    _GSW.previousStep = wizardBack;
}
let namespace =  'getting-started-wiz';
window.tscLib = window.tscLib||{};
window.tscLib[namespace] = {};
window.tscLib[namespace].preparePluginConfig = function (user) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var settings = {};
        try {
            settings = JSON.parse(xhr.responseText);
        } catch (err) { 
            console.log('Getting started config error', err)
        }
        settings = settings || {};
        settings.config = settings.config || {};
        settings.options = settings.options || {};
        settings.config.namespace = 'getting-started-wiz';
        settings.options.container_selector = settings.options.container_selector || '#form-wizard.form-wizard';

        tscLib[settings.config.namespace].initializePlugin(settings);
      }
    };
    window.tscLib.userService.getToken()
    .then(function(token){
       xhr.open(
         "GET",
         "https://api.elyir.local:8443/cms-api/projects/59062e028631a043f468fc73/plugins/form_wizard/config/?use_sandbox=true",
         true
       );
        xhr.setRequestHeader('Authorization', 'Bearer '+token);
    xhr.send(null);
}).catch(err=>{
  console.log('Invalid user', err);  
});
  }


  window.tscLib[namespace].initializePlugin = function (settings){
    window.tscLib = window.tscLib||{};
    settings = settings || {};
    const config = settings.config || {};
    const options = settings.options || {};
    window.tscLib[config.namespace] = window.tscLib[config.namespace]||{};
    if(tscLib[config.namespace].initialized){
        return;
      }
      tscLib[config.namespace].initialized = true;
      const  uiManager = new UiManager(settings);
      window.tscLib[config.namespace].uiManager = uiManager;
      uiManager.prepareTemplates( function(){
          const formWizard = new GettingStartedWizard(settings);
        window.tscLib[namespace].gettingStartedWizard = formWizard;
          window.tscLib[config.namespace].tscBraintreeClient = new TscBraintreeClient(settings, formWizard);
      });
      
}

$(document).ready(function(){
    $(document).on('tsc:user_service:ready', function(event, user){
        window.tscLib[namespace].preparePluginConfig(user);
    });
});

function UiManager(settings) {
    let _this = this;
    const config = settings.config || {};
    const options = settings.options || {};

    _this.uiElements = {};
    _this.pluginUI = $(options.container_selector);
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
        let baseHtml =stepIndicatorWraperTemplate.content
        + stepWrapperTemplate.content;
        _this.pluginUI.html(baseHtml);
        _this.uiElements.stepContentWrapper = _this.pluginUI.find('.wizard-step-content-wrapper');
        let stepHtml = '';
        $.each(stepTemplates, function (i, template) {
            stepHtml+=template.content;
        });
        let userInfo = window.tscLib.userService.getUserInfo();
        _this.uiElements.stepContentWrapper.html(parseContentData(stepHtml, userInfo));
            cb();
    }

    function setup() {
    }

    setup();
}