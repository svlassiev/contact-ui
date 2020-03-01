<template>
    <div>
        <v-timeline-item fill-dot :color="dotColor()" :small="$vuetify.breakpoint.xsOnly">
            <v-row>
                <div>
                    <v-btn @click="onChevronClick" text class="mb-4" ref="chevronButton" :disabled="loading" :loading="loading">
                        <div :id="imagesList.name" class="subtitle-2 text-start">
                            {{ imagesList.name }}
                            <v-icon v-if="active" color="black" right large>mdi-chevron-up</v-icon>
                            <v-icon v-else color="black" right large>mdi-chevron-down</v-icon>
                        </div>
                    </v-btn>
                </div>
            </v-row>
        </v-timeline-item>
        <v-slide-y-transition v-if="active">
            <div class="loading-placeholder" v-if="noImages || loading" v-observe-visibility="onListVisibilityChange"></div>
            <v-col v-else class="mb-4" v-observe-visibility="onListVisibilityChange">
                <div
                    v-for="imagesWithinDate in imagesByDate"
                    :key="imagesWithinDate.date"
                    ref="date"
                    class="mb-4"
                    :small="$vuetify.breakpoint.xsOnly"
                >
                    <v-timeline-item hide-dot>
                        <div class="subtitle-1">{{ imagesWithinDate.date }}</div>
                    </v-timeline-item>
                    <div
                        v-for="image in imagesWithinDate.images"
                        :key="image.imageId"
                        ref="image"
                        class="mb-4">

                    <v-timeline-item hide-dot class="mb-0 pb-0">
                        <v-row>
                            <v-col cols="4" sm="2" align="left"><div class="caption">{{ image.timestamp | moment("LT") }}</div></v-col>
                            <v-col cols="8" sm="10" align="right"><div class="caption gps">{{ gps(image) }}</div></v-col>
                        </v-row>
                    </v-timeline-item>
                    <v-timeline-item hide-dot class="mb-0 pb-0" align="center">
                        <v-img :src="image.location" :lazy-src="image.thumbnail" max-width="max-content" :max-height="$vuetify.breakpoint.xs ? 300 : 600" contain class="ml-n7"/>
                    </v-timeline-item>
                    <v-timeline-item hide-dot class="mt-0 py-0">
                        <v-row>
                            <v-col cols="12" align="center"><div class="caption">{{ image.description }}</div></v-col>
                        </v-row>
                    </v-timeline-item>
                    </div>
                </div>
            </v-col>
        </v-slide-y-transition>
    </div>
</template>

<script>
import axios from 'axios'
import { ObserveVisibility } from 'vue-observe-visibility'
const apiUrl = 'https://serg.vlassiev.info/hiking-api/'

export default {
    name: "ImageListTimelineItems",
    directives: {
        ObserveVisibility
    },
    props: {
        imagesList: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        toggle: {
            type: Function,
            required: true
        }
    },
    data () {
        return {
            loading: false,
            images: []
        }
    },
    mounted () {
        this.toggle()
    },
    computed: {
        colors () {
            return ["#00FFFF", "#8A2BE2", "#A52A2A", "#7FFF00", "#D2691E", "#FF7F50", "#DC143C", "#00FFFF", "#00008B", "#006400", "#8B008B", "#FF8C00", "#FF1493", "#B22222", "#228B22", "#008000", "#4B0082", "#CD5C5C", "#800000", "#0000CD", "#6B8E23", "#FFA500", "#FF4500", "#800080", "#FF0000", "#F4A460", "#FF6347", "#EE82EE", "#FFFF00", "#9ACD32"]
        },
        dateToImage () {
            return this.images.map(image => ({ date: this.$moment(image.timestamp).format("LL"), image: image}))
        },
        imagesByDate () {
            let imagesByDate = []
            let images = this.dateToImage
            while (images.length > 0) {
                let indexDate = images[0].date
                let lastIndex = images.findIndex(pair => pair.date !== indexDate)
                let chunk = images.splice(0, lastIndex > 0 ? lastIndex : images.length)
                imagesByDate.push({date: indexDate, images: chunk.map(pair => pair.image)})
            }
            return imagesByDate
        },
        noImages () {
            return this.images.length === 0
        }
    },
    methods: {
        loadImages() {
            this.loading = true
            axios
                .post(apiUrl + 'images', this.imagesList.images)
                .then(response => {
                    this.images = response.data
                })
                .finally(() => this.loading = false)
        },
        onChevronClick() {
            if (!this.active && this.noImages) {
                this.loadImages()
            }
            this.toggle()
            this.$vuetify.goTo(this.$refs.chevronButton, {duration: 200})
        },
        dotColor () {
            return this.colors[Math.floor(Math.random() * this.colors.length)]
        },
        onListVisibilityChange (visible) {
            if (visible && this.noImages) {
                this.loadImages()
            }
        },
        gps (image) {
            if (image.gps) {
                return image.gps.latitude + ' ' + image.gps.latitudeRef + ', ' + image.gps.longitude + ' ' + image.gps.longitudeRef + ', ' + image.gps.altitude
            }
            return ''
        }
    }
}
</script>
<style scoped lang="scss">
    .loading-placeholder {
        height: 2048px;
    }
    .gps {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
