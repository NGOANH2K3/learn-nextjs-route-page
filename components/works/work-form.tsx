import { AutoComplateFirld, EditorField, InputField, PhotoField } from "@/components/form"
import { useTagList } from "@/hooks"
import { WorkPayLoad } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { Resolver, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface WorkFormProps {
    initialValues?: Partial<WorkPayLoad>
    onSubmit?: (payload: Partial<WorkPayLoad>) => void
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function WorkForm({initialValues, onSubmit}: WorkFormProps) {
    const schema = yup.object({
        title: yup.string().required('Please enter work title'),
        shortDescription: yup.string().required('Please enter work description'),
        tagList: yup.array().of(yup.string()).min(1,'please select at least one category'),
        thumbnail: yup
        .object()
        .nullable()
        .test('test-required', 'Please select an image.',(value) => {

            if(Boolean(initialValues?.id)|| Boolean(value as {field:File})) return true
            return false
        })
        .test('test-size', 'Maximum size exceeded. Please select another file.',(value) => {
            console.log('test-size', value);
            if (!value || typeof value !== 'object' || !('file' in value)) {
                return false; // Trả về false nếu value không hợp lệ
            }
            const fileSize = (value as { file: File }).file.size || 0;
            const MB_TO_BYTES = 1024 * 1024
            const MAX_SIZE = 3 * MB_TO_BYTES
            return fileSize <= MAX_SIZE
        })
    });

    const {data} = useTagList({})
    const tagList = data?.data || []

    const { control, handleSubmit } = useForm<Partial<WorkPayLoad>>({
        defaultValues: {
            title:  '',
            shortDescription:  '',
            tagList: [],
            thumbnail: initialValues?.id ? {
                file: null,
                previewUrl: initialValues?.thumbnailUrl,
            }: null,
            fullDescription: '',
            ...initialValues,
        },
        resolver: yupResolver(schema) as Resolver<Partial<WorkPayLoad>>,
    });
   
    async function handleLoginSubmit(payload:Partial<WorkPayLoad>){    
        
        // 1. turn selectedTagList into tagList_like (array to string using join())
        // 2. remove unused attr selectedTagList
        if (!payload) return
        console.log('form submit', payload);
        // await onSubmit?.(payload) 
    }


    return (
        <Box component='form' onSubmit={handleSubmit(handleLoginSubmit)} >
            <InputField 
            name="title" 
            label='Title'
            placeholder="Your Work Title" 
            control={control} 
            />

            <InputField 
            name="shortDescription" 
            label= 'Short Description'
            placeholder="Your work Description" 
            control={control} 
            InputProps={{
                    multiline: true,
                    rows: 3
                }}
            />

            <AutoComplateFirld   
            name="tagList" 
            label="categories"
            placeholder="categories" 
            control={control} 
            options={tagList}
            getOptionLabel={(option) =>option}
            isOptionEqualToValue={(option, value) => option === value}
            />

            <PhotoField name="thumbnail" label="Thumnail" control={control}/>
            <EditorField name="fullDescription" label="Full Description" control={control}/>

           <Button variant="contained" type="submit"> 
                {initialValues?.id ? 'save' : 'submit'}
           </Button>
        </Box>
    )
}