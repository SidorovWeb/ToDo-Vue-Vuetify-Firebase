<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="10">
        <v-card class="elevation-12">
          <v-row>
            <v-col class="primary rounded-l-lg" cols="12" md="4">
              <v-card-text class="white--text mt-6 mb-6">
                <h2 class="text-center font-weight-bold mb-6">
                  Hello, Friends
                </h2>
                <p class="text-center">
                  Enter your personnel details and start join
                </p>
              </v-card-text>
            </v-col>
            <v-col class="white rounded-r-lg" cols="12" sm="12" md="8">
              <v-card-text class="mt-6 mb-6">
                <h1
                  class="display-1 font-weight-bold primary--text text-center mb-6"
                >
                  Создание аккаунта
                </h1>
                <v-form ref="form" @submit.prevent="submitHandler">
                  <v-text-field
                    v-model.trim="name"
                    :rules="nameRules"
                    prepend-icon="mdi-account"
                    name="Name"
                    label="Имя"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="email"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                    name="Email"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    name="Password"
                    label="Пароль"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col class="d-flex mt-4">
                      <div class="text-center pl-3 d-flex align-center">
                        <router-link
                          class="accent--text"
                          :to="{ name: 'login' }"
                          >У меня есть аккаунта</router-link
                        >
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn
                        :loading="isSubmitting"
                        :disabled="isSubmitting"
                        class="white"
                        type="submit"
                        color="accent"
                        rounded
                        >Зарегистрироваться</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/auth'

export default {
  name: 'v-Register',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [],
    email: '',
    emailRules: [],
    password: '',
    passwordRules: [],
  }),
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  watch: {
    name() {
      this.nameRules = []
    },
    email() {
      this.emailRules = []
    },
    password() {
      this.passwordRules = []
    },
  },
  methods: {
    submitHandler() {
      this.nameRules = [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 5) || `Name must have 5+ characters`,
      ]
      this.emailRules = [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
      this.passwordRules = [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Password must have 6+ characters',
      ]

      setTimeout(() => {
        if (this.$refs.form.validate()) {
          //other codes
          this.$store
            .dispatch(actionsTypes.register, {
              name: this.name,
              email: this.email,
              password: this.password,
            })
            .then(() => {
              if (!this.validationErrors) {
                this.$router.push({ name: 'home' })
              }
            })
        }
      }, 0)
    },
  },
}
</script>

<style lang="scss"></style>
