<template>
  <v-card dark class="tasks rounded-lg" height="100%">
    <v-list flat>
      <v-subheader>Задания</v-subheader>
      <v-list-item-group color="info">
        <task v-for="(task, i) in getTasks" :key="i" :task="task" />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { actionsTypes } from '@/store/modules/tasks'
import Task from '@/components/tasks/Task.vue'

export default {
  name: 'Tasks',
  components: {
    Task,
  },
  computed: {
    ...mapGetters(['getTasks']),
  },
  mounted() {
    this.$store.dispatch(actionsTypes.fetchTasks)
  },
}
</script>

<style lang="scss">
.tasks {
  & .v-list-item-group {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
