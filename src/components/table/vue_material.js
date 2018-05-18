import VueMaterial from 'vue-material/vue-material'

export default function (Vue) {
  Vue.use(VueMaterial)

  Vue.material.registerTheme('default', {
    accent: 'blue',
    primary: 'blue',
    warn: 'orange'
  })
}
