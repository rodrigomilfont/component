// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
//
// Vue.config.productionTip = false
//
// #<{(| eslint-disable no-new |)}>#
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })

import cxButton from './components/button/layout.vue'
import cxSpinner from './components/spinner/layout.vue'
import cxTab from './components/tabs/tabs.vue'
import cxTable from './components/table/layout.vue'

// Install the components
export function install (Vue) {
  Vue.component('cxButton', cxButton)
  Vue.component('cxSpinner', cxSpinner)
  Vue.component('cxTab', cxTab)
  Vue.component('cxTable', cxTable)
}

// Expose the components
export {
  cxTable,
  cxTab,
  cxButton,
  cxSpinner
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
