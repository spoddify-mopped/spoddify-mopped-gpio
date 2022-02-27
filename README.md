[![npm Version](https://badgen.net/npm/v/spoddify-mopped)](https://www.npmjs.com/package/spoddify-mopped-gpio)
# Spoddify Mopped GPIO

Spoddify Mopped GPIO is a plugin to control [Spoddify Mopped](https://github.com/spoddify-mopped/spoddify-mopped) using GPIO.

- Volume rotary encoder
- Play / Pause
- Previous / Next

## Install

The installation requires that [Spoddify Mopped](https://github.com/spoddify-mopped/spoddify-mopped) is already installed.

You can install this plugin with:

```bash
npm install -g spoddify-mopped-gpio
```

## Config

This plugin is configured in the [`config.json`](https://github.com/spoddify-mopped/spoddify-mopped/wiki/Config-File) of Spoddify Mopped.

### Example:

```json
"plugins": {
    "spoddify-mopped-gpio": {
        "playPausePin": 15
    }
}
```

### Structure:

| Key                         | Description                       |
| --------------------------- | --------------------------------- |
| `playPausePin` _(optional)_ | GPIO pin of the play pause button |
| `nextPin` _(optional)_      | GPIO pin of the next button       |
| `previousPin` _(optional)_  | GPIO pin of the previous button   |

# Contributing

Contributing and pull requests are very welcome.

More information about contributing to this project can be found [here](CONTRIBUTING.md)
