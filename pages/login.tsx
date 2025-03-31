import { useAuth } from '@/hooks';
import { LoginForm } from '@/components/auth';
import { loginPayload } from '@/models';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { getErrorMessage } from '@/utils';
import { toast } from 'react-toastify';

export default function loginPage () {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { login } = useAuth({
        revalidateOnMount: false,
    })

    // async function handleLoginClick(){
    //     try{
    //         await login({
    //             username: 'test',
    //             password: '123456',
    //         })
    //         console.log('redirect to dashboard')
    //         router.push('/about')
    //     }
    //     catch (error){
    //         console.log('failed to login', error);
    //     }
    // }

    // async function handleGetProfileClick(){
    //     try{
    //         await logout()
    //         console.log('redirect to login page')
    //     }
    //     catch (error) {
    //            console.log('failed to get profile', error);
    //     }
    // }

    // async function handleLogoutClick(){
    //     try {
    //         await logout()
    //         console.log('redirect to login page')
    //     }
    //     catch (error) {
    //         console.log('failed to logout', error);
    //     }
    // }

    async function handleLoginSubmit(payload: loginPayload){
        try {
            await login(payload)
            // console.log('redirect to login page')
            router.push('/')
        }
        catch (error) {
            const massage = getErrorMessage(error)
            console.log('failed to logout', massage);
            toast.error(massage)
        }
    }

  return (
    <Box height={'90vh'}>
        <Paper elevation={4} sx={{
            mx: 'auto',
            mt: 8,
            p: 4,
            maxWidth: '480px',
            textAlign: 'center',
        }}>
            <Typography component={'h1'} variant='h4' mt={3}>Login Page</Typography>
            <LoginForm  onSubmit={handleLoginSubmit} />
        </Paper>
    </Box>
  );
}
