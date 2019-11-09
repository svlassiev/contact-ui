<template>
    <div>
        <v-timeline-item fill-dot :color="dotColor()" :small="$vuetify.breakpoint.xsOnly">
            <v-row>
                <v-col class="py-0">
                    <v-row class="subtitle-2 text-start pr-2">
                        <v-col cols="11" class="py-0 pr-0">
                            <v-text-field v-model="updates.listName" class="py-0" @input="onListNameUpdated"></v-text-field>
                        </v-col>
                        <v-col cols="1" class="pa-0">
                            <v-btn @click="onChevronClick" text width="100%" class="mb-4" ref="chevronButton" :disabled="loading" :loading="loading">
                                <v-icon v-if="active" color="black" right large>mdi-chevron-up</v-icon>
                                <v-icon v-else color="black" right large>mdi-chevron-down</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-timeline-item>
        <v-slide-y-transition v-if="active">
            <div class="loading-placeholder" v-if="noImages || loading" v-observe-visibility="onListVisibilityChange"></div>
            <v-flex v-else class="mb-4" v-observe-visibility="onListVisibilityChange">
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
                        <v-img :src="image.location" :lazy-src="image.thumbnail" :max-height="$vuetify.breakpoint.xs ? 300 : 600" contain class="ml-n7"/>
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
import { ObserveVisibility } from 'vue-observe-visibility'
import lodash from 'lodash'

const apiUrl = 'https://serg.vlassiev.info/hiking-api/'

export default {
    name: "EditImageListTimelineItems",
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
            images: [],
            updates: {
                listName: this.imagesList.name
            }
        }
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
        onListNameUpdated: lodash.debounce(function () {
            this.$store.dispatch('updateListName', { listId: this.imagesList.listId, listName: this.updates.listName })
        }, 700),
    }
}
</script>
<style scoped lang="scss">
    .loading-placeholder {
        height: 2048px;
    }
</style>