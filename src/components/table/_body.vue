<template lang="pug">
  tbody.cargo-tbody(v-if="collection.length")
    tr.cargo-tr(v-for="model in collection" :key="model[primaryKey]" :class="{'is-clickable': isClickable}", @click="onCellClickCallback(model)")
      td.cargo-td(v-for="column in columns" v-if="column.visible")
        component(
          v-if="hasPermission(column)"
          :is="column.cell"
          :model="model"
          :column="column"
        )

  tbody.cargo-tbody(v-else)
    tr.cargo-tr
      td.cargo-td(:colspan="columns.length")
        .blank-state-wrapper.text-center
          .default-margin.clearfix
            img(src='', alt='Filter')
          | {{ $t('app.table_no_results') }}
</template>

<script>
import { has, isFunction } from 'lodash'

export default {
  props: {
    columns: { required: true },
    collection: { required: true },
    onCellClick: { required: false, type: Function },
    primaryKey: { required: false, type: String }
  },
  computed: {
    isClickable () {
      return this.onCellClick
    }
  },
  methods: {
    onCellClickCallback (model) {
      if (!this.isClickable) { return }

      this.onCellClick(model)
    },
    hasPermission (column) {
      if (!has(column, 'permission')) {
        return true
      }

      if (isFunction(column.permission)) {
        return column.permission()
      }

      return !!column.permission
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  $td-min-width: 120px
  $td-padding: 10px 8px
  $td-border-thickness: 1px
  $td-border: $td-border-thickness solid $dark-aqua

  .blank-state-wrapper
    margin: 50px 0

  .cargo-tbody
    display: table

    &:before
      content: ""
      display: block
      color: transparent

  .cargo-tr
    background: $white-lighten-1

    &:last-child
      .cargo-td
        border-bottom: $td-border

    &.is-active
      .cargo-td
        background: $light-aqua

    &.is-clickable:hover
      cursor: pointer

      .cargo-td
        background: $light-aqua

  .cargo-td
    padding: $td-padding
    border-bottom: $td-border
    vertical-align: middle !important
    min-width: $td-min-width

    &:first-child
      border-left: $td-border

    &:last-child
      border-right: $td-border
</style>
