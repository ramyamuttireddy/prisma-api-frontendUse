import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(persist((set) => ({
    user:null,
    token:null,
    login:(user , token) => {
        set({
            user,
            token
        })
    },

    logOut :() =>{
        set({
         user:null,
         token:null
        })
    }
}),{
    name:"use-store"
}))

export default userStore
export const authToken = userStore.getState().token;