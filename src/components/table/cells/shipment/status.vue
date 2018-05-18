<template lang="pug">
  .inner(:class="{ 'has-information' : hasShipmentBox, 'can-show-tag': showTag}")
    .status(@click="onPillClick" :class="statusClasses(model)" :title='$t(statusHint(model))')
      span.tag(v-if='tag') {{ tag }}
      span.text {{ situation }}
      i.edit(class="fa fa-edit")

    .information(v-if="hasShipmentBox")
      span.icon(
        class="fa fa-info-circle"
        :class="{ 'is-open': visibility }"
        v-tooltip.notrigger="{ html: cellId, class: 'muggie', visible: visibility }"
        @click="onIconClick"
      )
      shipment-status(
        :id="cellId"
        :history="shipment.status_history"
      )
</template>

<script>
import ShipmentStatus from '@/components/shipment_status'
import ToggleVisibilityMixin from '@/mixins/toggle_visibility'
import ShipmentStatusMixin from '@/mixins/shipment/status'

import { EventBus } from '../../event_bus'

import { last, get } from 'lodash'

export default {
  props: {
    model: { required: true },
    column: { required: true },
    showTag: { default: false }
  },
  components: { ShipmentStatus },
  mixins: [
    ShipmentStatusMixin,
    ToggleVisibilityMixin
  ],
  data () {
    return {
      visibility: false
    }
  },
  computed: {
    situation () {
      const lastStatus = last(this.shipment.status_history)
      const translation = get(lastStatus, 'status', 'not-found')

      return this.$t(`shipment.status.${translation}`)
    },
    cellId () {
      return `status-box-${this.shipment.id}`
    },
    hasShipmentBox () {
      return get(this.column, 'options.hasShipmentBox', false)
    },
    shipment () {
      return this.model
    },
    tag () {
      if (!this.showTag || !this.shipment.pre_accepted) return null

      return this.$t('shipment.pre_accepted_tag')
    }
  },
  methods: {
    onPillClick () {
      const event = get(this.column, 'options.event', null)

      if (event) {
        EventBus.$emit(event, this.model)
      }
    },
    onIconClick () {
      // mixin's method
      this.toggleVisibility()
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"
  @import "./src/styles/utils"

  $b-height: 27px
  $b-line-height: $b-height - 1
  $b-margin: $tiny-space

  $hidden-position: -300%
  $show-position: 0

  // --------
  // Colors
  // --------

  // Red
  $c-background-red: #fae2e4
  $c-text-red: #f13f4b

  // Grey
  $c-background-grey: #eceff1
  $c-text-grey: #b0bec5

  // Blue
  $c-background-blue: #e9f3ff
  $c-text-blue: #4285f4

  // Green
  $c-background-green: #e1f7e1

  .inner
    height: $b-height
    white-space: nowrap
    min-width: 150px

    &.can-show-tag
      min-width: 220px

    &.has-information
      .status
        width: calc(100% - #{($b-margin * 2) + 20})

  .information
    display: inline-block
    position: relative
    margin-left: 8px
    color: $grey-darken-1
    margin-top: 3px

  .status
    border-radius: 100px
    cursor: pointer
    display: inline-block
    float: left
    height: $b-height
    overflow: hidden
    padding: 0 $b-margin
    position: relative
    width: 100%

    .text,
    .edit
      +centralize-horizontally
      height: $b-height
      line-height: $b-line-height
      transition: all .4s
      position: absolute

    .edit
      line-height: $b-height + 1
      bottom: $hidden-position

    .text
      line-height: $b-line-height
      font-size: $medium-font-size
      top: $show-position

    &:hover
      .edit
        bottom: $show-position

      .text
        top: $hidden-position

  .icon
    display: inline-block
    position: relative
    cursor: pointer
    color: $blue

    &.is-open,
    &:hover
      cursor: pointer
      opacity: .7

  .cell
    padding: 0
    text-align: center
    position: relative

  .status
    background-color: $c-background-blue
    border: 1px solid $c-text-blue
    .tag
      background-color: $c-text-blue

    &.status--scheduled
      background-color: $c-background-grey
      border-color: $c-text-grey
      .tag
        background-color: $c-text-grey

    &.status--done
      background-color: $c-background-green
      border-color: $leaf-lighten-2
      .tag
        background-color: $leaf-lighten-2

    &.status--delayed
      background-color: $c-background-red
      border-color: $c-text-red
      .tag
        background-color: $c-text-red

  .tag
    position: absolute
    left: 0
    top: 0
    font-weight: $font-semi-bold
    line-height: $b-height - 1px
    padding-left: $tiny-space + 2px
    padding-right: $tiny-space
    font-size: $legend-font-size
    color: $white-lighten-1
</style>
