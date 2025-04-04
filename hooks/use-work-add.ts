import { workApi } from "@/api-client"
import { getErrorMessage } from "@/utils"
import { toast } from "react-toastify"

export  function useAddwork() {
    async function addNewWork(payload: FormData){
        try{
            const newWork = await workApi.add(payload)
            return newWork
        } catch (error){
            const massage = getErrorMessage(error)
            toast.error(massage)
        }
    }
    return addNewWork
}

