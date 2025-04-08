import { ROUTE_LIST } from '@/components/common/header/routes';
import { useAuth } from '@/hooks';
import { encodeUrl } from '@/utils';
import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function HeaderDesktop () {
    const router = useRouter()
    const {profile, logout} = useAuth()
    const isLoggedIn = Boolean(profile?.username)

    const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)

  return (
    <Box display={{xs: 'none' , md: 'block'}} py={2}>
        <Container>
            <Stack direction='row' justifyContent='flex-end'>
                {routeList.map(( route )=>(
                    <Link key={route.path} href={route.path} passHref>
                        <MuiLink 
                        component="span"
                         sx={{ml: 2, fontWeight: 'medium'}} 
                        className={clsx({active: router.pathname == route.path})}>
                            {route.label}
                        </MuiLink>
                    </Link>
                ))}

                {!isLoggedIn && (
                     <Link href={`/login?back_to=${encodeUrl(router.asPath)}`} passHref>
                        <MuiLink component="span" sx={{ml: 2, fontWeight: 'medium', cursor:'pointer'}} >
                            Login
                        </MuiLink>
                    </Link>
                )}

                {isLoggedIn && (
                        <MuiLink component="span" sx={{ml: 2, fontWeight: 'medium', cursor:'pointer'}} onClick={logout} >
                            Logout
                        </MuiLink>
                )}
            </Stack>
        </Container>
    </Box>
  );
}