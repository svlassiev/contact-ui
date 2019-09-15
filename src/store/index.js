import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto'
import axios from 'axios'

Vue.use(Vuex);

const apiUrl = 'http://serg.vlassiev.info/hiking-api/';

export default new Vuex.Store({
    state: {
        folders: [],
        loading: true
    },
    mutations: {
        getFolders(state) {
            this.loading = true;
            axios
                .get(apiUrl + 'folders')
                .then(response => {
                    state.folders = response.data
                })
                .finally(() => this.loading = false)
        }
    }
})

