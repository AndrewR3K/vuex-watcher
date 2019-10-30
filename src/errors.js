/**
 * Directory of errors for use throughout the package
 */

export class VuexWatcherError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'VuexWatcherError';
  }
}