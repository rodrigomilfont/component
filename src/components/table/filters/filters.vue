<template lang="pug">
  .filter
    span.filter-icon(
      :class="{ 'is-open': visibility }"
      v-tooltip.notrigger="{ html: id, class: 'white', visible: visibility }"
      @click="onIconClick"
    )
      i.fa.fa-filter
    div(:id="id")
      v-input(
        v-if="isInputType()"
        :filterKey="filter.key"
        :placeholder="filter.placeholder",
        :type="filter.type"
        :visibility="visibility"
      )
      v-date(
        v-if="filter.type === 'date'"
        :filterKey="filter.key"
        :locale="filter.locale"
        :format="filter.format"
      )
      v-date-range(
        v-if="filter.type === 'dateRange'"
        :keyBefore="filter.keyBefore"
        :keyAfter="filter.keyAfter"
        :locale="filter.locale"
        :paramDateFormat="filter.paramDateFormat"
        :visibility="visibility"
        @routeUpdated="toggle"
      )
      v-select(
        v-if="filter.type === 'select'"
        :filterKey="filter.key"
        :placeholder="filter.placeholder"
        :selectOptions="filter.selectOptions"
        :multiple="filter.multiple"
        :onChange="filter.onChange"
        :onSearch="filter.onSearch"
        :text="filter.text"
        :visibility="visibility"
      )
</template>

<script>
import { EventBus, EventTypes } from '../../../event_bus'
import vDate from './_date.vue'
import vDateRange from './_date_range.vue'
import vSelect from './_select.vue'
import vInput from './_input.vue'
import _ from 'lodash'
import Tooltip from 'vue-directive-tooltip'

export default {
  directives: { Tooltip },
  components: { vSelect, vInput, vDate, vDateRange },
  props: ['id', 'filter'],
  data () {
    return {
      visibility: false
    }
  },
  mounted () {
    EventBus.$on(EventTypes.body.click, function (evt) {
      if (this.$el.contains(evt.target)) { return }

      this.toggle(false)
    }.bind(this))
  },
  beforeDestroy () {
    EventBus.$off(EventTypes.body.click)
  },
  methods: {
    isInputType () {
      return _.includes(['number', 'text'], this.filter.type)
    },
    onIconClick (evt) {
      this.toggle()
    },
    toggle (value) {
      if (_.isUndefined(value)) {
        value = !this.visibility
      }

      this.visibility = value
    }
  }
}
</script>

<style lang="sass" scoped>
  @import './src/styles/utils'

  .filter
    position: relative
    display: block

  .filter-icon
    padding: 2px 5px
    display: block
    border-radius: 5px
    color: $c-clicable-secondary

    &.is-open, &:hover
      cursor: pointer
      color: $c-clicable-secondary--hover
</style>
