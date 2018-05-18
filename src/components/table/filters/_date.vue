<template lang="pug">
  .wrapper
    div(ref="input")
</template>

<script>
import moment from 'moment'
import $ from 'jquery'
import { extend } from 'lodash'

export default {
  props: {
    filterKey: {
      required: true
    },
    locale: {
      required: true
    },
    format: {
      required: true
    }
  },
  mounted () {
    this.$input = $(this.$refs.input)

    this.$input
      .datepicker({
        format: this.format,
        language: this.locale
      })
      .on('changeDate', function () {
        const timestamp = moment(this.$input.datepicker('getFormattedDate')).format('X')
        this.updateRoute(timestamp)
      }.bind(this))
  },
  beforeDestroy () {
    this.$input.datepicker('destroy')
  },
  methods: {
    updateRoute (timestamp) {
      const query = extend({}, this.$route.query, {
        page: 1
      })

      if (timestamp) {
        query[this.filterKey] = timestamp
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
    width: 215px

  input.form-control
    width: 170px !important
</style>
