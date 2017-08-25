(function(params) {

    var data = params.data || {};

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: data.server || '',
        class: 'BaselinerX::CI::generic_server',
        fieldLabel: _('Server'),
        allowBlank: false,
        with_vars: 1
    });

    var args = Cla.ui.comboBox({
        name: 'args',
        fieldLabel: _('Functions'),
        value: data.args || [],
        data: [
            ['start', 'start'],
            ['stop', 'stop'],
            ['restart', 'restart'],
            ['custom', 'custom']
        ],
        singleMode: true
    });

    args.on('addItem', function() {
        var v = args.getValue();
        if (v == 'custom') {
            customParams.show();
        } else {
            customParams.hide();
        }
    });
    var customParams = Cla.ui.arrayGrid({
        name: 'custom',
        fieldLabel: _('Custom Params'),
        hidden: !(data.args == 'custom'),
        value: data.custom,
        description: _('Custom Params'),
        default_value: '.'
    });

    var errors = Cla.ui.errorManagementBox({
        errorTypeName: 'type',
        errorTypeValue: params.data.type || 'warn',
        rcOkName: 'ok',
        rcOkValue: params.data.ok,
        rcWarnName: 'warn',
        rcWarnValue: params.data.warn,
        rcErrorName: 'error',
        rcErrorValue: params.data.error,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverCombo,
            args,
            customParams,
            errors,
        ]
    });

    return panel;
})