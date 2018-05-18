<template lang="pug">
  form.wrapper(@submit="onSubmit")
    .pull-left
      input.form-control(
        v-if="type === 'text'"
        ref="input"
        type="text"
        :placeholder="placeholder"
        v-model.[type]="value"
      )
      input.form-control(
        v-if="type === 'number'"
        ref="input"
        type="number"
        :placeholder="placeholder"
        v-model.[type]="value"
      )
    cx-button.pull-right(:action="filter")
      span.material-icon check
</template>

<script>
import { extend } from 'lodash'

export default {
  props: ['filterKey', 'placeholder', 'visibility', 'type'],
  data () {
    return {
      value: this.$route.query[this.filterKey]
    }
  },
  watch: {
    '$route': 'onRouteChange',
    visibility (isVisible) {
      if (isVisible) {
        this.$refs.input.focus()
      }
    }
  },
  methods: {
    onRouteChange () {
      this.value = this.$route.query[this.filterKey]
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.filter()
    },
    updateRoute () {
      const query = extend({}, this.$route.query, {
        page: 1
      })

      if (this.value) {
        query[this.filterKey] = this.value
      } else {
        delete query[this.filterKey]
      }

      this.$router.push({ query })
    },
    filter () {
      this.$emit('routeUpdated')
      this.updateRoute()
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 250px

  input.form-control
    width: 175px !important
</style>
