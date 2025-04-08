import { workApi } from "@/api-client"
import { QueryKeys } from "@/constants"
import { getErrorMessage } from "@/utils"
import { toast } from "react-toastify"
import { Arguments, useSWRConfig } from "swr"

export  function useAddwork() {
    const {mutate} = useSWRConfig()
    async function addNewWork(payload: FormData){
        try{
            const newWork = await workApi.add(payload)
            mutate((key: Arguments) => Array.isArray(key) && key.includes(QueryKeys.GET_WORK_LIST ), undefined,
            {revalidate: true}
            )
            return newWork
        } catch (error){
            const massage = getErrorMessage(error)
            toast.error(massage)
        }
    }
    return addNewWork
}

