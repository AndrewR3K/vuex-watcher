import VueWatcherLogger from './logger'

export default class VueWatcher {
  constructor(opts) {
    this._listeners = opts.watches
    this.isprod = opts.environment === 'production'
    this.logger = new VueWatcherLogger()
    return this._install.bind(this)
  }

  _install (store) {
    const fields = []
    // Warn user that they are in development mode
    if (!this.isprod) this.logger.warn(`You are currently in Developer Mode`)
   
    // Install the state and getters listeners
    this._listeners.forEach(listen => {
      // Check if a valid type is being used
      let type = Object.getOwnPropertyNames(listen).filter(prop => prop !== 'cb')
      let validtype = (listen.state || listen.getter) && type.length === 1
      if (validtype) {
        fields.push(listen)
        if (!this.isprod) {
          this.logger.log(`Listener Enabled: (${type}) => ${listen[type]}`)
        }
      } else {
        let invalid = Object.getOwnPropertyNames(listen).filter(prop => prop !== 'cb' && prop !== 'state' && prop !== 'getter')
        if (!this.isprod) this.logger.warn(`"${invalid}" ${invalid.length > 1 ? 'are not valid watcher types' : 'is not a valid watcher type'}`)
      }
    })

    fields.reduce(this._setListener.bind(this), store)
  }

  _setListener(accumulator, { state, getter, cb }) {
    // the user is not allowed to pass both a state and a getter in one
    // `watches` entry
    if (state && getter) {
      throw this.logger.error(
        `Cannot have a watcher on both a state variable "${state}" and getters "${getter}"`
      )
    }
    // install the listener in the store
    accumulator.watch(
      (_state, _getters) => state ? _state[state] : _getters[getter],
      (_val, _oldVal) => cb(_val, _oldVal)
    )
    // return the `store` to pass to the next `fields` listener
    return accumulator
  }
}