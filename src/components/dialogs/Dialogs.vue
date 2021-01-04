<template>
  <div>
    <dialog-edit-task v-if="dialog === 'editTask'"></dialog-edit-task>
    <dialog-create-task v-if="dialog === 'createTask'"></dialog-create-task>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogEditTask from '@/components/dialogs/DialogEditTask'
import DialogCreateTask from '@/components/dialogs/DialogCreateTask'

export default {
  name: 'Dialogs',
  components: {
    DialogEditTask,
    DialogCreateTask,
  },
  computed: {
    ...mapState({
      dialog: (state) => state.dialog.dialog,
    }),
  },
}
</script>
