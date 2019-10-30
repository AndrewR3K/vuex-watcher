import { Watchers } from './watchers'
import { WatcherKernel } from './kernel';
import { EventTypes } from './types';

export default class VuexWatcher extends WatcherKernel {
  constructor(opts) {
    super(opts);
    // Warn user that they are in development mode
    if (!this.isLogFriendly()) {
      this.logger.info(`You are currently in Developer Mode`)
    }

    this.watchers = new Watchers(opts.watches)
    return this.installWatchersOnStore.bind(this)
  }

  // Declare `listen_` as a function expression so that we can bind the class scope here
  installWatchersOnStore(store) {
    if (this.isLogFriendly()) {
      const invalids = this.watchers.getInvalidArgs()

      for (let watcher of this.watchers.all) {
        for (let invalid of invalids) {
          if (invalid.raw === watcher.raw) {
            this.logger.warn(`[${invalid}] ${invalid.length > 1 ? 'are not valid watcher types' : 'is not a valid watcher type'}`)
          } else {
            this.logger.info(`Watcher Enabled: (${watcher.type}) => ${watcher.name}`)
          }
        }
      }
    }

    // Install the state and getters watchers by reducing `watches` arg
    // into the `store`
    const gettersAndState = [...this.watchers.fields, ...this.watchers.getters]
    gettersAndState.reduce(this.setListenerOnStore, store)

    // Install the actions and mutations listeners
    this.setSubscriberOnStore(store, this.watchers.actions)
    this.setSubscriberOnStore(store, this.watchers.mutations)

    return store;
  }

  /**
   * This array reduce function applied when installing `getter`s and
   * `state`s into  the `store`
   * @param {Object} store The accumulator 
   * @param {Object} param1 The `watcher` argument being installed
   */
  setListenerOnStore(store, { name, type, cb }) {
    const isGetter = (type === EventTypes.Getter)

    // Install the listener in the store
    store.watch(
      (state, getters) => !(isGetter) ? state[name] : getters[name],
      (val, oldVal) => cb(val, oldVal, store.state)
    )

    // Return the `store` to pass to the next `fields` listener
    return store;
  }

  setSubscriberOnStore(store, arr) {
    const subscriber = arr[0] && arr[0].type

    if (typeof subscriber === 'string') {
      store[subscriber](function (event, state) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].name === event.type) {
            arr[i].cb(event.payload, state)
          }
        }
      })
    }
  }
}
