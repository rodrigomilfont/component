<template lang="pug">
  thead.cargo-thead
    tr.cargo-tr.table-config-wrapper
      th.cargo-th.table-config(:colspan="columns.length" v-if="enableColumnsConfig")
        table-config(:columns="columns")
    tr.cargo-tr.columns-wrapper
      th.cargo-th.column(
        :key="`header_${column.id}`"
        v-for="column in columns"
        v-if="column.visible"
      )
        .cell(:class="{ 'has-filter': column.filter }")
          span.text {{ column.label }}
          span.filter(v-if="column.filter")
            cargo-filter(
              :id="`filter_${column.id}`"
              :filter="column.filter"
            )
</template>

<script>
import TableConfig from './_config.vue'
import CargoFilter from './filters/filters.vue'

export default {
  components: { TableConfig, CargoFilter },
  props: {
    columns: { required: true, type: Array },
    enableColumnsConfig: { default: false, type: Boolean }
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  $cell-padding-sides: 10px

  .cargo-th.table-config
    padding: 6px !important
    background: $white-lighten-1

  .cargo-thead
    display: block
    position: sticky
    top: 0
    z-index: $fixed-thead-layer

  .cargo-th
    background: $aqua
    font-weight: normal
    vertical-align: middle !important
    padding: $cell-padding-sides 8px !important
    font-weight: $font-semi-bold
    line-height: 19px !important
    border:
      bottom: 1px solid $dark-aqua !important
      top: 1px solid $dark-aqua !important
      right: 1px solid $dark-aqua !important

    &:first-child
      border-left: 1px solid $dark-aqua

  .cell
    position: relative
    display: flex
    align-items: center

    &.has-filter
      padding-right: $cell-padding-sides + 15px

  .filter
    width: 15px
    position: absolute
    right: 0
    color: $blue
    transition: color .3s
    top: -1px

    &:hover
      cursor: pointer
      color: $medium-blue
</style>
