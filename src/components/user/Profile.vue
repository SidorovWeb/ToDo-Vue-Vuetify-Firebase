<template>
  <v-list class="d-flex mb-6 profile">
    <v-list-item class="px-2 d-flex justify-center">
      <v-list-item-avatar class="border mr-0" width="40px">
        <v-btn v-if="!currentUser.photo">
          <v-icon class="profile__icon"> mdi-camera-plus-outline </v-icon>
        </v-btn>
        <v-img
          v-if="currentUser.photo"
          src="https://randomuser.me/api/portraits/women/85.jpg"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-hover v-slot="{ hover }">
      <v-list-item class="pl-1 pr-5">
        <v-list-item-content>
          <v-list-item-title class="mb-0">
            <v-btn
              class="px-0 text-none no-background-hover"
              style="height: auto"
              text
              @click="updateName"
            >
              <span
                class="font-weight-bold subtitle-1 px-0 text-none ellipes"
                >{{ currentUser.name }}</span
              >
            </v-btn>
          </v-list-item-title>
          <v-list-item-subtitle class="ellipes subtitle-2 font-weight-thin">{{
            currentUser.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-fade-transition>
          <div v-if="hover" style="position: absolute; right: 0; top: 0">
            <v-btn fab x-small color="transparent" @click="updateName">
              <v-icon color="accent"> mdi-pencil </v-icon>
            </v-btn>
          </div>
        </v-fade-transition>
      </v-list-item>
    </v-hover>
  </v-list>
</template>

<script>
import { actionsTypes as dialog, mutationTypes } from '@/store/modules/dialog'

export default {
  name: 'Profile',
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateName() {
      this.$store.dispatch(dialog.callDialog, this.task).then(() => {
        this.$store.commit(mutationTypes.dialogName, 'updateName')
      })
    },
  },
}
</script>

<style lang="scss">
.profile {
  &__icon {
    font-size: 20px !important;
  }
}

.ellipes {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 130px;
}
.border {
  border: 1px solid white !important;
}

.no-background-hover::before {
  background-color: transparent !important;
}
</style>
