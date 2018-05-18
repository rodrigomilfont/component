<template lang="pug">
  .status(:class='statusClass') {{ statusValue || '-' }}
</template>

<script>
import { get, toUpper } from 'lodash'

export default {
  props: {
    model: { required: true },
    column: { required: true }
  },
  computed: {
    value () {
      return get(this.model, this.options.modelAttribute)
    },
    statusValue () {
      return toUpper(this.$i18n.t(`search_trucker.${this.value}`))
    },
    statusClass () {
      return `status-${this.value}`
    },
    options () {
      return this.column.options || {}
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  $status-bullet-size: 8px

  .panel
    padding: $default-space

  .panel-header
    margin-bottom: $default-space

  .title
    font-size: $title-font-size

    .fa
      margin-left: $tiny-space

  .cf-spinner
    padding: $default-space

  .status
    &:after
      width: $status-bullet-size
      height: $status-bullet-size
      content: ""
      display: inline-block
      margin-left: $tiny-space
      border-radius: 50%

    &.status-accepted:after
      background: $leaf-lighten-2

    &.status-pending:after
      background: $orange-lighten-2

    &.status-rejected:after
      background: $red-lighten-2
</style>
