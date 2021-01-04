<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title v-text="task.title"></v-list-item-title>
      <hr />
      <span>{{ task.notes }}</span>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon>
        <v-icon @click="editTask" color="grey lighten-1">mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn icon @click="deleteTask">
        <v-icon color="grey lighten-1">mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { actionsTypes } from '@/store/modules/tasks'
import {
  actionsTypes as actionsDialog,
  mutationTypes,
} from '@/store/modules/dialog'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch(actionsTypes.deleteTask, this.task.id)
    },

    editTask() {
      this.$store.dispatch(actionsDialog.callDialog, this.task).then(() => {
        this.$store.commit(mutationTypes.dialogName, 'editTask')
      })
    },
  },
}
</script>
