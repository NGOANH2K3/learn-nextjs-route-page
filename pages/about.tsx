// import Header from '@/components/header';
import Header from '@/components/common/header';
import { AdminLayout } from '@/components/layouts';
import { Box, Button, Typography } from '@mui/material';
// import dynamic from 'next/dynamic';

import  React from 'react';
// const Header = dynamic(()=> import('@/components/header'), {ssr: false})
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AboutPageProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AboutPage (props: AboutPageProps) {
  
  return (
    <Box sx={{bgcolor: 'secondary.light'}} color='text.primary'>
        <Typography component='h1' variant='h3' color='primary.main'>
            About Page
        </Typography>

        <Button  variant='contained' color='success' >Testing</Button>
        <Header/>
    </Box>
  )
}
AboutPage.Layout = AdminLayout
// const async function getStaticProps() {
//   console.log('get static props')
//   return {
//     props: {}
//   }
// }

