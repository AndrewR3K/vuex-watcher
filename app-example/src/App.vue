<template>
  <div id="app">
    <div>
      <img src="./assets/logo.png" alt="vuex-watcher">
      <h1>Vuex-Watcher</h1>
    </div>
    <div>
      <h3><i>Watchers can be observed within the browser console</i></h3>
    </div>
    <section class="getter-example container">
      <h2>Getter Example</h2>
      <div class="sub-title">state.active: {{getactive}}</div>
      <div class="button" @click="toggle()">Toggle</div>
    </section>
    <section class="state-example container">
      <h2>State Example</h2>
      <div class="sub-title">state.text: {{gettext}}</div>
      <div><input type="text" v-model="text" placeholder="Enter some text"></div>
      <div class="button" @click="updateText(text)">Update</div>
    </section>
    <div id="footer">
      Made with <img src="./assets/heart.png" alt="love"/> from San Jose, Ca 
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    ...mapActions([
      'toggle',
      'updateText'
    ])
  },
  computed: {
    ...mapGetters([
      'getactive',
      'gettext'
    ])
  }
}
</script>

<style>
html, body {
  background-color: rgb(104, 104, 104);
  color: #efefef;
  font-size: 20px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.container {
  border: #40B883 4px solid;
  border-radius: 8px;
  max-width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
}

.container h2 {
  margin: 0;
  padding: 0;
  background-color: #40B883;
}

input {
  background-color: #efefef;
  width: 100%;
  border: none;
  margin: 0;
  height: 30px;
  font-size: 20px;
  text-align: center;
}

.button {
  border: #35495E 4px solid;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #35495E;
  transition: all .3s ease;
}

.button:hover {
  opacity: .7;
  cursor: pointer;
  outline: none;
  transition: all .3s ease;
}

.sub-title {
  margin: 20px;
}

#footer {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}

#footer img {
  width: 16px;
  font-size: 10px;
}
</style>
