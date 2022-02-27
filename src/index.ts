import { PluginApi } from 'spoddify-mopped';
import onoff from 'onoff';

let spoddifyMopped: PluginApi;

export = (api: PluginApi) => {
  spoddifyMopped = api;
  start();
};

const PLAY_PAUSE_BUTTON_PIN = 15;

const start = () => {
  const logger = spoddifyMopped.getLogger('spoddify-mopped-gpio');

  logger.info('GPIO service started.');

  const playPauseButton = new onoff.Gpio(
    PLAY_PAUSE_BUTTON_PIN,
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
};
