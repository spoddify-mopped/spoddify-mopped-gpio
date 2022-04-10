import { Gpio } from 'onoff';
import { PluginApi } from 'spoddify-mopped';

export type Config = {
  playPausePin?: number;
  nextPin?: number;
  previousPin?: number;
  volume?: {
    clkPin: number;
    dtPin: number;
    swPin?: number;
  };
};

export default class GpioService {
  private logger: ReturnType<typeof PluginApi.prototype.getLogger>;

  public constructor(
    private readonly spoddifyMopped: PluginApi,
    private readonly config?: Config
  ) {
    this.logger = spoddifyMopped.getLogger('spoddify-mopped-gpio');

    if (!Gpio.accessible) {
      this.logger.warn('GPIO: is not accessible on this machine - skipping');
      return;
    }

    if (!config || Object.keys(config).length < 1) {
      this.logger.warn('GPIO: skipping - no config found.');
      return;
    }

    this.logger.info('GPIO service started.');

    this.playPause();
    this.next();
    this.previous();
    this.volume();
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

  private volume = () => {
    if (this.config?.volume) {
      this.logger.info('GPIO: Volume control enabled.');
      const dt = new Gpio(this.config.volume.dtPin, 'in', 'both');
      const clk = new Gpio(this.config.volume.clkPin, 'in', 'both');

      clk.watch(async (err) => {
        if (err) {
          this.logger.error(`GPIO: Volume control failed with: ${err}`);
          return;
        }

        const clkState = clk.readSync();
        const dtState = dt.readSync();

        if (clkState.valueOf() === 0 && dtState.valueOf() === 1) {
          const player = await this.spoddifyMopped.getPlayer();

          if (player) {
            if (player.volume === 100) {
              return;
            }

            let newVolume = player.volume + 5;

            if (newVolume > 100) {
              newVolume = 100;
            }

            await this.spoddifyMopped
              .setVolume(newVolume)
              .catch(this.logger.error);
          }
        }
      });

      dt.watch(async (err) => {
        if (err) {
          this.logger.error(`GPIO: Volume control failed with: ${err}`);
          return;
        }

        const clkState = clk.readSync();
        const dtState = dt.readSync();

        if (clkState.valueOf() === 1 && dtState.valueOf() === 0) {
          const player = await this.spoddifyMopped.getPlayer();

          if (player) {
            if (player.volume === 0) {
              return;
            }

            let newVolume = player.volume - 5;

            if (newVolume < 0) {
              newVolume = 0;
            }

            await this.spoddifyMopped
              .setVolume(newVolume)
              .catch(this.logger.error);
          }
        }
      });
    }
  };
}
