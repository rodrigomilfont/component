// import material from './material'
// import * as Components from './src/components'
//
// let vueComponents = Vue => {
//   Object.values(Components).forEach((Components) => {
//     Vue.use(Components)
//   })
// }
//
// // Components.version = '__VERSION__'
//
// export default vueComponents

import Wel from './src/components/HelloWorld'
import CxSpinner from './src/components/spinner/layout';
import CxButton from './src/components/button/layout';

// Install the components
export function install (Vue) {
  Vue.component('Wel', Wel)
  Vue.component('CxSpinner', CxSpinner)
  Vue.component('CxButton', CxButton)
}

// Expose the components
export {
  CxButton,
  CxSpinner,
  Wel
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: '0.0.0',
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


// export { default } from './dist/components'
// export * from './dist/components'
// import './dist/component.min.css'
