# Vuex-Watcher
![ ![Release Number]()](https://img.shields.io/badge/Release-0.0.1-%233fbced.svg) 
> Vue-Watcher was created to empower Vue.js developers to easily utilize Vuex subscribers similalr to vue's data prop watcher 

_This is compatible with Vue 2.*_

> This is an Alpha build, use at your own risk

## Table of Contents

-  [Install](#install)

-  [Usage](#usage)

-  [Build Setup](#build)


## NPM Install

```bash
$ npm install vuex-watcher
```

### Local Clone
$ git clone https://github.com/AndrewR3K/vuex-watcher.git vuex-watcher

$ cd vuex-watcher
$ npm install
```

## Usage
TODO: Write better usage docks

### Build and Start
*This is reserved for our Docker deployment system*

``` bash
$ npm install

$ npm run build

$ npm start
```

### Development

```bash
$ npm install

$ npm run dev
```

## Usage
_An in-depth example application can be found within /example folder of this repo._

### General Usage
```javascript
import VuexWatcher from 'vuex-watcher';

const watcherPlugin = new VuexWatcher({
  environment: 'development',
  watches: [
    {
      getter: 'getactive',
      cb: (val, oldVal) => console.log(`Running getters "getMsg" callback => Was: ${oldVal}, Now: ${val}`)
    }
  ]
});

store.commit('UPDATE_TEXT', 'It is Day.')
// Outputs: Running getters "getMsg" callback => Was: Night, Now: It is day.

export default new Vuex.Store({
  plugins: [watcherPlugin]
});
```

### Environment
It is recommended to set the environment to "production" when running in a production state.

Options: 'development', 'production'

```javascript
{
  environment: <environment>
}
```

### Watcher Types

#### Actions
```javascript
{
  action: 'myAction',
  cb: (payload, preState) => { /* logic */ }
}
```

#### Getters
```javascript
{
  getter: 'getactive',
  cb: (val, oldVal) => console.log(`Running getters "getMsg" callback => Was: ${oldVal}, Now: ${val}`)
}
```

#### Mutation
```javascript
{
  mutation: 'UPDATE_TEXT',
  cb: (payload, postState) => { /* logic */ }
}
```

#### State
```javascript
{
  state: 'text',
  cb: (val, oldVal) => console.log(`Running state "text" callback => Was: ${oldVal}, Now: ${val}`)
}
```

## License
