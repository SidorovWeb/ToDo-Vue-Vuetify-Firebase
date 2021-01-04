<template>
  <v-dialog v-model="isActive" max-width="450px" @click:outside="closeDialog">
    <v-card>
      <v-card-title class="headline"> Создание </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="createTask">
          <v-text-field
            v-model="title"
            prepend-icon="mdi-email"
            label="Title"
          ></v-text-field>
          <v-text-field
            v-model="notes"
            prepend-icon="mdi-lock"
            label="Notes"
          ></v-text-field>
          <v-row>
            <v-col class="d-flex mt-4">
              <v-spacer></v-spacer>
              <v-btn class="white" type="submit" color="accent" rounded
                >Создать</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/dialog'
import { actionsTypes as actionsTypesTasks } from '@/store/modules/tasks'

export default {
  name: 'DialogCreateTask',
  props: {},
  data() {
    return {
      title: '',
      notes: '',
    }
  },
  computed: {
    ...mapState({
      isActive: (state) => state.dialog.isActive,
    }),
  },
  methods: {
    createTask() {
      //other codes
      this.$store
        .dispatch(actionsTypesTasks.createTask, {
          title: this.title,
          notes: this.notes,
        })
        .then(() => {
          this.$store.dispatch(actionsTypes.closeDialog)
        })
        .then(() => {
          this.$refs.form.reset()
        })
    },

    closeDialog() {
      this.$store.dispatch(actionsTypes.closeDialog)
    },
  },
}
</script>

<style lang="scss"></style>
