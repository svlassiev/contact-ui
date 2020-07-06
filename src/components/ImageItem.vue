<template>
  <div>
    <v-timeline-item hide-dot class="mb-0 pb-0">
      <v-row>
        <v-col align="left">
          <span class="caption pr-2">{{ image.timestamp | moment("LT") }}</span>
          <v-tooltip v-if="gps" top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" small color="black" @click="onMapClick">mdi-map-marker-radius-outline</v-icon>
            </template>
            <span>{{ gps }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-timeline-item>
    <v-timeline-item hide-dot class="mb-0 pb-0" align="center">
      <v-img :src="image.location" :lazy-src="image.thumbnail" max-width="max-content" :max-height="$vuetify.breakpoint.xs ? 300 : 600" contain
             class="ml-n7"/>
    </v-timeline-item>
    <v-timeline-item hide-dot class="mt-0 py-0">
      <v-row>
        <v-col cols="12" align="center">
          <div class="caption">{{ image.description }}</div>
        </v-col>
      </v-row>
    </v-timeline-item>
  </div>
</template>

<script>

export default {
  name: "ImageItem",
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  computed: {
    coordinates() {
      if (this.image.gps) {
        return this.image.gps.latitude + ' ' + this.image.gps.latitudeRef + ', ' + this.image.gps.longitude + ' ' + this.image.gps.longitudeRef
      }
      return ''
    },
    gps() {
      if (this.image.gps) {
        return this.coordinates + ', ' + this.image.gps.altitude
      }
      return ''
    },
    map() {
      return 'https://yandex.ru/maps/?l=sat&mode=search&text=' + this.coordinates
    }
  },
  methods: {
    onListVisibilityChange(visible) {
      if (visible && !this.loaded) {
        this.loadImages()
      }
    },
    onMapClick() {
      window.open(this.map)
    }
  }
}
</script>
<style scoped lang="scss">
  .loading-placeholder {
    height: 200px;
  }

  .gps {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
</style>