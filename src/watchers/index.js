import Watcher from './watcher';
import { EventTypes } from '../types';

export class Watchers {
  constructor(watcherArgs) {
    this._watchers = [...watcherArgs].
      map((watcher) => new Watcher(watcher));
  }

  getInvalidArgs() {
    const invalid = [];

    const watchers = this._watchers
    for (let i = 0; i < watchers.length; i++) {

      switch (watchers[i].type) {
        case EventTypes.Action:
          /* Setup for support of {vuex: ^3.1.0} where you can specify
          an action callback `before` or `after` it occurs */

          // const keys = watchers[i].keys
          // const numKeys = keys.length;
          // if (numKeys === 1 && keys[0] !== EventTypes.Action) {
          //   invalid.push(watchers[i]);
          // } else if (
          //   (
          //     numKeys >= 3 && numKeys < 1
          //   ) &&
          //   (
          //     !keys.includes('before') || !keys.includes('after')
          //   )
          // ) {
          //   invalid.push(watchers[i]);
          // }
          // break;
        case EventTypes.Getter:
        case EventTypes.Mutation:
        case EventTypes.State:
        default:
          if (watchers[i].keys.length > 1) {
            invalid.push(watchers[i]);
          }
          break;
      }
    }

    return invalid;
  }

  get all() {
    return this._watchers;
  }

  get actions() {
    return this._watchers.filter(({ type }) => type === EventTypes.Action);
  }

  get fields() {
    return this._watchers.filter(({ type }) => type === EventTypes.State);
  }

  get getters() {
    return this._watchers.filter(({ type }) => type === EventTypes.Getter);
  }

  get mutations() {
    return this._watchers.filter(({ type }) => type === EventTypes.Mutation);  
  }
}