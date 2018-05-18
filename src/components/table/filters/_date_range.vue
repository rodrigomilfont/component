<template lang="pug">
  .wrapper
    div(ref="input")
</template>

<script>
import { dateHelpers } from '../helpers/helpers'
import { daterangepicker } from '../localization/shared_pt-BR'
import moment from 'moment'
import $ from 'jquery'
import { defer, extend } from 'lodash'

const formatDate = function (value) {
  return dateHelpers.dateTimeOnTimezone(parseInt(value)).format(this.paramDateFormat)
}

export default {
  props: {
    keyBefore: { required: true },
    keyAfter: { required: true },
    locale: { required: true },
    paramDateFormat: {
      default () {
        return this.$i18n.t('app.date.formats.date')
      }
    },
    visibility: { required: true }
  },
  mounted () {
    this.$input = $(this.$refs.input)

    this.$input
      .daterangepicker({
        locale: daterangepicker,
        buttonClasses: 'btn',
        applyClass: 'btn--primary',
        cancelClass: 'hidden'
      })
      .on('apply.daterangepicker', () => {
        this.filter()
      })
  },
  beforeDestroy () {
    this.$input.daterangepicker('destroy')
  },
  watch: {
    visibility (isVisible) {
      if (!isVisible) { return }

      this.$inputData = this.$input.data('daterangepicker')

      if (this.$route.query[this.keyBefore]) {
        const dateBefore = formatDate.call(this, this.$route.query[this.keyBefore])
        this.$inputData.setEndDate(dateBefore)
      }

      if (this.$route.query[this.keyAfter]) {
        const dateAfter = formatDate.call(this, this.$route.query[this.keyAfter])
        this.$inputData.setStartDate(dateAfter)
      }

      defer(() => { this.$input.click() })
    }
  },
  methods: {
    filter () {
      const query = extend({}, this.$route.query, {
        page: 1
      })

      let afterDate = this.$inputData.startDate

      if (afterDate) {
        const date = moment(afterDate, this.paramDateFormat).startOf('day')
        query[this.keyAfter] = dateHelpers.toUTC(date).format('X')
      } else {
        delete query[this.keyAfter]
      }

      let beforeDate = this.$inputData.endDate

      if (beforeDate) {
        const date = moment(beforeDate, this.paramDateFormat).endOf('day')
        query[this.keyBefore] = dateHelpers.toUTC(date).format('X')
      } else {
        delete query[this.keyBefore]
      }

      this.$router.push({ query })
      this.$emit('routeUpdated')
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 555px
    height: 355px

  input.form-control
    width: 195px !important
</style>
