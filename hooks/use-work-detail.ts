import { workApi } from "@/api-client"
import { QueryKeys } from "@/constants"
import useSWR, { SWRConfiguration } from "swr"

export interface useWorkDetailProps{
    workId: string
    options?: SWRConfiguration
    enabled?: boolean 
}

export function useWorkDetail({workId, options, enabled=true}: useWorkDetailProps){
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_WORK_DETAIL, workId]: null, 
        () => workApi.get(workId),
        {
            dedupingInterval: 30 *1000,
            keepPreviousData: true,
            fallbackData: null,
            ...options
        }
    )

    async function updateWork(payload: FormData){
        const newWork = await workApi.update(payload)
        swrResponse.mutate(newWork)
        return newWork
    }
    return {...swrResponse, updateWork}
}