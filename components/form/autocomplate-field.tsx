import { TextField } from '@mui/material';
import Autocomplete, {AutocompleteProps} from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export type AutoComplateFieldProps<N, A extends FieldValues> = Partial<AutocompleteProps<N, boolean, boolean, boolean > 
>& {
    name: Path<A>
    control: Control<A>
    placeholder?: string
    label?: string
    options: N[]
    getOptionLabel: (option: N) => string 
    onChange?: (selectedOptions: N[]) => void
}
export function AutoComplateFirld<N, A extends FieldValues> ({
        name,
        control, 
        onChange: externalOnChange, 
        placeholder,
        label,
        options,
        getOptionLabel,
        isOptionEqualToValue,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ...rest
    }: AutoComplateFieldProps<N, A>) {

    const {
        field: { onChange, onBlur, value, ref},
        fieldState: {error}
    } = useController({
        name,
        control
    })

 // render whatever you want: MUI, Ant Design, Bootstrap, Custom ui
  return (
    <Autocomplete
    fullWidth 
    size='small'
    multiple
    options={options}
    disableCloseOnSelect
    isOptionEqualToValue={isOptionEqualToValue}
    getOptionLabel={getOptionLabel}
    renderOption={(props, option, { selected }) => {
      const { key, ...optionProps } = props;
      return (
        <li key={key} {...optionProps}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {getOptionLabel(option) || '-'}
        </li>
      );
    }}
    renderInput={(params) => (
      <TextField 
        margin='normal' 
        name={name} 
        {...params} 
        label={label} 
        placeholder={placeholder}
        error= {!!error}
        helperText= {error?.message}
       />
    )}

        onChange={(event, value)=> {
            onChange(value)
            externalOnChange?.(value as N[])
        }}
        onBlur={onBlur}
        value={value}
        ref={ref}
  />
  );
}