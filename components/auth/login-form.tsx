import { InputField } from "@/components/form"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, IconButton, InputAdornment } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import {useForm} from 'react-hook-form'

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const {control, handleSubmit} = useForm({
        defaultValues: {
            username:'',
            password:'',
        }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleLoginSubmit(values: any){
        console.log(values);
    }
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleLoginSubmit)} >
            <InputField name="username" control={control}/>
            <InputField 
                type= {showPassword? 'text': 'password'} 
                name="password" 
                control={control} 
                InputProps={{endAdornment: 
                    <InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPassword((x) => !x)}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
                }}
            />
            <Button variant="contained">Login</Button>
        </Box>
    )
}