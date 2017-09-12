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