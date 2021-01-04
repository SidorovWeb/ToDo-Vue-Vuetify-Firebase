<template>
  <div>
    <dialog-edit-task v-if="dialog === 'editTask'"></dialog-edit-task>
    <dialog-create-task v-if="dialog === 'createTask'"></dialog-create-task>
    <dialog-update-name v-if="dialog === 'updateName'"></dialog-update-name>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogEditTask from '@/components/dialogs/DialogEditTask'
import DialogCreateTask from '@/components/dialogs/DialogCreateTask'
import DialogUpdateName from '@/components/dialogs/DialogUpdateName'

export default {
  name: 'Dialogs',
  components: {
    DialogEditTask,
    DialogCreateTask,
    DialogUpdateName,
  },
  computed: {
    ...mapState({
      dialog: (state) => state.dialog.dialog,
    }),
  },
}
</script>
