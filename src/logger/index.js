
export default class VueWatcherLogger {
  constructor() {
    this.pluginID = '[Vue-Watcher]'
    return
  }

  warn (msg) {
    console.warn(this.pluginID, msg)
  }

  error (err) {
    throw new Error(`${this.pluginID} ${err}`)
  }

  log (msg) {
    console.warn(this.pluginID, msg)
  }
}