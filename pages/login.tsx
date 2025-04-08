import { useAuth } from '@/hooks';
import { LoginForm } from '@/components/auth';
import { loginPayload } from '@/models';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { decodeUrl, getErrorMessage } from '@/utils';
import { toast } from 'react-toastify';

export default function loginPage () {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { login } = useAuth({
        revalidateOnMount: false,
    })

    async function handleLoginSubmit(payload: loginPayload){
        try {
            await login(payload)
            const backTo = router.query?.back_to ? decodeUrl(router.query.back_to as string) : '/'
            router.push(backTo)
        }
        catch (error: unknown) {
            const massage = getErrorMessage(error)
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
