import { ROUTE_LIST } from '@/components/common/header/routes';
import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';



export function HeaderMobile () {
    const router = useRouter()
  return (
    <Box display={{sx: 'block' , md: 'none'}} py={2}>
      <Container>
            <Stack direction='row' justifyContent='flex-end'>
                {ROUTE_LIST.map(( route )=>(
                    <Link key={route.path} href={route.path} passHref>
                        <MuiLink sx={{ml: 2}} className={clsx({active: router.pathname === route.path})}>
                            {route.label}
                        </MuiLink>
                    </Link>
                ))}
            </Stack>
        </Container>
    </Box>
  );
}
