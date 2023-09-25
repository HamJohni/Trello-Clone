import {createStore} from "vuex";
import {useBody} from "@/store/modules/useBody";
import {useAuth} from "@/store/modules/useAuth";

export default createStore({
    modules: {
        useBody, useAuth
    }
})
