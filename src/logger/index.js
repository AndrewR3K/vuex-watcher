export class WatcherLogger {
  constructor() {
    this.pluginID = '[Vuex-Watcher]'
  }

  warn (msg) {
    console.warn(this.pluginID, msg)
  }

  error (err) {
    console.error(this.pluginID, err)
  }

  log (msg) {
    console.warn(this.pluginID, msg)
  }

  info(msg) {
    console.log('%c %s %s ', 'color: #2366EC;', this.pluginID, msg);
  }
}