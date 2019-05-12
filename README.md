# Behat Complete

Behat Definitions provides auto completion for your Gherkin steps based on your Behat definitions.

## Features

The extension uses the output of the `behat -di` command to provide auto completion.
![Kiku](https://github.com/choppedcode/vscode-behat-complete/blob/develop/doc-assets/exampleautocomplete.gif?raw=true)

## Requirements

* The extension requires a Behat formatter extension to be installed. It has been tested with Cucumber (Gherkin) Full Support.

## Extension Settings

The following settings should be set:
* `behat.command`: Behat command, e.g. /usr/bin/behat, should include the full path. The default is `[WSROOT]/vendor/bin/behat`.
* `behat.configFile`: Behat config file, e.g. behat.yml, should include the full path. The default is `[WSROOT]/tests/behat.yml`.

And the following setting is optional:
* `behat.suite`: Behat test suite to analyse for definitions, leave blank if all suites should be analysed.

## Attributions

Behat logo by [The Behat Project](http://behat.org) is licensed under [Creative Commons Attribution-ShareAlike
4.0 International License](https://raw.githubusercontent.com/Behat/logo/master/LICENSE)

## Release Notes

### 0.1.0

* Initial release

## 0.2.0

* Refactored to TypeScript
* Added various settings
* Use `behat -di` instead of `behat -dl` to get more info about the Behat definitions