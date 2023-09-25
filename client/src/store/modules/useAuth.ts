import axios from "axios";

export const useAuth = {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated (state: any) {
            return state.token && state.user
        },
        auth (state: any) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN (state: any, token: any) {
            state.token = token
        },
        SET_USER (state: any, data: any) {
            state.user = data
        },
        RESET_TOKEN_AND_USER(state: any) {
            state.token = null;
            state.user = null;
        },
    },
    actions: {
        async login ({dispatch}:any, formData: any) {
            let res = await axios.post('/user/login', formData)
            dispatch('attempt', res.data.token)
        },

        async attempt ({commit, state}:any,token: any){
            if(token){
                commit('SET_TOKEN', token)
            }

            if(!state.token){
                return
            }

            try{
                let res = await axios.get('/user/auth')
                commit('SET_USER', res.data.user)
            }catch (e){
                commit('RESET_TOKEN_AND_USER');
            }
        },
    }
}