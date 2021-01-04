<template>
  <v-dialog v-model="isActive" max-width="400px" @click:outside="closeDialog">
    <v-card>
      <v-card-title class="font-weight-bold title">Ваше имя </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="updateName">
          <v-text-field
            class="border-none font-weight-bold headline pt-0 mt-0"
            color="accent"
            v-model="user.name"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-0 elevation-5">
        <v-btn
          class="text-none font-weight-bold subtitle-1"
          height="54px"
          style="flex: 1 1 100%"
          text
          @click="closeDialog"
        >
          Отменить
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn
          class="text-none font-weight-bold subtitle-1"
          height="54px"
          style="flex: 1 1 100%"
          color="accent"
          type="submit"
          text
          :loading="isSubmitting"
          :disabled="isSubmitting"
          @click="updateName"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/dialog'
import { actionsTypes as profile } from '@/store/modules/profile'

export default {
  name: 'DialogUpdateName',
  computed: {
    ...mapState({
      isActive: (state) => state.dialog.isActive,
      isSubmitting: (state) => state.profile.isSubmitting,
      user: (state) => state.auth.currentUser,
    }),
  },
  methods: {
    closeDialog() {
      this.$store.dispatch(actionsTypes.closeDialog)
    },
    updateName() {
      this.$store.dispatch(actionsTypes.closeDialog).then(() => {
        this.$store.dispatch(profile.updateUser, this.user)
      })
    },
  },
}
</script>

<style lang="scss">
.border-none {
  & .v-input__slot::before {
    border: none !important;
  }
}
</style>
