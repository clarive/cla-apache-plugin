var reg = require('cla/reg');

reg.register('service.apache.server', {
    name: 'Apache Server',
    icon: '/plugin/cla-apache-plugin/icon/apache.svg',
    form: '/plugin/cla-apache-plugin/form/apache-form.js',
    rulebook: {
        moniker: 'apache_task',
        description: _('Launchs Apache commands'),
        required: ['server', 'args'],
        allow: ['server', 'args', 'custom_args', 'errors'],
        mapper: {
            'custom_args': 'custom'
        },
        examples: [{
            apache_task: {
                server: 'apache_server',
                args: 'start'
            }
        }, {
            apache_task: {
                server: 'apache_server',
                args: 'custom',
                custom_args: ['-D name']
            }
        }]
    },
    handler: function(ctx, params) {
        var ci = require("cla/ci");
        var log = require('cla/log');
        var reg = require('cla/reg');
        var apacheServer = params.server;
        var command = '';
        var args = params.args || '';
        var errors = params.errors || 'warn';
        var user = params.user || "";
        var customParams = params.custom;
        var ciServer = ci.findOne({
            mid: apacheServer + ''
        });
        if (!ciServer) {
            log.fatal(_("Server Resource not found"));
        }

        function remoteCommand(params, command, server, errors, user) {
            var output = reg.launch('service.scripting.remote', {
                name: _('Run apache script'),
                config: {
                    errors: errors,
                    server: server,
                    user: user,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        if (args != "custom") {
            command = 'httpd -k ' + args;
        }

        if (customParams.length > 0 && !command) {
            command = 'httpd ' + customParams.join(" ");
        }
        log.debug(_("Command apache: ") + command);

        var response = remoteCommand(params, command, server, errors, user);
        return response.output;
    }
});