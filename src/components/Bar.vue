<template>
  <v-app-bar
    class="v-AppBar"
    height="90px"
    color="transparent"
    app
    dark
    elevation="0"
  >
    <v-btn v-if="$route.path !== '/'" icon @click="goHome">
      <v-icon>mdi-keyboard-backspace</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <div
      class="v-AppBar__controls d-flex primary rounded-pill px-8 elevation-2"
    >
      <v-menu
        dark
        offset-y
        nudge-bottom="10px"
        min-width="400px"
        transition="scroll-y-reverse-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <v-list color="primary">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn fab icon small>
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <v-btn fab icon small @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-text-field
        class="v-AppBar__expanding-search"
        :class="{ closed: searchClosed }"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        placeholder="Filled"
        filled
        hide-details
        dense
        clearable
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </div>
  </v-app-bar>
</template>

<script>
import { actionsTypes } from '@/store/modules/auth'
export default {
  name: 'Bar',
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchClosed: true,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push({ name: 'home' })
      }
    },
    logout() {
      this.$store
        .dispatch(actionsTypes.logout)
        .then(() => this.$router.push({ name: 'login' }))
    },
  },
}
</script>

<style lang="scss">
.v-AppBar {
  &__expanding-search {
    width: 300px;
    transition: width 0.3s;
    .v-input__slot {
      cursor: pointer !important;
      &:before,
      &:after {
        border-style: none !important;
        border-color: transparent !important;
      }
    }
    &.closed {
      width: 40px;
      .v-input__slot {
        background: transparent !important;
      }
    }
  }
}
</style>
