<template lang="pug">
  span.spinner(:class="type")
</template>

<script>
export default {
  props: {
    type: { default: 'primary', type: String }
  }
}
</script>

<style scoped lang="sass">
  @import "./src/styles/utils.sass"

  $spinner-primary-border-color: $blue
  $spinner-secondary-border-color: $white

  @keyframes spinner
    to
      transform: rotate(360deg)

  .spinner
    &:before
      content: ''
      box-sizing: border-box
      position: absolute
      top: 50%
      left: 50%
      width: 20px
      height: 20px
      margin-top: -10px
      margin-left: -10px
      border-radius: 50%
      border: 2px solid transparent
      animation: spinner .8s ease infinite

    &.primary:before
      border-top-color: $spinner-primary-border-color
      border-bottom-color: $spinner-primary-border-color

    &.secondary:before
      border-top-color: $spinner-secondary-border-color
      border-bottom-color: $spinner-secondary-border-color
</style>
