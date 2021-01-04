<template>
  <v-dialog v-model="isActive" max-width="450px" @click:outside="closeDialog">
    <v-card>
      <v-card-title class="headline"> Редактирование </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent>
          <v-text-field
            v-model="task.title"
            prepend-icon="mdi-email"
            label="Title"
          ></v-text-field>
          <v-text-field
            v-model="task.notes"
            prepend-icon="mdi-lock"
            label="Notes"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog"> Agree </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/dialog'
import { actionsTypes as actionsTypesTasks } from '@/store/modules/tasks'

export default {
  name: 'DialogEditTask',
  props: {},
  computed: {
    ...mapState({
      isActive: (state) => state.dialog.isActive,
      task: (state) => state.dialog.data,
    }),
  },
  methods: {
    closeDialog() {
      this.$store.dispatch(actionsTypes.closeDialog).then(() => {
        this.$store.dispatch(actionsTypesTasks.editTask, this.task)
      })
    },
  },
}
</script>
