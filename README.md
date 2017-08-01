# Apache Plugin

Apache plugin will allow you to interact with Apache HTTP Server through CLI.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-apache-plugin` folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to use

Once the plugin is correctly installed, you will have a new palette service called 'Apache Server'.


### Apache Server:

This palette service will let you use commands that allow you to interact with the Apache server. 

The main fields are:

- **Server** - Select the server where Apache is installed.
- **Functions** - List of principal settings that you can use. 
- **Custom Params** - When you select custom in Functions, this combo is enabled. Via this parameter you can choose the
  settings you wish to launch.

Configuration example:

    Server CI: GenericServer
    Functions: start

Configuration example with custom:

    Server CI: GenericServer
    Functions: custom
    Custom Params: -D name

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


