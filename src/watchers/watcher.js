import { EventTypes } from "../types";

export default class Watcher {
  constructor(watcher) {
    const watcherKeys = Object.keys(watcher).
      filter((key) => key !== 'cb');

    this._watcherType = EventTypes[
      watcherKeys[0].charAt(0).toUpperCase() + watcherKeys[0].substring(1)
    ];
    this._watcherName = watcher[watcherKeys[0]];
    this._rawListener = watcher;
  }

  get name() {
    return this._watcherName;
  }

  get type() {
    return this._watcherType
  }

  get cb() {
    return this._rawListener.cb;
  }

  get raw() {
    return this._rawListener;
  }

  get keys() {
    return Object.keys(this.raw).filter((key) => key !== 'cb');
  }
}