<template lang="pug">
  button(
    class="cx-button"
    :class="disabled ? 'disabled' : buttonType"
    :disabled="disabled"
    @click="onClick"
  )
    slot
</template>

<script>
  export default {
    props: {
      action: { required: false, type: Function },
      disabled: { default: false, type: Boolean },
      buttonType: { default: 'primary', type: String }
    },
    methods: {
      onClick () {
        if (!this.action) { return false }

        this.action()
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "./src/styles/utils.sass"

  $btn-primary-height: 38px

  $btn-primary-font-color: $white
  $btn-primary-bg: $blue
  $btn-primary-hover-bg: $blue-darken-1
  $btn-primary-active-bg: $blue-darken-2
  $btn-primary-focus-bg: $blue-darken-2

  $btn-secondary-font-color: $black
  $btn-secondary-bg: $grey-lighten-4
  $btn-secondary-hover-bg: $grey-lighten-3
  $btn-secondary-active-bg: $grey-lighten-2
  $btn-secondary-focus-bg: $grey-lighten-2

  $btn-danger-font-color: $white
  $btn-danger-bg: $red
  $btn-danger-hover-bg: $red-darken-1
  $btn-danger-active-bg: $red-darken-2
  $btn-danger-focus-bg: $red-darken-2

  $btn-disabled-font-color: $grey-lighten-2
  $btn-disabled-bg: $grey-lighten-5

  .cx-button
    display: inline-block
    border-radius: 4px
    font-family: $app-font-family
    font-size: $medium-font-size
    font-weight: 500
    font-style: normal
    font-stretch: normal
    letter-spacing: normal
    border: 0
    text-transform: uppercase
    padding: 0 20px
    height: $btn-primary-height
    line-height: $btn-primary-height
    outline: none
    text-align: center
    touch-action: manipulation
    transition: .3s ease-out
    white-space: nowrap

    span
      line-height: $btn-primary-height

    &.primary
      background: $btn-primary-bg
      color: $btn-primary-font-color

      &:hover
        background: $btn-primary-hover-bg

      &:active
        background: $btn-primary-active-bg

      &:focus
        background: $btn-primary-focus-bg

    &.secondary
      background: $btn-secondary-bg
      color: $btn-secondary-font-color

      &:hover
        background: $btn-secondary-hover-bg

      &:active
        background: $btn-secondary-active-bg

      &:focus
        background: $btn-secondary-focus-bg

    &.danger
      background: $btn-danger-bg
      color: $btn-danger-font-color

      &:hover
        background: $btn-danger-hover-bg

      &:active
        background: $btn-danger-active-bg

      &:focus
        background: $btn-danger-focus-bg

    &.disabled
      user-select: none
      background: $btn-disabled-bg
      color: $btn-disabled-font-color
</style>
