const workflow = name => ({
    SUBMIT: `${name}_SUBMIT`,
    SUCCESS: `${name}_SUCCESS`,
    ERROR: `${name}_ERROR`
})

export const LOAD_TIMELINE = workflow('LOAD_TIMELINE')
export const LOAD_EDIT = workflow('LOAD_EDIT')
export const UPDATE_LIST_NAME = workflow('UPDATE_LIST_NAME')
export const UPDATE_IMAGE_DESCRIPTION = workflow('UPDATE_IMAGE_DESCRIPTION')
export const ADD_IMAGES_LIST = workflow('ADD_IMAGES_LIST')
export const DELETE_IMAGES_LIST = workflow('DELETE_IMAGES_LIST')
export const ADD_IMAGE = workflow('ADD_IMAGE')
export const DELETE_IMAGE = workflow('DELETE_IMAGE')
export const LOAD_IMAGES = workflow('LOAD_IMAGES')
export const LOAD_IMAGES_TO_CACHE = workflow('LOAD_IMAGES_TO_CACHE')
export const INITIALIZE_IMAGES_LIST = workflow('INITIALIZE_IMAGES_LIST')
