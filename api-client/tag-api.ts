import axiosClient from "@/api-client/axios-client"
import { ListParams, ListResponse } from "@/models"


export const tagApi = {
    getAll(params:Partial<ListParams>): Promise<ListResponse<string>>{
        return axiosClient.get('/tags', {params})
    },
}