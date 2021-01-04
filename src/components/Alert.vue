<template>
  <v-alert
    class="fixed-alert"
    transition="slide-x-reverse-transition"
    type="error"
    max-width="400px"
    min-height="50px"
    width="100%"
    elevation="2"
    dismissible
    :value="validationErrors ? true : false"
    >{{ validationErrors }}</v-alert
  >
</template>

<script>
export default {
  name: 'Alert',
  props: {
    validationErrors: {
      required: true,
    },
  },
}
</script>

<style lang="scss">
.fixed-alert {
  position: fixed !important;
  top: 20px;
  right: 20px;
  z-index: 1;
}
</style>
