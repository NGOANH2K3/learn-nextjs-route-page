import { Footer} from '@/components/common';
import { LayoutProps } from '@/models/index';
import { Box, Stack } from '@mui/material';
// import { useEffect } from 'react';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../common/header') , {ssr: false})

export function MainLayout ({children}: LayoutProps) {
    // useEffect(()=>{
    //     console.log('MainLayout Mounting');
    //     return () => console.log('MainLayout UnMounting')
    // },[])
  return (
    <Stack minHeight={'100vh'}>
      <Header/>
      <Box component={'main'} flexGrow={1}>
        {children}
      </Box>
      <Footer/>
    </Stack>
  );
}
