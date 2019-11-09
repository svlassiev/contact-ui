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
        LOAD_TIMELINE_SUBMIT (state){
            state.loading = true
            state.folders = []
        },
        LOAD_TIMELINE_SUCCESS (state, response){
            state.loading = false
            state.folders = response.data
        },
        LOAD_TIMELINE_ERROR (state){
            state.loading = false
            state.folders = []
        },

        LOAD_EDIT_SUBMIT (state, idToken){
            state.loading = true
            state.idToken = idToken
            state.folders = []
            state.editForbidden = false
        },
        LOAD_EDIT_SUCCESS (state, response){
            const { data: {imageLists = []} } = response
            state.folders = imageLists
            state.loading = false
        },
        LOAD_EDIT_ERROR (state){
            state.folders = []
            state.idToken = ''
            state.loading = false
            state.editForbidden = true
        },

        UPDATE_LIST_NAME_SUBMIT (state){
            state.updateError = null
            state.updating = true
        },
        UPDATE_LIST_NAME_SUCCESS (state){
            state.updating = false
        },
        UPDATE_LIST_NAME_ERROR (state, error){
            state.updateError = error
            state.updating = false
        },

        UPDATE_IMAGE_DESCRIPTION_SUBMIT (state){
            state.updateError = null
            state.updating = true
        },
        UPDATE_IMAGE_DESCRIPTION_SUCCESS (state){
            state.updating = false
        },
        UPDATE_IMAGE_DESCRIPTION_ERROR (state, error){
            state.updateError = error
            state.updating = false
        }
    },
    actions: {
        async loadTimeline({commit}) {
            commit('LOAD_TIMELINE_SUBMIT')
            axios.get(apiUrl + 'folders')
                .then(response => {
                    if(response.status === 200) {
                        commit('LOAD_TIMELINE_SUCCESS', response)
                    }
                })
                .catch(() => commit('LOAD_TIMELINE_ERROR'))
        },
        async loadEditPage({commit}, idToken) {
            commit('LOAD_EDIT_SUBMIT', idToken)
            axios.get(apiUrl + 'edit/data', { params: idToken })
                .then(response => {
                    if(response.status === 200) {
                        commit('LOAD_EDIT_SUCCESS', response)
                    }
                })
                .catch(() => commit('LOAD_EDIT_ERROR'))
        },
        async updateListName({commit, state}, { listId, listName }) {
            commit('UPDATE_LIST_NAME_SUBMIT')
            axios.put(apiUrl + `edit/images-lists/${listId}/name`, { listName }, { params: state.idToken } )
                .then(response => {
                    if(response.status === 200) {
                        commit('UPDATE_LIST_NAME_SUCCESS', response)
                    }
                })
                .catch(error => commit('UPDATE_LIST_NAME_ERROR', error))
        },
        async updateImageDescription({commit, state}, { imageId, description }) {
            commit('UPDATE_IMAGE_DESCRIPTION_SUBMIT')
            axios.put(apiUrl + `edit/images/${imageId}/description`, { description }, { params: state.idToken } )
                .then(response => {
                    if(response.status === 200) {
                        commit('UPDATE_IMAGE_DESCRIPTION_SUCCESS', response)
                    }
                })
                .catch(error => commit('UPDATE_IMAGE_DESCRIPTION_ERROR', error))
        }
    }
})

