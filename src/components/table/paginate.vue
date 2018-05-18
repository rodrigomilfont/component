<template lang="pug">
  paginate(
    ref='_paginate'
    :page-count='count',
    :click-handler='updateRoute',
    :initial-page='page',
    :prev-text="'<'",
    :next-text="'>'",
    :container-class="containerClass"
  )
</template>

<script>
import _ from 'lodash'
import Paginate from 'vuejs-paginate'

export default {
  name: 'CargoPaginate',
  components: { Paginate },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      required: true
    },
    containerClass: {
      default: 'pagination'
    }
  },
  computed: {
    page () {
      return this.currentPage - 1
    }
  },
  methods: {
    updateRoute (page) {
      const query = _.extend({}, this.$route.query, { page: page })
      this.$router.push({ query: query })
    },
    setCurrentPage () {
      this.$refs._paginate.selected = this.page
    }
  },
  watch: {
    'currentPage' () {
      this.setCurrentPage()
    },
    '$route' () {
      this.setCurrentPage()
    }
  }
}
</script>

<style lang="sass">
  @import "./src/styles/foundation/variables"

  .pagination
    &> .active > a,
    &> .active > span,
    &> .active > a:hover,
    &> .active > span:hover,
    &> .active > a:focus,
    &> .active > span:focus
      border: 1px solid $link-primary !important
      background: $link-primary !important
      color: $white-lighten-1 !important

    &> li > a,
    &> li > span
      background: $white-lighten-1 !important
      transition: all .3s ease
      border-color: initial !important
      border: initial !important
      border:
        top: 1px solid $white-lighten-1 !important
        left: 1px solid $aqua !important
        bottom: 1px solid $white-lighten-1 !important
        right: 1px solid $white-lighten-1 !important
      color: $grey !important

      &:hover,
      &:focus,
      &:active
        outline: 0px !important;
        color: $white-lighten-1 !important
        border-color: initial !important
        border: 1px solid $link-primary !important
        background: $link-primary !important

    .disabled
      span:focus,
      &> span,
      &> span:hover,
      &> a,
      &> a:hover,
      &> a:focus
        color: $grey !important
        pointer-events: none !important
        border:
          top: 1px solid $white-lighten-1 !important
          left: 1px solid $aqua !important
          bottom: 1px solid $white-lighten-1 !important
          right: 1px solid $white-lighten-1 !important
</style>
