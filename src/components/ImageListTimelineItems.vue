<template>
    <div>
        <v-timeline-item fill-dot :color="dotColor()" :small="$vuetify.breakpoint.xsOnly">
            <v-layout align-left>
                <div justify="start">
                    <v-btn @click="onChevronClick" text class="mb-4" ref="chevronButton" :disabled="loading" :loading="loading">
                        <div class="subtitle-2 text-start">
                            {{ imagesList.name }}
                            <v-icon v-if="open" color="black" right large>mdi-chevron-up</v-icon>
                            <v-icon v-else color="black" right large>mdi-chevron-down</v-icon>
                        </div>
                    </v-btn>
                </div>
            </v-layout>
        </v-timeline-item>
        <v-slide-y-transition>
            <v-flex v-if="open" class="mb-4">
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
                        <v-img :src="image.location" :lazy-src="image.thumbnail" max-height="800" contain class="image-timeline-item"/>
                    </v-timeline-item>
                    <v-timeline-item hide-dot class="mt-0 pt-0">
                        <div class="caption">{{ image.timestamp | moment("LT") }}</div>
                    </v-timeline-item>
                    </div>
                </div>
            </v-flex>
        </v-slide-y-transition>
    </div>
</template>

<script>
import axios from 'axios'
const apiUrl = 'http://serg.vlassiev.info/hiking-api/'

export default {
    name: "ImageListTimelineItems",
    props: {
        imagesList: {
            type: Object,
            required: true
        },
        collapsed: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            open: !this.collapsed,
            loading: !this.collapsed,
            images: []
        }
    },
    computed: {
        colors () {
            return ["#00FFFF", "#8A2BE2", "#A52A2A", "#7FFF00", "#D2691E", "#FF7F50", "#DC143C", "#00FFFF", "#00008B", "#006400", "#8B008B", "#FF8C00", "#FF1493", "#B22222", "#228B22", "#008000", "#4B0082", "#CD5C5C", "#800000", "#0000CD", "#6B8E23", "#FFA500", "#FF4500", "#800080", "#FF0000", "#F4A460", "#FF6347", "#EE82EE", "#FFFF00", "#9ACD32"]
        },
        dateToImage() {
            return this.images.map(image => ({ date: this.$moment(image.timestamp).format("LL"), image: image}))
        },
        imagesByDate() {
            let imagesByDate = []
            let images = this.dateToImage
            while (images.length > 0) {
                let indexDate = images[0].date
                let lastIndex = images.findIndex(pair => pair.date !== indexDate)
                let chunk = images.splice(0, lastIndex > 0 ? lastIndex : images.length)
                imagesByDate.push({date: indexDate, images: chunk.map(pair => pair.image)})
            }
            return imagesByDate
        }
    },
    watch: {
        collapsed(newValue) {
            if (newValue) {
                this.open = false
            }
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
            if (this.images.length == 0 && !this.loading && !this.open) {
                this.loadImages()
            }
            this.open = !this.open
            if (this.open) {
                this.$emit('expand')
            }
        },
        dotColor () {
            return this.colors[Math.floor(Math.random() * this.colors.length)]
        }
    }
}
</script>
<style scoped lang="scss">
    .image-timeline-item {
        margin-left: -28px;
    }
</style>