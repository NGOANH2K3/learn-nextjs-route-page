import { AutoComplateFirld, InputField } from "@/components/form"
import { useTagList } from "@/hooks"
import { WorkFiltersPayLoad } from "@/models"
import { Search } from "@mui/icons-material"
import { debounce, InputAdornment } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent } from "react"
import { useForm } from 'react-hook-form'
export interface WorkFiltersProps {
    initialValues?: WorkFiltersPayLoad
    onSubmit?: (payload: WorkFiltersPayLoad) => void
}


export function WorkFilters({initialValues,onSubmit}: WorkFiltersProps) {
    // const schema = yup.object().shape({})

    const {data} = useTagList({})
    const tagList = data?.data || []

    const {control, handleSubmit} = useForm<WorkFiltersPayLoad>({
        defaultValues: {
            search: '' , 
            selectedTagList: [],
            ... initialValues ,
        },
        // resolver: yupResolver(schema),   
    })  

   
    async function handleLoginSubmit(payload: WorkFiltersPayLoad){    
        
        // 1. turn selectedTagList into tagList_like (array to string using join())
        // 2. remove unused attr selectedTagList
        if (!payload) return

        payload.tagList_like = payload.selectedTagList?.join('|') || ''
        delete payload.selectedTagList
        console.log('submit', payload)
        await onSubmit?.(payload) 
    }


    
    const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350)
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleLoginSubmit)} >
            <InputField 
            name="search" 
            placeholder="Search work" 
            control={control} 
            InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    )
                }}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    debounceSearchChange()
                }}
            />

            <AutoComplateFirld 
            name="selectedTagList" 
            label="filter by category"
            placeholder="categories" 
            control={control} 
            options={tagList}
            getOptionLabel={(option) =>option}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={()=> debounceSearchChange()}
            />
           
        </Box>
    )
}