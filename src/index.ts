import { PluginApi } from 'spoddify-mopped';
import onoff from 'onoff';

let spoddifyMopped: PluginApi;

export = (api: PluginApi) => {
  spoddifyMopped = api;
  start();
};

const start = () => {
  const logger = spoddifyMopped.getLogger('spoddify-mopped-gpio');

  logger.info('GPIO service started.');
};
