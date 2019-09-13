<template>
  <v-app>
    <v-app-bar app dense hide-on-scroll flat>
      <v-toolbar-title class="headline text-uppercase">
        <span>Поход</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>

      <v-timeline dense clipped align-top :class="{'timeline': $vuetify.breakpoint.xs}">
        <v-timeline-item
            v-for="imagesList in foldersWithImages"
            :key="imagesList.listId"
            ref="folder"
            :class="mb-4"
            color="pink"
            fill-dot
            :small="$vuetify.breakpoint.xsOnly"
        >

          <image-list-timeline-items :imagesList="imagesList"/>

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
  computed: {
    folders () {
      return Array.of(
        { name: 'Байкал 2004', listId: 'Baikal', count: 127 },
        { name: 'Четвёртый традиционный майский', listId: '4thmay', count: 79 },
        { name: 'Четвёртый традиционный осенний', listId: '4trados', count: 26 },
        { name: 'Пятый традиционный майский', listId: '5tradmay', count: 44 },
        { name: 'Шестой традиционный майский', listId: '6tradmay', count: 55 },
        { name: 'Шестой традиционный осенний', listId: '6trados', count: 41 },
        { name: 'Седьмой традиционный майский', listId: '7tradmay', count: 12 },
        { name: 'Седьмой традиционный осенний', listId: '7trados', count: 41 },
        { name: 'Хибины 2009', listId: 'Hibiny9', count: 138 },
        { name: 'Поход за полярный круг', listId: 'ArcticCircleBeyound', count: 99 },
        { name: 'Байдарочный поход 2011', listId: 'canoeing11', count: 98 }
        )
    },
    foldersWithImages () {
      function getImageId (index) {
        if (index < 9) {
          return '00' + (index + 1)
        }
        if (index < 99) {
          return '0' + (index + 1)
        }
        return (index + 1)
      }

      function getImages (imageList) {
        return Array.from(Array(imageList.count), (x, index) => ({ imageId: getImageId(index), description: index, time: new Date() }))
      }

      return Array.from(this.folders, (list) => ({ ...list, images: getImages(list) }))
    }
  }
}
</script>
<style scoped lang="scss">
  .timeline {
    margin-left: -28px;
  }
</style>