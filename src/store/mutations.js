import * as types from './types'

export default {
    [types.LOAD_TIMELINE.SUBMIT] (state) {
        state.loading = true
        state.folders = []
    },
    [types.LOAD_TIMELINE.SUCCESS] (state, response) {
        state.loading = false
        state.folders = response.data
    },
    [types.LOAD_TIMELINE.ERROR] (state) {
        state.loading = false
        state.folders = []
    },

    [types.LOAD_EDIT.SUBMIT] (state, idToken) {
        state.loading = true
        state.idToken = idToken
        state.folders = []
        state.editForbidden = false
    },
    [types.LOAD_EDIT.SUCCESS] (state, response) {
        const {data: {imagesLists = []}} = response
        state.folders = imagesLists
        state.loading = false
    },
    [types.LOAD_EDIT.ERROR] (state) {
        state.folders = []
        state.idToken = ''
        state.loading = false
        state.editForbidden = true
    },

    [types.UPDATE_LIST_NAME.SUBMIT] (state) {
        state.updateError = null
        state.updating = true
    },
    [types.UPDATE_LIST_NAME.SUCCESS] (state) {
        state.updateMessage = 'Images list name is updated'
        state.updating = false
    },
    [types.UPDATE_LIST_NAME.ERROR] (state, error) {
        state.updateError = error
        state.updating = false
    },

    [types.UPDATE_IMAGE_DESCRIPTION.SUBMIT] (state) {
        state.updateError = null
        state.updating = true
    },
    [types.UPDATE_IMAGE_DESCRIPTION.SUCCESS] (state) {
        state.updateMessage = 'Image description is updated'
        state.updating = false
    },
    [types.UPDATE_IMAGE_DESCRIPTION.ERROR] (state, error) {
        state.updateError = error
        state.updating = false
    },

    [types.ADD_IMAGES_LIST.SUBMIT] (state) {
        state.updateError = null
        state.updating = true
    },
    [types.ADD_IMAGES_LIST.SUCCESS] (state, imagesList) {
        state.updateMessage = `Images list [${imagesList.name}] is created`
        state.folders.unshift(imagesList)
        state.updating = false
    },
    [types.ADD_IMAGES_LIST.ERROR] (state, error) {
        state.updateError = error
        state.updating = false
    },

    [types.DELETE_IMAGES_LIST.SUBMIT] (state) {
        state.updateError = null
        state.updating = true
    },
    [types.DELETE_IMAGES_LIST.SUCCESS] (state, listId) {
        state.updateMessage = `Images list [${listId}] is deleted`
        const updatedFolders = state.folders.filter(folder => folder.listId !== listId)
        state.folders = updatedFolders
        state.updating = false
    },
    [types.DELETE_IMAGES_LIST.ERROR] (state, error) {
        state.updateError = error
        state.updating = false
    },

    [types.ADD_IMAGE.SUBMIT] (state) {
        state.updateError = null
        state.updating = true
    },
    [types.ADD_IMAGE.SUCCESS] (state, {listId, image}) {
        state.updateMessage = `Image is added to list [${listId}]`
        const updatedFolders = state.folders.map(list => {
            if (list.listId === listId) {
                list.images.unshift(image)
            }
            return list
        })
        state = {...state, folders: updatedFolders}
        state.updating = false
    },
    [types.ADD_IMAGE.ERROR] (state, error) {
        state.updateError = error
        state.updating = false
    },

    [types.DELETE_IMAGE.SUBMIT] (state) {
        state.updateError = null
        state.updating = true
    },
    [types.DELETE_IMAGE.SUCCESS] (state, {listId, imageId}) {
        state.updateMessage = `Image [${imageId}] is deleted from list [${listId}]`
        const updatedFolders = state.folders.map(list => {
            if (list.listId === listId) {
                return list.images.filter(image => image.imageId !== imageId)
            }
            return list
        })
        state = {...state, folders: updatedFolders}
        state.updating = false
    },
    [types.DELETE_IMAGE.ERROR] (state, error) {
        state.updateError = error
        state.updating = false
    }
}