<template lang="pug">
  ul.tabs
    li.tab(
      v-for="tab in collection"
      @click="updateRoute(tab.param)"
      :class="{ 'active': tab.is_active }"
      :id="tab.id"
      :key="tab.param"
    ) {{ tab.label }}
</template>

<script>
import { each, first } from 'lodash'

export default {
  props: {
    collection: { required: true, type: Array },
    callback: { required: true, type: Function }
  },
  mounted () {
    this.toggleTab(this.$route.query.filter)
  },
  watch: {
    '$route' (route) {
      this.toggleTab(route.query.filter)
    }
  },
  methods: {
    toggleTab (tabParam) {
      const tab = this.collection.filter((tab) => (tab.param === tabParam))

      if (tab.length === 0) {
        tab.push(first(this.collection))
      }

      each(this.collection, function (tab) { tab.is_active = false })

      const uniqueTab = tab.reduce((tab) => tab)

      uniqueTab.is_active = true

      if (uniqueTab.action) {
        uniqueTab.action()
      }

      this.callback(uniqueTab)
    },
    updateRoute (filter) {
      this.$router.push({ query: { filter } })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  .tabs
    width: 100%
    padding: 0
    margin: 0 0 $default-space 0
    border-bottom: 0
    font-size: $normal-font-size

    .tab
      display: inline-block
      padding: 0 0 $small-space 0
      margin-right: $default-space
      cursor: pointer
      list-style: none

    .tab,
    .tab.active,
    .tab:hover,
      color: $grey-darken-2
      font-weight: $font-semi-bold
      border: 0
      background: transparent

    .tab.active
      color: $link-primary
      border-bottom: 2px solid $link-primary
</style>
