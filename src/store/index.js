import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

const apiUrl = 'https://serg.vlassiev.info/hiking-api/'

export default new Vuex.Store({
    state: {
        idToken: '',
        folders: [],
        loading: true,
        firebaseConfig: {
            data: null,
            loading: false
        },
        editForbidden: false,
        updating: false,
        updateError: null
    },
    mutations: {
        LOAD_TIMELINE_SUBMIT (state) {
            state.loading = true
            state.folders = []
        },
        LOAD_TIMELINE_SUCCESS (state, response) {
            state.loading = false
            state.folders = response.data
        },
        LOAD_TIMELINE_ERROR (state) {
            state.loading = false
            state.folders = []
        },

        LOAD_EDIT_SUBMIT (state, idToken) {
            state.loading = true
            state.idToken = idToken
            state.folders = []
            state.editForbidden = false
        },
        LOAD_EDIT_SUCCESS (state, response) {
            const { data: {imagesLists = []} } = response
            state.folders = imagesLists
            state.loading = false
        },
        LOAD_EDIT_ERROR (state) {
            state.folders = []
            state.idToken = ''
            state.loading = false
            state.editForbidden = true
        },

        UPDATE_LIST_NAME_SUBMIT (state) {
            state.updateError = null
            state.updating = true
        },
        UPDATE_LIST_NAME_SUCCESS (state) {
            state.updating = false
        },
        UPDATE_LIST_NAME_ERROR (state, error) {
            state.updateError = error
            state.updating = false
        },

        UPDATE_IMAGE_DESCRIPTION_SUBMIT (state) {
            state.updateError = null
            state.updating = true
        },
        UPDATE_IMAGE_DESCRIPTION_SUCCESS (state) {
            state.updating = false
        },
        UPDATE_IMAGE_DESCRIPTION_ERROR (state, error) {
            state.updateError = error
            state.updating = false
        },

        ADD_IMAGES_LIST_SUBMIT (state) {
            state.updateError = null
            state.updating = true
        },
        ADD_IMAGES_LIST_SUCCESS (state, imagesList) {
            state.folders.unshift(imagesList)
            state.updating = false
        },
        ADD_IMAGES_LIST_ERROR (state, error) {
            state.updateError = error
            state.updating = false
        },

        DELETE_IMAGES_LIST_SUBMIT (state) {
            state.updateError = null
            state.updating = true
        },
        DELETE_IMAGES_LIST_SUCCESS (state, listId) {
            const updatedFolders = state.folders.filter(folder => folder.listId !== listId)
            state.folders = updatedFolders
            state.updating = false
        },
        DELETE_IMAGES_LIST_ERROR (state, error) {
            state.updateError = error
            state.updating = false
        },

        ADD_IMAGE_SUBMIT (state) {
            state.updateError = null
            state.updating = true
        },
        ADD_IMAGE_SUCCESS (state, { listId, image }) {
            const updatedFolders = state.folders.map(list => {
                if (list.listId === listId) {
                    list.images.unshift(image)
                }
                return list
            })
            state.folders = updatedFolders
            state.updating = false
        },
        ADD_IMAGE_ERROR (state, error) {
            state.updateError = error
            state.updating = false
        },

        DELETE_IMAGE_SUBMIT (state) {
            state.updateError = null
            state.updating = true
        },
        DELETE_IMAGE_SUCCESS (state, imageId) {
            state.updating = false
        },
        DELETE_IMAGE_ERROR (state, error) {
            state.updateError = error
            state.updating = false
        }
    },
    actions: {
        async loadTimeline({commit}) {
            commit('LOAD_TIMELINE_SUBMIT')
            axios.get(apiUrl + 'folders')
                .then(response => {
                    commit('LOAD_TIMELINE_SUCCESS', response)
                })
                .catch(() => commit('LOAD_TIMELINE_ERROR'))
        },
        async loadEditPage({commit}, idToken) {
            commit('LOAD_EDIT_SUBMIT', idToken)
            axios.get(apiUrl + 'edit/data', { params: idToken })
                .then(response => {
                    commit('LOAD_EDIT_SUCCESS', response)
                })
                .catch(() => commit('LOAD_EDIT_ERROR'))
        },
        async updateListName({commit, state}, { listId, listName }) {
            commit('UPDATE_LIST_NAME_SUBMIT')
            axios.put(apiUrl + `edit/images-lists/${listId}/name`, { listName }, { params: state.idToken } )
                .then(response => {
                    commit('UPDATE_LIST_NAME_SUCCESS', response)
                })
                .catch(error => commit('UPDATE_LIST_NAME_ERROR', error))
        },
        async updateImageDescription({commit, state}, { imageId, description }) {
            commit('UPDATE_IMAGE_DESCRIPTION_SUBMIT')
            axios.put(apiUrl + `edit/images/${imageId}/description`, { description }, { params: state.idToken } )
                .then(response => {
                    commit('UPDATE_IMAGE_DESCRIPTION_SUCCESS', response)
                })
                .catch(error => commit('UPDATE_IMAGE_DESCRIPTION_ERROR', error))
        },
        async addImagesList({commit, state}, imagesList) {
            commit('ADD_IMAGES_LIST_SUBMIT')
            axios.post(apiUrl + `edit/images-lists`, imagesList, { params: state.idToken } )
                .then(() => {
                    commit('ADD_IMAGES_LIST_SUCCESS', imagesList)
                })
                .catch(error => commit('ADD_IMAGES_LIST_ERROR', error))
        },
        async deleteImagesList({commit, state}, listId) {
            commit('DELETE_IMAGES_LIST_SUBMIT')
            axios.delete(apiUrl + `edit/images-lists/${listId}`, { params: state.idToken } )
                .then(() => {
                    commit('DELETE_IMAGES_LIST_SUCCESS', listId)
                })
                .catch(error => commit('DELETE_IMAGES_LIST_ERROR', error))
        },
        async addImage({commit, state}, { listId, image }) {
            commit('ADD_IMAGE_SUBMIT')
            axios.post(apiUrl + `edit/images/signed-url`, listId, {params: state.idToken})
                .then(response => {
                    const { signedUrl, location } = response.data
                    axios.put(signedUrl, image, { headers: { 'Content-Type': 'image/jpeg' } })
                        .then(() => {
                            axios.post(apiUrl + `edit/images`, {listId, location }, {params: state.idToken})
                                .then(response => {
                                    commit('ADD_IMAGE_SUCCESS', { listId, image: response.data })
                                }).catch(error => commit('ADD_IMAGE_ERROR', error))
                        }).catch(error => commit('ADD_IMAGE_ERROR', error))
                }).catch(error => commit('ADD_IMAGE_ERROR', error))
        },
        async deleteImage({commit, state}, imageId) {
            commit('DELETE_IMAGE_SUBMIT')
            axios.delete(apiUrl + `edit/images/${imageId}`, { params: state.idToken } )
                .then(() => {
                    commit('DELETE_IMAGE_SUCCESS', imageId)
                })
                .catch(error => commit('DELETE_IMAGE_ERROR', error))
        }
    }
})

