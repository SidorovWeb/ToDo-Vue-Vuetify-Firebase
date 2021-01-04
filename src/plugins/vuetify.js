// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const theme = {
  primary: '#161616',
  accent: '#0080ff',
  secondary: '#252525',
  success: '#4CAF50',
  info: '#2196F3',
  warning: '#FB8C00',
  error: '#FF5252',
  pantone: '#949597',
}

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
