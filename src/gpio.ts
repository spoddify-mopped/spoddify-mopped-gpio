import { Gpio } from 'onoff';
import { PluginApi } from 'spoddify-mopped';

export type Config = {
  playPausePin?: number;
  nextPin?: number;
  previousPin?: number;
};

export default class GpioService {
  private logger: ReturnType<typeof PluginApi.prototype.getLogger>;

  public constructor(
    private readonly spoddifyMopped: PluginApi,
    private readonly config?: Config
  ) {
    this.logger = spoddifyMopped.getLogger('spoddify--mopped-gpio');

    if (!config || Object.keys(config).length < 1) {
      this.logger.warn('GPIO: skipping - no config found.');
      return;
    }

    this.logger.info('GPIO service started.');

    this.playPause();
    this.next();
    this.previous();
  }

  private playPause = () => {
    if (this.config?.playPausePin) {
      this.logger.info('GPIO: Play pause button enabled.');
      const playPauseButton = new Gpio(
        this.config.playPausePin,
        'in',
        'falling'
      );

      playPauseButton.watch((err) => {
        if (err) {
          this.logger.error(`GPIO: Play pause button failed with: ${err}`);
          return;
        }

        this.spoddifyMopped.playPause();
      });
    }
  };

  private next = () => {
    if (this.config?.nextPin) {
      this.logger.info('GPIO: Next button enabled.');
      const playPauseButton = new Gpio(this.config.nextPin, 'in', 'falling');

      playPauseButton.watch((err) => {
        if (err) {
          this.logger.error(`GPIO: Next button failed with: ${err}`);
          return;
        }

        this.spoddifyMopped.next();
      });
    }
  };

  private previous = () => {
    if (this.config?.previousPin) {
      this.logger.info('GPIO: Previous button enabled.');
      const previousButton = new Gpio(this.config.previousPin, 'in', 'falling');

      previousButton.watch((err) => {
        if (err) {
          this.logger.error(`GPIO: Previous button failed with: ${err}`);
          return;
        }

        this.spoddifyMopped.previous();
      });
    }
  };
}
