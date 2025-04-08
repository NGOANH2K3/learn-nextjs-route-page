import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Box, FormHelperText, Typography } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
export type PhotoFieldProps<N extends FieldValues> = {
    name: Path<N>
    control: Control<N>
    label?: string
}
export function PhotoField<N extends FieldValues> ({
        name,
        control,
        label, 
       }: PhotoFieldProps<N>) {

    const {
        field: { onChange,  value, ref},
        fieldState: {error}
    } = useController({
        name,
        control,
    })

    function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if(!file) return

        const url = URL.createObjectURL(file)
        onChange({
            file,
            previewUrl: url
        })
    }   
 // render whatever you want: MUI, Ant Design, Bootstrap, Custom ui

 const previewUrl = value?.previewUrl || DEFAULT_THUMBNAIL_URL
 const inputId = `photo-field-${name}`
  return (
    <Box sx={{my:1.5}}>
        <Typography variant='body2'>{label}</Typography>
        <Box component={'label'} htmlFor={inputId} sx={{cursor:'pointer'}} ref={ref}>
            <Image
                src={previewUrl}
                width={246}
                height={180}
                priority
                alt='work thumbnail'
            />
        </Box>

        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        <Box 
            id={inputId} 
            component={'input'} 
            type='file' 
            accept='image/*'
             onChange={handleFilterChange} 
             hidden>
        </Box>
    </Box>
    
  );
}
