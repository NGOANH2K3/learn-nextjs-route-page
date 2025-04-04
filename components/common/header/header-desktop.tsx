import { ROUTE_LIST } from '@/components/common/header/routes';
import { useAuth } from '@/hooks';
import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function HeaderDesktop () {
    const router = useRouter()
    const {profile, logout} = useAuth()
    const isLoggedIn = Boolean(profile?.username)

    const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)

    // const [routeList, setRouteList] = useState(() => 
    //     ROUTE_LIST.filter((route)=> !route.requireLogin)
    // )

    // server render menu not require login (A)
    // client - first render menu not require login (B)
    // client - useEffect render second time menu requireLogin

    // useEffect(()=>{
    //     // after the first render
    //     // calc routeList and setRouteList
    //     setRouteList(() => ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn))
    // }, [isLoggedIn])

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
                     <Link href='/login' passHref>
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