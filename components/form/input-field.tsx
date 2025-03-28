import { TextField, TextFieldProps } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export type InputFieldProps = TextFieldProps & {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InputField ({name, label, control, onChange: externalOnChange, onBlur: externalOnBlur, ref: externalRef, value: externalValue, ...rest}: InputFieldProps) {
    const {
        
        field: { onChange, onBlur, value, ref},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fieldState: {error}
    } = useController({
        name,
        control
    })
  return (
    <TextField
        fullWidth
        size='small'
        margin='normal'
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        {...rest}
    />
  );
}
