<template>
  <div class="nav-expansion-panels">
    <v-expansion-panels accordion flat v-model="panel" multiple>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header v-ripple="true" class="px-4" color="primary">
          Item
        </v-expansion-panel-header>
        <v-expansion-panel-content color="primary">
          <v-list color="primary">
            <v-list-item
              dense
              link
              v-for="(item23, index) in items"
              :key="index"
            >
              <v-list-item-title class="grey--text">{{
                item23.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'ExpansionPanels',
  props: {},
  data() {
    return {
      panel: [0, 1],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
}
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.nav-expansion-panels {
  position: relative;
  overflow-y: auto;
  height: calc(100% - 206px);
}
</style>
