<template>
    <div>
        <v-app-bar app dense hide-on-scroll flat ref="header" :class="{'ml-n2': $vuetify.breakpoint.xs}">
            <v-app-bar-nav-icon @click="$vuetify.goTo(0, {duration: 1000})" :class="{'ml-2': $vuetify.breakpoint.smAndUp}">
                <v-icon>mdi-transfer-up</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                Поход - редактирование
            </v-toolbar-title>
            <v-spacer/>
            <v-app-bar-nav-icon @click="onExitClick">
                <v-icon>mdi-exit-run</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-nav-icon @click="onCollapseClick">
                <v-icon>mdi-arrow-collapse-vertical</v-icon>
            </v-app-bar-nav-icon>
        </v-app-bar>

        <v-content>
            <v-layout v-if="loading" justify-center class="ma-8">
                <v-progress-circular indeterminate color="blue" size="70"/>
            </v-layout>
            <v-timeline v-else dense clipped align-top :class="{'ml-n7': $vuetify.breakpoint.xs}">
                <v-item-group multiple :value="activeLists">
                    <div
                            v-for="imagesList in foldersWithImages"
                            :key="imagesList.listId"
                            ref="folder"
                            class="mb-4"
                    >
                        <v-item v-slot:default="{ active, toggle }" :value="imagesList.listId">
                            <edit-image-list-timeline-items :imagesList="imagesList" :active="active" :toggle="toggle" />
                        </v-item>
                    </div>
                </v-item-group>
            </v-timeline>
        </v-content>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import EditImageListTimelineItems from "./EditImageListTimelineItems";

    export default {
        name: 'HikingTimeline',
        components: {EditImageListTimelineItems},
        data () {
            return {
                activeLists: []
            }
        },
        mounted () {
            this.$store.dispatch('loadEditPage')
        },
        computed: {
            loading () {
                return this.$store.state.loading
            },
            foldersWithImages () {
                return this.$store.state.folders
            }
        },
        methods: {
            onCollapseClick () {
                this.activeLists = []
            },
            onExitClick () {
                firebase.auth().signOut().then(() => this.$router.replace('timeline'))
            }
        }
    }
</script>