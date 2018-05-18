<template lang="pug">
  .wrapper
    v-select.cf-trucker-tracking--select-client(
      ref="select"
      v-model="selectValue"
      :options="displayedOptions"
      :placeholder="placeholder"
      :multiple="multiple"
      :on-search="search"
      :on-change="filter"
    )
      span(slot="no-options" v-if="noOptionsMessage") {{ noOptionsMessage }}
</template>

<script>
import vSelect from 'vue-select'
import { UI } from '../constants/ui'
import $ from 'jquery'
import { some, has, lowerCase, debounce, extend } from 'lodash'

export default {
  props: {
    filterKey: { required: true },
    selectOptions: { required: true },
    visibility: { required: false },
    multiple: { required: false, default: false },
    onSearch: { required: false },
    onChange: { required: false }
  },
  components: { vSelect },
  data () {
    return {
      selectValue: null,
      isLoading: false,
      searchTerm: '',
      text: {
        loading: this.$i18n.t('app.loading'),
        empty: this.$i18n.t('app.no_results'),
        search: this.$i18n.t('app.vselect_search')
      },
      placeholder: this.$i18n.t('app.filter')
    }
  },
  computed: {
    noOptionsMessage () {
      if (this.isLoading) { return this.text.loading }

      const hasOptions = some(this.displayedOptions, (option) => {
        return option.value === this.searchTerm
      })

      if (!hasOptions) {
        return this.text.empty
      }

      return this.text.search
    },
    displayedOptions () {
      let options

      /*
          * @INTENT if a callback for onSearch is passed, that means that
          * the current input is remote, if that is the case, filter the options
          * by the search term, otherwise just display the passed options.
        */
      if (typeof this.onSearch === 'function') {
        options = this.selectOptions.filter(function (option) {
          return lowerCase(option.label).includes(lowerCase(this.searchTerm))
        }.bind(this))
      } else {
        options = this.selectOptions
      }

      return options
    }
  },
  mounted () {
    this.setInicialInputState()

    this.watchVSelectOpen(this.addTooltipOnTruncatedOptions)
  },
  watch: {
    visibility (isVisible) {
      if (isVisible) {
        this.$refs.select.$refs.search.focus()
        this.setInicialInputState()
      }
    },
    selectOptions () {
      this.isLoading = false

      this.$nextTick(this.addTooltipOnTruncatedOptions)
    }
  },
  methods: {
    search: debounce(function (value) {
      this.searchTerm = value

      if (!this.onSearch) { return }

      this.isLoading = true

      this.onSearch(this.searchTerm)
    }, UI.TYPING_DELAY),
    setInicialInputState () {
      if (!this.$route.query[this.filterKey]) {
        this.$set(this, 'selectValue', this.multiple ? [] : null)
      }
    },
    updateRoute (params) {
      const query = extend({}, this.$route.query, {
        page: 1
      })

      if (params.value) {
        query[this.filterKey] = params.value
      } else {
        delete query[this.filterKey]
      }

      this.$router.push({ query })

      this.$emit('routeUpdated')
    },
    filter (params) {
      if (!this.multiple && !has(params, 'value')) { return }

      if (this.onChange) {
        this.onChange(params)
      } else {
        this.updateRoute(params)
      }
    },
    watchVSelectOpen (callback) {
      this.$nextTick(() => {
        new MutationObserver((e) => {
          let isClassChanged = e[0].attributeName === 'class'
          let isOptionsOpened = $(this.$refs.select.$el).hasClass('open')

          if (isClassChanged && isOptionsOpened) {
            callback()
          }
        }).observe(this.$refs.select.$el, {
          'attributes': true
        })
      })
    },
    /**
      * @WARNING the ugly code here and in the function "watchVSelectOpen" is to
      * dinamically add a tooltip in each option that has truncated text because
      * it's too long. Blame v-select for not providing any way to show option
      * labels longer than select width.
      */
    addTooltipOnTruncatedOptions () {
      $(this.$refs.select.$el).find('.dropdown-menu > li > a').each(function () {
        let isOptionTextTruncated = this.offsetWidth < this.scrollWidth

        if (isOptionTextTruncated && !$(this).attr('title')) {
          $(this).attr('title', $(this).text().trim())
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 250px
</style>
