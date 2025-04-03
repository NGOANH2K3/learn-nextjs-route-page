import { Box, FormHelperText, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(()=> import('react-quill'), {ssr:false})
export type EditorFieldProps<N extends FieldValues> = {
    name: Path<N>
    control: Control<N>
    label?: string
}
export function EditorField<N extends FieldValues> ({
        name,
        control,
        label, 
       }: EditorFieldProps<N>) {

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { onChange,  value, ref},
        fieldState: {error}
    } = useController({
        name,
        control
    })

  return (
    <Box sx={{my:1.5}}>
        <Typography variant='body2'>{label}</Typography>
        <Box>
            <ReactQuill theme='snow'/>
        </Box>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
    
  );
}
