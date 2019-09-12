<template>
  <v-app>
    <v-app-bar app dense hide-on-scroll flat>
      <v-toolbar-title class="headline text-uppercase">
        <span>Поход</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>

      <v-timeline dense clipped align-top>
        <v-timeline-item
            v-for="(folder, index) in foldersWithImages"
            :key="folder.id"
            class="mb-4"
            color="pink"
            fill-dot
        >

            <v-flex>
              <v-layout align-left>
                <v-row justify="start">
                  <v-btn @click="onChevronClick(index)" color="black" text class="mb-4">
                    <div class="subtitle-2 text-left">
                      {{ folder.name }}
                      <v-icon color="black" right large v-if="open[index]">mdi-chevron-up</v-icon>
                      <v-icon color="black" right large v-else>mdi-chevron-down</v-icon>
                    </div>
                  </v-btn>
                </v-row>
              </v-layout>
            </v-flex>
            <v-slide-y-transition>
              <v-flex v-if="open[index]">

                <v-timeline-item
                    v-for="image in folder.images"
                    :key="image.id"
                    class="mb-4"
                    color="pink"
                    hide-dot
                >
                  <v-img :src="getSource(folder.folderId, image)" :lazy-src="getLazySource(folder.folderId, image)" max-height="800" contain/>
                </v-timeline-item>
              </v-flex>
            </v-slide-y-transition>
        </v-timeline-item>
      </v-timeline>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      open: Array.from(Array(11), () => false)
    }
  },
  computed: {
    folders () {
      return Array.of(
        { name: 'Байкал 2004', folderId: 'Baikal', count: 127 },
        { name: 'Четвёртый традиционный майский', folderId: '4thmay', count: 79 },
        { name: 'Четвёртый традиционный осенний', folderId: '4trados', count: 26 },
        { name: 'Пятый традиционный майский', folderId: '5tradmay', count: 44 },
        { name: 'Шестой традиционный майский', folderId: '6tradmay', count: 55 },
        { name: 'Шестой традиционный осенний', folderId: '6trados', count: 41 },
        { name: 'Седьмой традиционный майский', folderId: '7tradmay', count: 12 },
        { name: 'Седьмой традиционный осенний', folderId: '7trados', count: 41 },
        { name: 'Хибины 2009', folderId: 'Hibiny9', count: 138 },
        { name: 'Поход за полярный круг', folderId: 'ArcticCircleBeyound', count: 99 },
        { name: 'Байдарочный поход 2011', folderId: 'canoeing11', count: 98 }
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

      function getImages (folder) {
        return Array.from(Array(folder.count), (x, index) => ({ id: getImageId(index), description: index, time: new Date() }))
      }

      return Array.from(this.folders, (folder) => ({ ...folder, images: getImages(folder) }))
    }
  },
  methods: {
    getSource (folderId, image) {
      return 'https://storage.cloud.google.com/colorless-days-children/' + folderId + '/Picture' + image.id + '.jpg'
    },
    getLazySource (folderId, image) {
      return 'https://storage.cloud.google.com/colorless-days-children/' + folderId + '/1_Picture' + image.id + '.jpg'
    },
    onChevronClick (folderIndex) {
      this.open[folderIndex] = !this.open[folderIndex]
      this.$forceUpdate()
    }
  }
}
</script>
<style scoped lang="scss">
  .image-container {
    cursor: pointer;
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
</style>