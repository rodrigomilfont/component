<template lang="pug">
  div(:class="options.className")
    span(v-if="value")
      | {{ value | dateTimeFormat }}
    span(v-else)
      | -
</template>

<script>
import applicationHelper from '@/helpers/application_helper'
import { get } from 'lodash'

export default {
  props: {
    model: { required: true },
    column: { required: true }
  },
  computed: {
    value () {
      return get(this.model, this.options.modelAttribute)
    },
    options () {
      return this.column.options || {}
    }
  },
  filters: {
    dateTimeFormat: applicationHelper.dateTimeFormat.bind(applicationHelper)
  }
}
</script>
