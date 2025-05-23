import { InputField } from "@/components/form"
import { loginPayload } from "@/models"
import {  Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, CircularProgress, IconButton, InputAdornment } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
export interface LoginFormProps {
    onSubmit?: (payload: loginPayload) => void
}

export function LoginForm({onSubmit}: LoginFormProps) {
    const schema = yup.object().shape({
        username: yup.string().required('Please enter username').min(4, 'Username is required to have at least 4 characters.'),
        password: yup.string().required('Please enter password').min(6, 'password is required to have at least 6 characters.'),
    })

    const [showPassword, setShowPassword] = useState(false)
    const {control, handleSubmit, formState: { isSubmitting }} = useForm<loginPayload>({
        defaultValues: {
            username:'',
            password:'',
        },
        resolver: yupResolver(schema),   
    })

    async function handleLoginSubmit(payload: loginPayload){
        await onSubmit?.(payload)                     
    }
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleLoginSubmit)} >
            <InputField name="username" label='Enter Username' control={control}/>
            <InputField 
                type= {showPassword? 'text': 'password'} 
                name="password"
                label='Enter Password'
                control={control} 
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((x) => !x)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Button disabled={isSubmitting} startIcon={isSubmitting? <CircularProgress color="inherit" size={'1rem'}/>:null} type="submit" variant="contained" fullWidth sx={{mt: 3}}>Login</Button>
        </Box>
    )
}