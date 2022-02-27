import GpioService, { Config } from './gpio';

import { PluginApi } from 'spoddify-mopped';

export = (api: PluginApi, config?: Config) => {
  new GpioService(api, config);
};
