import { PluginApi } from 'spoddify-mopped';
import onoff from 'onoff';

let spoddifyMopped: PluginApi;

export = (api: PluginApi) => {
  spoddifyMopped = api;
  start();
};

const PLAY_PAUSE_BUTTON_PIN = 15;
const NEXT_BUTTON_PIN = 14;
const PREVIOUS_BUTTON_PIN = 10;

const start = () => {
  const logger = spoddifyMopped.getLogger('spoddify-mopped-gpio');
  logger.info('GPIO service started.');

  if (PLAY_PAUSE_BUTTON_PIN) {
    logger.info('GPIO: Play pause button enabled.');
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
  }

  if (NEXT_BUTTON_PIN) {
    logger.info('GPIO: Next button enabled.');
    const nextButton = new onoff.Gpio(NEXT_BUTTON_PIN, 'in', 'falling');

    nextButton.watch((err) => {
      if (err) {
        logger.error(`GPIO: Next button failed with: ${err}`);
        return;
      }

      spoddifyMopped.next();
    });
  }

  if (PREVIOUS_BUTTON_PIN) {
    logger.info('GPIO: Previous button enabled.');
    const previousButton = new onoff.Gpio(PREVIOUS_BUTTON_PIN, 'in', 'falling');

    previousButton.watch((err) => {
      if (err) {
        logger.error(`GPIO: Previous button failed with: ${err}`);
        return;
      }

      spoddifyMopped.previous();
    });
  }
};
