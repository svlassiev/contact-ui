<template>
  <v-app>
    <v-app-bar app dense hide-on-scroll flat ref="header" :class="{'toolbar-mobile': $vuetify.breakpoint.xs}">
      <v-app-bar-nav-icon @click="$vuetify.goTo(0, {duration: 1000})" :class="{'ml-2': $vuetify.breakpoint.smAndUp}">
        <v-icon>mdi-transfer-up</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        Поход
      </v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon @click="onCollapseClick" v-if="expanded">
        <v-icon>mdi-arrow-collapse-vertical</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <v-timeline dense clipped align-top :class="{'timeline-mobile': $vuetify.breakpoint.xs}">
        <div
            v-for="imagesList in foldersWithImages"
            :key="imagesList.listId"
            ref="folder"
            class="mb-4"
        >
          <image-list-timeline-items :imagesList="imagesList" :expanded="expanded" @expand="onExpand" @collapse="onCollapse" />
        </div>
      </v-timeline>
    </v-content>
  </v-app>
</template>

<script>
import ImageListTimelineItems from "./components/ImageListTimelineItems";
export default {
  name: 'App',
  components: {ImageListTimelineItems},
  data () {
    return {
      expanded: 0
    }
  },
  mounted () {
    this.$store.commit('getFolders')
  },
  computed: {
    foldersWithImages () {
      return this.$store.state.folders
    }
  },
  methods: {
    onExpand (ref) {
      this.expanded += 1
      this.$vuetify.goTo(ref, {duration: 200})
    },
    onCollapse (ref) {
      this.expanded -= 1
      this.$vuetify.goTo(ref, {duration: 200})
    },
    onCollapseClick () {
      this.expanded = 0
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