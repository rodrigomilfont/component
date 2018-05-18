<template lang="pug">
  div(:class="options.className") {{ value || '-' }}
</template>

<script>
import { each, get } from 'lodash'
import applicationHelper from '@/helpers/application_helper'

export default {
  props: {
    model: { required: true, type: Object },
    column: { required: true }
  },
  computed: {
    value () {
      const phones = get(this.model, this.options.modelAttribute)
      const formattedPhones = []

      each(phones, function (phone) {
        formattedPhones.push(applicationHelper.phoneFormat(phone.toString()))
      })

      return formattedPhones.join(', ')
    },
    options () {
      return this.column.options || {}
    }
  }
}
</script>
