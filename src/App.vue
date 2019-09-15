<template>
  <v-app>
    <v-app-bar app dense hide-on-scroll flat>
      <v-toolbar-title class="headline text-uppercase">
        <span>Поход</span>
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
</style>