<template>
    <div>
        <v-layout align-left>
            <v-row justify="start">
                <v-btn @click="open = !open" color="black" text class="mb-4" ref="chevronButton">
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
                        v-for="image in imagesList.images"
                        :key="image.imageId"
                        ref="image"
                        class="mb-4"
                        color="pink"
                        hide-dot
                >
                    <v-img :src="getSource(imagesList.listId, image)" :lazy-src="getLazySource(imagesList.listId, image)" max-height="800" contain class="image-timeline-item"/>
                </v-timeline-item>
            </v-flex>
        </v-slide-y-transition>
    </div>
</template>

<script>
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
            open: false
        }
    },
    methods: {
        getSource(folderId, image) {
            return 'https://storage.cloud.google.com/colorless-days-children/' + folderId + '/Picture' + image.imageId + '.jpg'
        },
        getLazySource(folderId, image) {
            return 'https://storage.cloud.google.com/colorless-days-children/' + folderId + '/1_Picture' + image.imageId + '.jpg'
        }
    }
}
</script>
<style scoped lang="scss">
    .image-timeline-item {
        margin-left: -80px;
    }
</style>