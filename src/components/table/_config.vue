<template lang="pug">
  .config
    div(v-tooltip.notrigger.bottom.end="{ html: 'table-config-panel', class: 'white table-config-tooltip', visible: panelVisibility, delay: 0, offset: 30 }")
      cx-button(
        :buttonType="'secondary'"
        :action="toggleVisibility"
      )
        | {{ $t('tables.config') }}

    #table-config-panel(v-show="panelVisibility")
      i.close-icon(class="fa fa-times pull-right" @click="toggleVisibility(false)")

      .clearfix
      .line
      .clearfix

      .columns
        draggable(
          v-model="sortableColumns"
          :options="{draggable: '.column', delay: 0}"
        )
          .column(
            v-for="(sortableColumn, index) in sortableColumns"
            key="sortableColumn.id"
            :class="[sortableColumn.visible ? '' : 'not-visible']"
          )
            .pull-left.truncate.default-margin-right
              i.visible-icon(
                class="fa fa-eye small-margin-right"
                @click="toggleColumnVisibility(sortableColumn)"
              )
              | {{ index + 1 }} - {{ sortableColumn.label }}
            .pull-right
              i.reorder-icon(class="fa fa-bars")
</template>

<script>
import { EventBus, EventTypes } from '../../event_bus'
import { isBoolean } from 'lodash'

import draggable from 'vuedraggable'
import Tooltip from 'vue-directive-tooltip'

export default {
  directives: { Tooltip },
  components: {
    draggable
  },
  props: {
    columns: { required: true }
  },
  mounted () {
    this.sortableColumns = this.columns
  },
  data () {
    return {
      panelVisibility: false,
      sortableColumns: []
    }
  },
  methods: {
    toggleVisibility (value) {
      if (!isBoolean(value)) {
        value = !this.panelVisibility
      }

      this.panelVisibility = value
    },
    toggleColumnVisibility (sortableColumn) {
      sortableColumn.visible = !sortableColumn.visible
      this.emitTableConfigChange()
    },
    emitTableConfigChange () {
      EventBus.$emit(EventTypes.tableConfig.change, this.sortableColumns)
    }
  },
  watch: {
    sortableColumns () {
      this.emitTableConfigChange()
    }
  }
}
</script>

<style lang="sass">
  .vue-tooltip.table-config-tooltip
    transform: translate3d(976px, 217px, 0px) !important

    &[x-placement^="bottom"] .tooltip-arrow
      border-width: 0 20px 20px 20px !important
      top: -20px !important
</style>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  .table-config-wrapper,
  .table-config
    width: 100%

  .config
    position: sticky
    right: 8px
    float: right
    z-index: $fixed-thead-layer + 1

  .line
    height: 2px
    background: $grey-lighten-1
    width: 100%
    margin: 0 -8px
    display: block
    position: absolute

  #table-config-panel
    min-width: 260px
    padding: 13px 0

    .close-icon
      margin: 0px 13px 17px

      &:hover
        cursor: pointer

    .truncate
      max-width: 200px
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden

    .not-visible
      color: $grey-lighten-2

      .visible-icon
        color: $grey-lighten-2 !important

    .reorder-icon
      display: none
      line-height: 20px

    .visible-icon
      color: $blue-lighten-2
      transition: all .3s

      &:hover
        cursor: pointer
        color: $blue-darken-1

    .columns
      max-height: 300px
      overflow-y: auto
      padding-top: 20px

    .column
      padding: 4px 10px
      margin-right: 15px
      display: flow-root
      font-size: $medium-font-size
      border-radius: $small-border-radius

      &:hover
        cursor: move
        background: $grey-lighten-1

        .reorder-icon
          display: block

    .close-button:hover
      cursor: pointer
</style>
