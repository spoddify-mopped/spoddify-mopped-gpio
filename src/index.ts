import { PluginApi } from 'spoddify-mopped';
import onoff from 'onoff';

let spoddifyMopped: PluginApi;
let config: Config | undefined;

type Config = {
  playPausePin?: number;
  nextPin?: number;
  previousPin?: number;
};

export = (api: PluginApi, _config?: Config) => {
  spoddifyMopped = api;
  config = _config;
  start();
};

const start = () => {
  const logger = spoddifyMopped.getLogger('spoddify-mopped-gpio');

  if (!config || Object.keys(config).length < 1) {
    logger.warn('GPIO: skipping - no config found.');
    return;
  }

  logger.info('GPIO service started.');

  if (config?.playPausePin) {
    logger.info('GPIO: Play pause button enabled.');
    const playPauseButton = new onoff.Gpio(
      config.playPausePin,
      'in',
      'falling'
    );

    playPauseButton.watch((err) => {
      if (err) {
        logger.error(`GPIO: Play pause button failed with: ${err}`);
        return;
      }

      spoddifyMopped.playPause();
    });
  }

  if (config?.nextPin) {
    logger.info('GPIO: Next button enabled.');
    const nextButton = new onoff.Gpio(config.nextPin, 'in', 'falling');

    nextButton.watch((err) => {
      if (err) {
        logger.error(`GPIO: Next button failed with: ${err}`);
        return;
      }

      spoddifyMopped.next();
    });
  }

  if (config?.previousPin) {
    logger.info('GPIO: Previous button enabled.');
    const previousButton = new onoff.Gpio(config.previousPin, 'in', 'falling');

    previousButton.watch((err) => {
      if (err) {
        logger.error(`GPIO: Previous button failed with: ${err}`);
        return;
      }

      spoddifyMopped.previous();
    });
  }
};
