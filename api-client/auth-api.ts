import axiosClient from "@/api-client/axios-client"
import { loginPayload } from "@/models"


export const authApi = {
    login(payload: loginPayload){
        return axiosClient.post('/login', payload)
    },
    logout(){
        return axiosClient.post('/logout')
    },
    getProfile(){
        return axiosClient.get('/profile')
    },
}