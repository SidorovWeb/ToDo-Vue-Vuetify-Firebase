<template>
  <v-app class="pantone lighten-3">
    <router-view></router-view>
    <dialogs />
    <alert :validationErrors="validationErrors" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Alert from '@/components/Alert'
import Dialogs from '@/components/dialogs/Dialogs'

export default {
  name: 'App',
  components: {
    Alert,
    Dialogs,
  },
  computed: {
    ...mapState({
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  watch: {
    validationErrors() {
      setTimeout(() => {
        this.$store.state.auth.validationErrors = null
      }, 5000)
    },
  },
}
</script>

<style lang="scss">
body {
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
}
</style>
