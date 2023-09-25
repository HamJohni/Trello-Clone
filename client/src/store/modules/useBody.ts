import axios from "axios";

export const useBody = {
    namespaced: true,
    state: {
        column: [],
        card: []
    },
    getters: {
        getAllColumn (state: any){
            return state.column
        },
        getAllCards (state: any){
            return state.card
        }
    },
    mutations: {
        UPDATE_COLUMN (state: any, columns: any){
            state.column = columns
        },
        UPDATE_CARD (state: any, cards: any){
            state.card = cards
        }
    },
    actions: {
        async getAllColumns({commit}: any){
            const res = await axios.get('/column/get')

            commit('UPDATE_COLUMN', res.data)
        },
        async getAllCards({commit}: any){
            const res = await axios.get('/card/get')
            commit('UPDATE_CARD', res.data)
        },
        async addColumn({dispatch}: any, formData: any){
            try {
                await axios.post('/column/create', formData)
                dispatch('getAllColumns');
            }catch (err){
                alert('Ошибка')
            }
        },
        async deleteColumn({dispatch}: any, id: any){
                try {
                    await axios.delete('/column/delete', {data: {id}})
                    dispatch('getAllColumns');
                }catch (err){
                    console.log(err)
                }},

        async addCard({dispatch}: any, formData: any){
            try {
                await axios.post('/card/create', formData)
                dispatch('getAllCards');
            }catch (err){
                alert('Ошибка')
            }
        },

        async deleteCard({dispatch}: any, id: any){
            try {
                await axios.delete('/card/delete', {data: {id}})
                dispatch('getAllCards');
            }catch (err){
                console.log(err)
            }
        },

        async editCard({dispatch}: any, obj: any){
            try {
                await axios.patch(`/card/change/${obj.cardId}`, obj)
                dispatch('getAllColumns');
            }catch (err){
                console.log(err)
            }},
    }
}