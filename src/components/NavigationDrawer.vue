<template>
  <v-navigation-drawer app class="primary elevation-4" dark>
    <v-col cols="12">
      <profile :currentUser="currentUser" />
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
import Profile from '@/components/user/Profile.vue'
import { actionsTypes as dialog, mutationTypes } from '@/store/modules/dialog'

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
    Profile,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    createTask() {
      this.$store.dispatch(dialog.callDialog, this.task).then(() => {
        this.$store.commit(mutationTypes.dialogName, 'createTask')
      })
    },
  },
}
</script>

<style lang="scss"></style>
