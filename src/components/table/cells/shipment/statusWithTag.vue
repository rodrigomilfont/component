<template lang="pug">
  status(show-tag='true' :model='model' :column='column')
</template>

<script>
import Status from './status.vue'

export default {
  components: { Status },
  props: {
    model: { required: true },
    column: { required: true }
  }
}
</script>
