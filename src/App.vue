<template>
  <v-app>
    <v-app-bar app dense hide-on-scroll flat ref="header" :class="{'toolbar-mobile': $vuetify.breakpoint.xs}">
      <v-app-bar-nav-icon @click="$vuetify.goTo(0, {duration: 1000})" :class="{'ml-2': $vuetify.breakpoint.smAndUp}">
        <v-icon>mdi-transfer-up</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        Поход
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-timeline dense clipped align-top :class="{'timeline-mobile': $vuetify.breakpoint.xs}">
        <v-timeline-item
            v-for="imagesList in foldersWithImages"
            :key="imagesList.listId"
            ref="folder"
            class="mb-4"
            color="pink"
            fill-dot
            :small="$vuetify.breakpoint.xsOnly"
        >

          <image-list-timeline-items :imagesList="imagesList" />

        </v-timeline-item>
      </v-timeline>
    </v-content>
  </v-app>
</template>

<script>
import ImageListTimelineItems from "./components/ImageListTimelineItems";
export default {
  name: 'App',
  components: {ImageListTimelineItems},
  mounted () {
    this.$store.commit('getFolders')
  },
  computed: {
    foldersWithImages () {
      return this.$store.state.folders
    }
  }
}
</script>
<style scoped lang="scss">
  .timeline-mobile {
    margin-left: -28px;
  }
  .toolbar-mobile {
    margin-left: -8px;
  }
</style>