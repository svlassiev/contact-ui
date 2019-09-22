<template>
    <div>
        <v-layout align-left>
            <v-row justify="start">
                <v-btn @click="onChevronClick" color="black" text class="mb-4" ref="chevronButton" :disabled="loading" :loading="loading">
                    <div class="subtitle-2 text-left">
                        {{ imagesList.name }}
                        <v-icon color="black" right large v-if="open">mdi-chevron-up</v-icon>
                        <v-icon color="black" right large v-else>mdi-chevron-down</v-icon>
                    </div>
                </v-btn>
            </v-row>
        </v-layout>
        <v-slide-y-transition>
            <v-flex v-if="open" class="mb-4">
                <v-timeline-item
                        v-for="imagesWithinDate in imagesByDate"
                        :key="imagesWithinDate.date"
                        ref="date"
                        class="mb-4"
                        hide-dot
                        :small="$vuetify.breakpoint.xsOnly"
                >
                    <div class="title">{{ imagesWithinDate.date }}</div>
                    <v-timeline-item
                            v-for="image in imagesWithinDate.images"
                            :key="image.imageId"
                            ref="image"
                            class="mb-4"
                            color="pink"
                            hide-dot
                    >
                        <v-img :src="image.location" :lazy-src="image.thumbnail" max-height="800" contain class="image-timeline-item"/>
                        <div class="subtitle-2">{{ image.timestamp | moment("LT") }}</div>
                </v-timeline-item>
                </v-timeline-item>
            </v-flex>
        </v-slide-y-transition>
    </div>
</template>

<script>
import axios from 'axios'
const apiUrl = 'http://serg.vlassiev.info/hiking-api/';

export default {
    name: "ImageListTimelineItems",
    props: {
        imagesList: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            open: false,
            images: [],
            loading: false
        }
    },
    computed: {
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
        }
    }
}
</script>
<style scoped lang="scss">
    .image-timeline-item {
        margin-left: -80px;
    }
</style>