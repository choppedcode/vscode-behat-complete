# behatcomplete

Behatcomplete provides auto completion for your behat step definitions.

## Features

Currently it uses the output of the `behat -dl` command to provide auto completion.
![Kiku](https://github.com/haringsrob/behatcomplete/blob/develop/doc-assets/exampleautocomplete.gif?raw=true)

## Requirements

Currently it requires behat to be available in `vendor/bin/behat` and `behat.yml` should
be in the `tests/behat.yml` location of your project root. 

This will be configurable/autodiscovered soon.

## Extension Settings

Soon the settings will be available:
* `behatcomplete.enable`: enable/disable this extension
* `behatcomplete.config_location`: relative path to behat.yml
* `behatcomplete.executable`: path to the behat executable if not in vendor directory

## Known Issues

* When editing a line, it always appends

## Disclamer

This is a work in progress. The extension is working, however not optimized yet.

The code contains "clutter" that needs to be removed and ideally this extension
will work independent of the behat executable. (Using the following parser: 
[BehatParser](https://github.com/haringsrob/BehatParser)

## Release Notes

### 0.1.0

Initial release