# Contributing

## Requirements

- node >= v12
- yarn

There is a `.nvmrc` in the root of this project. If you use nvm you can easily run `nvm use` to configure the correct node version.

## Setup

```bash
npm i -g yarn
```

Install all node dependencies:

```bash
yarn install
```

Your local setup is ready.

## Developing

## Build the plugin

The following command will output the compilation to the `dist` directory:

```bash
yarn build
```

## Link to Spoddify Mopped

To test the plugin you can link the current directory to the global `node_modules`, so Spoddify Mopped can locate it:

```bash
npm link
```

Now start spoddify-mopped with:

```bash
spoddify-mopped -v
```

You should see a log message when the plugin was loaded successfully.

## Watch Changes

To auto-compile the code on changes, use:

```bash
yarn watch
```

> This will also restart spoddify-mopped for you. You have to stop any other running instance.
