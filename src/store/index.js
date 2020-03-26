import actions from './actions'
import mutations from './mutations'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

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
        updateMessage: '',
        updateError: null
    },
    mutations,
    actions
})

