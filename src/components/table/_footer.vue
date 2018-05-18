<template lang="pug">
  tfoot.cargo-footer
    tr(v-show="count > 1")
      td.cargo-pagination.text-center(:colspan="columns.length")
        .pagination-wrapper
          cargo-paginate(
            :current-page='currentPage'
            :count='count'
          )
</template>

<script>
import CargoPaginate from './paginate.vue'

export default {
  components: { CargoPaginate },
  props: {
    columns: { required: true },
    currentPage: { required: true },
    count: { required: true }
  }
}
</script>

<style lang="sass" scoped>
  @import "./src/styles/foundation/variables"

  .cargo-footer,
  .cargo-footer tr,
  .cargo-footer td
    width: 100%
    display: block

  .pagination-wrapper
    left: 0
    position: sticky

  .cargo-footer
    height: 90px

  .cargo-pagination
    padding: 0
    border: none
    background: transparent
</style>
