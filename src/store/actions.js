import axios from 'axios'
import * as types from './types'

const apiUrl = 'https://serg.vlassiev.info/hiking-api/'

export default {
    async loadTimeline({commit}) {
        commit(types.LOAD_TIMELINE.SUBMIT)
        axios.get(apiUrl + 'folders')
            .then(response => {
                commit(types.LOAD_TIMELINE.SUCCESS, response)
            })
            .catch(() => commit(types.LOAD_TIMELINE.ERROR))
    },
    async loadEditPage({commit}, idToken) {
        commit(types.LOAD_EDIT.SUBMIT, idToken)
        axios.get(apiUrl + 'edit/data', {params: idToken})
            .then(response => {
                commit(types.LOAD_EDIT.SUCCESS, response)
            })
            .catch(() => commit(types.LOAD_EDIT.ERROR))
    },
    async updateListName({commit, state}, {listId, listName}) {
        commit(types.UPDATE_LIST_NAME.SUBMIT)
        axios.put(apiUrl + `edit/images-lists/${listId}/name`, {listName}, {params: state.idToken})
            .then(response => {
                commit(types.UPDATE_LIST_NAME.SUCCESS, response)
            })
            .catch(error => commit(types.UPDATE_LIST_NAME.ERROR, error))
    },
    async updateImageDescription({commit, state}, {imageId, description}) {
        commit(types.UPDATE_IMAGE_DESCRIPTION.SUBMIT)
        axios.put(apiUrl + `edit/images/${imageId}/description`, {description}, {params: state.idToken})
            .then(response => {
                commit(types.UPDATE_IMAGE_DESCRIPTION.SUCCESS, response)
            })
            .catch(error => commit(types.UPDATE_IMAGE_DESCRIPTION.ERROR, error))
    },
    async addImagesList({commit, state}, imagesList) {
        commit(types.ADD_IMAGES_LIST.SUBMIT)
        axios.post(apiUrl + `edit/images-lists`, imagesList, {params: state.idToken})
            .then(() => {
                commit(types.ADD_IMAGES_LIST.SUCCESS, imagesList)
            })
            .catch(error => commit(types.ADD_IMAGES_LIST.ERROR, error))
    },
    async deleteImagesList({commit, state}, listId) {
        commit(types.DELETE_IMAGES_LIST.SUBMIT)
        axios.delete(apiUrl + `edit/images-lists/${listId}`, {params: state.idToken})
            .then(() => {
                commit(types.DELETE_IMAGES_LIST.SUCCESS, listId)
            })
            .catch(error => commit(types.DELETE_IMAGES_LIST.ERROR, error))
    },
    async addImage({commit, state}, {listId, image}) {
        commit(types.ADD_IMAGE.SUBMIT)
        axios.post(apiUrl + `edit/images/signed-url`, listId, {params: state.idToken})
            .then(response => {
                const {signedUrl, location} = response.data
                axios.put(signedUrl, image, {headers: {'Content-Type': 'image/jpeg'}})
                    .then(() => {
                        axios.post(apiUrl + `edit/images`, {listId, location}, {params: state.idToken})
                            .then(response => {
                                commit(types.ADD_IMAGE.SUCCESS, {listId, image: response.data})
                            }).catch(error => commit(types.ADD_IMAGE.ERROR, error))
                    }).catch(error => commit(types.ADD_IMAGE.ERROR, error))
            }).catch(error => commit(types.ADD_IMAGE.ERROR, error))
    },
    async deleteImage({commit, state}, {listId, imageId}) {
        commit(types.DELETE_IMAGE.SUBMIT)
        axios.delete(apiUrl + `edit/images-lists/${listId}/images/${imageId}`, {params: state.idToken})
            .then(() => {
                commit(types.DELETE_IMAGE.SUCCESS, {listId, imageId})
            })
            .catch(error => commit(types.DELETE_IMAGE.ERROR, error))
    }
}

