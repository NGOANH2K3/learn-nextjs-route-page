import { InputField } from "@/components/form"
import { WorkFiltersPayLoad } from "@/models"
import { Search } from "@mui/icons-material"
import { debounce, InputAdornment } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent } from "react"
import { useForm } from 'react-hook-form'
export interface WorkFiltersProps {
    onSubmit?: (payload: WorkFiltersPayLoad) => void
}


export function WorkFilters({onSubmit}: WorkFiltersProps) {
    // const schema = yup.object().shape({})

    const {control, handleSubmit} = useForm<WorkFiltersPayLoad>({
        defaultValues: {
            search:'',     
        },
        // resolver: yupResolver(schema),   
    })

   
    async function handleLoginSubmit(payload: WorkFiltersPayLoad){
        console.log('form submit', payload);
        await onSubmit?.(payload)                     
    }

    
    const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350)
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleLoginSubmit)} >
            <InputField 
            name="Search" 
            placeholder="Search work" 
            control={control} 
            InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search/>
                        </InputAdornment>
                    )
                }}
                onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    console.log('change', event.target.value)
                    debounceSearchChange( )
                }}
                />
        </Box>
    )
}