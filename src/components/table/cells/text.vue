<template lang="pug">
  div(
    :class="options.className"
    :style="{ width: options.maxWidth + 'px' }"
    v-tooltip.top="{ content: value, delay: 0, class: options.tooltip && value ? '' : 'hidden' }"
  ) {{ value || '-' }}
</template>

<script>
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
  }
}
</script>

<style lang="sass" scoped>
  .truncate
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
</style>
