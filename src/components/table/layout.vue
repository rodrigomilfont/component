<template lang="pug">
  .cargo-table-wrapper(ref="wrapper")
    table.cargo-table(
      ref="table"
      :class="styleClass"
    )
      table-header(
        :columns="columns"
        :enableColumnsConfig="enableColumnsConfig"
      )
      table-body(
        :columns="columns"
        :collection="collection"
        :on-cell-click="onCellClick"
        :primary-key="primaryKey"
      )
      table-footer(
        :columns="columns"
        :count="count"
        :current-page="currentPage"
      )
</template>

<script>
import $ from 'jquery'
import { EventTypes, EventBus } from '../../event_bus'
import { debounce, defer } from 'lodash'

import TableHeader from './_header.vue'
import TableBody from './_body.vue'
import TableFooter from './_footer.vue'

export default {
  components: { TableHeader, TableBody, TableFooter },
  props: {
    columns: { required: true },
    collection: { required: true },
    count: { required: true },
    currentPage: { required: true },
    enableColumnsConfig: { default: false, type: Boolean },
    styleClass: { required: false, type: String },
    onCellClick: { required: false, type: Function },
    options: { required: false, type: Object },
    primaryKey: { required: false, type: String }
  },
  mounted () {
    console.log('mounted', this, arguments)
    this.setColumnsWidth()

    EventBus.$on(EventTypes.tableConfig.change, this.setColumnsWidth)
  },
  watch: {
    collection () {
      this.setColumnsWidth()
    }
  },
  methods: {
    setColumnsWidth: debounce(function (text) {
      console.log('setColumnsWidth', this, arguments)

      const $wrapper = $(this.$refs.wrapper)
      const $table = $(this.$refs.table)

      $wrapper.removeClass('has-overflow')

      $wrapper.toggleClass('has-overflow', $table.width() > $wrapper.width())
      $table.toggleClass('is-empty', !this.collection.length)

      defer(() => {
        if (!this.collection.length) {
          $table.find('.cargo-tbody').css('min-width', $table.find('.columns-wrapper').width())
          $table.find('.cargo-thead').css('min-width', $table.find('.columns-wrapper').width())
        } else {
          $table.find('.cargo-th.column').each(function (index, th) {
            let correspondingTdWidth = $table.find('.cargo-td').eq(index).outerWidth()
            $(th).css('min-width', correspondingTdWidth)
          })
        }
      })
    })
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  $td-border-thickness: 1px
  $td-border: $td-border-thickness solid $dark-aqua

  .cargo-table-wrapper
    width: 100%

    &:not(.has-overflow)
      /deep/ .cargo-table
        display: block

      /deep/ .cargo-tr,
      /deep/ .cargo-tbody
        width: 100%

      /deep/ .pagination-wrapper
        width: 100%

    &.has-overflow
      overflow-x: auto

      /deep/ .pagination-wrapper
        width: calc(100vw - 90px)

      /deep/ .cargo-tr,
      /deep/ .cargo-tbody
        table-layout: fixed

  .cargo-table
    width: 100%
    white-space: nowrap

    /deep/ th,
    /deep/ th,
    /deep/ td
      font-size: $medium-font-size

    &.is-empty
      /deep/ .cargo-tr,
      /deep/ .cargo-tbody
        display: table

    &.striped td
      border-left: $td-border

  /deep/ .cargo-table--truncate-text
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
