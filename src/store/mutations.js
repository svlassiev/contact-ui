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
    },

    [types.INITIALIZE_IMAGES_LIST.SUBMIT] (state, listId) {
        let lists = state.lists
        if (lists.includes(list => list.listId === listId)) {
            lists = state.lists.map(list => {
                if (list.listId === listId) {
                    list.loading = true
                }
                return list
            })
        } else {
            lists.push({listId, loaded: false, loading: true, images: []})
        }
        state = {...state, lists}
    },
    [types.INITIALIZE_IMAGES_LIST.SUCCESS] (state, {listId, cache, limit}) {
        const updatedLists = state.lists.map(list => {
            if (list.listId === listId) {
                list.loading = false
                const imagesLimit = cache.length > limit ? limit : cache.length
                const images = cache.slice(0, imagesLimit)
                const initialCache = cache.slice(imagesLimit)
                list.images = images
                list.cache = initialCache
                list.loaded = imagesLimit < limit
            }
            return list
        })
        console.log('Images list is initialized')
        state = {...state, lists: updatedLists}
    },
    [types.INITIALIZE_IMAGES_LIST.ERROR] (state, listId) {
        const updatedLists = state.lists.map(list => {
            if (list.listId === listId) {
                list.loading = false
            }
            return list
        })
        state = {...state, lists: updatedLists}
    },

    [types.LOAD_IMAGES.SUBMIT] () {},
    [types.LOAD_IMAGES.SUCCESS] (state, listId) {
        const updatedLists = state.lists.map(list => {
            if (list.listId === listId) {
                list.images = list.images.concat(list.cache)
                list.cache = []
            }
            return list
        })
        state = {...state, lists: updatedLists}
    },
    [types.LOAD_IMAGES.ERROR] () {},

    [types.LOAD_IMAGES_TO_CACHE.SUBMIT] (state, listId) {
        const updatedLists = state.lists.map(list => {
            if (list.listId === listId) {
                list.loading = true
                list.cache = []
            }
            return list
        })
        state = {...state, lists: updatedLists}
    },
    [types.LOAD_IMAGES_TO_CACHE.SUCCESS] (state, {listId, images, limit}) {
        const updatedLists = state.lists.map(list => {
            if (list.listId === listId) {
                list.cache = images
                list.loading = false
                list.loaded = images.length < limit
            }
            return list
        })
        state = {...state, lists: updatedLists}
        console.log('cache loaded', state.lists)
    },
    [types.LOAD_IMAGES_TO_CACHE.ERROR] (state, listId) {
        const updatedLists = state.lists.map(list => {
            if (list.listId === listId) {
                list.loading = false
            }
            return list
        })
        state = {...state, lists: updatedLists}
    }
}