<template>
  <v-navigation-drawer app class="primary elevation-4" dark>
    <v-col cols="12">
      <v-list class="d-flex mb-6">
        <v-list-item class="px-2 d-flex justify-center">
          <v-list-item-avatar class="border mr-0" width="40px">
            <v-btn v-if="!currentUser.photo">
              <v-icon> mdi-camera-plus-outline </v-icon>
            </v-btn>
            <v-img
              v-if="currentUser.photo"
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item class="pl-1 pr-3">
          <v-list-item-content>
            <v-list-item-title class="ellipes font-weight-bold">{{
              currentUser.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="ellipes subtitle-2">{{
              currentUser.email
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-center mb-10">
        <v-btn
          depressed
          block
          rounded
          color="accent text-none"
          @click="createTask"
        >
          <v-icon left> mdi-plus </v-icon>
          Создать задачу
        </v-btn>
      </div>
    </v-col>
    <expansion-panels />
  </v-navigation-drawer>
</template>

<script>
import ExpansionPanels from '@/components/ExpansionPanels.vue'
import {
  actionsTypes as actionsDialog,
  mutationTypes,
} from '@/store/modules/dialog'

export default {
  name: 'NavigationDrawer',
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  components: {
    ExpansionPanels,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    createTask() {
      this.$store.dispatch(actionsDialog.callDialog, this.task).then(() => {
        this.$store.commit(mutationTypes.dialogName, 'createTask')
      })
    },
  },
}
</script>

<style lang="scss">
.ellipes {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}
.border {
  border: 1px solid white !important;
}
</style>
