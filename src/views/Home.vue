<template>
  <v-app v-if="currentUser">
    <bar :currentUser="currentUser" />
    <navigation-drawer :currentUser="currentUser" />
    <v-main>
      <v-container class="py-1 px-10 v-height-100">
        <v-row class="v-height-100">
          <v-col cols="12" md="8">
            <tasks />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Tasks from '@/components/tasks/Tasks'
import { mapState } from 'vuex'
import Bar from '@/components/Bar'
import NavigationDrawer from '@/components/NavigationDrawer'

export default {
  name: 'Home',
  props: {},
  components: {
    Tasks,
    Bar,
    NavigationDrawer,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
    }),
  },
}
</script>

<style lang="scss">
.v-height-100 {
  height: 100%;
}
</style>
