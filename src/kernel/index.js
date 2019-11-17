import { EventEmitter } from 'events';
import { WatcherLogger } from '../logger';

export class WatcherKernel extends EventEmitter {
  constructor(ModuleOpts) {
    super();
    this.env_ = ModuleOpts.environment;
    this.logger = new WatcherLogger();
  }

  isLogFriendly() {
    return !(this.env_ === 'production');
  }
}