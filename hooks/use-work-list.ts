import { workApi } from "@/api-client"
import { QueryKeys } from "@/constants"
import { ListParams } from "@/models"
import useSWR, { SWRConfiguration } from "swr"

export interface useWorkListProps{
    params: Partial<ListParams>
    options?: SWRConfiguration
    enabled?: boolean 
}

export function useWorkList({params, options, enabled=true}: useWorkListProps){
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_WORK_LIST, params]: null, 
        () => workApi.getAll(params),
        {
            dedupingInterval: 30 *1000,
            keepPreviousData: true,
            fallbackData: {
                data: [],
                pagination: {
                    _page: 1,
                    _limit: 10,
                    _totalRows: 0,
                }
            },
            ...options
        }
    )
    return swrResponse
}