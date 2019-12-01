import Vue from 'vue'

require("@/styles/base.css")
require("@/styles/transitions.css")
require("@/components.js")

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
