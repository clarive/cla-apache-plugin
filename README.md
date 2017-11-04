# Apache Plugin

<img src="https://cdn.rawgit.com/clarive/cla-apache-plugin/master/public/icon/apache.svg?sanitize=true" alt="Apache Plugin" title="Apache Plugin" width="120" height="120">

Apache plugin will allow you to interact with Apache HTTP Server through CLI (Command Line Interface).

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-apache-plugin` folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

### Apache Server

The various parameters are:

- **Server (variable name: server)** - Select the server where Apache is installed.
- **Functions (args)** - List of principal settings that you can use. 
   - **Start ("start")** - Starts Apache server.
   - **Stop ("stop")** - Stops Apache server.
   - **Restart ("restart")** - Restarts Apache server.
   - **Custom ("custom")** - Custom command for Apache.
- **Custom Params (custom_args)** - If you select Custom in Functions, you should fill this parameter.

**Only Clarive EE**

- **Errors and output** - These two fields concern to management of control errors. The options are:
   - **Fail and output error** - Search for configured error pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Warn and output warn** - Search for configured warning pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Custom** - If combo box errors is set to custom, a new form is displayed for defining the behavior with these
     fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the
        monitor.
      - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
        monitor.
   - **Silent** - Silence all errors found.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Apache Server**

Example:

```yaml
    Server Resource: GenericServer
    Functions: start
``` 

Configuration example with custom:

```yaml
    Server Resource: GenericServer
    Functions: custom
    Custom Params: -D name
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
rule: Apache demo
do:
   - apache_task:
       server: apache_server      # Required. Use the mid set to the resource you created
       args: 'start'              # Required
``` 

Configuration example with custom:

```yaml
rule: Yet another Apache demo
do:
   - apache_task:
       server: apache_server      # Required. Use the mid set to the resource you created
       args: 'custom'             # Required
       custom_args: ['arg1', 'arg2']
```

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

You will get the error from the console output.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "apache_task": "args"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Args` not available for op "apache_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
