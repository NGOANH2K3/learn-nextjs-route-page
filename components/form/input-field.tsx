import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';

export type InputFieldProps = TextFieldProps & {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>
}
export function InputField ({
        name,
        control, 
        onChange: externalOnChange, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onBlur: externalOnBlur, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ref: externalRef, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        value: externalValue, 
        ...rest}: InputFieldProps) {

    const {
        field: { onChange, onBlur, value, ref},
        fieldState: {error}
    } = useController({
        name,
        control
    })

 // render whatever you want: MUI, Ant Design, Bootstrap, Custom ui
  return (
    <TextField
        fullWidth
        size='small'
        margin='normal'
        name={name}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
            onChange(event)
            externalOnChange?.(event)
        }}
        onBlur={onBlur}
        inputRef={ref}
        error= {!!error}
        helperText= {error?.message}
        {...rest}
    />
  );
}
