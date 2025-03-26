import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import avatar from '../../images/imgProfile.jpg'
export function HeroSection () {
  return (
    <Box component={"section"} pt={18} pb={9}>
      <Container>
        <Stack spacing={8} direction={"row"} alignItems={'flex-start'}>
            <Box>
                <Typography component={'h1'} variant='h3' fontWeight={'bold'} mb={5}>
                    Hi Im NgoAnh, <br/>
                    Web Developper
                </Typography>
                <Typography mb={5}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                   Dolor voluptates voluptatum quasi, molestiae nam voluptate mollitia,
                   ex repellendus vel dolorem pariatur impedit eum exercitationem quisquam temporibus animi nihil natus beatae?
                </Typography>
                <Button variant='contained' size='large'>Download Resume</Button>
            </Box>

            <Box px={{minWidth: '300px', 
                 boxShadow: '-5px 13px ',
                 color: 'secondary.light',
                 height: '300px',
                 borderRadius: '50%'
                  }} >
                <Image src={avatar} layout='reponsive' alt='avatar' style={{borderRadius: '50%'}} />
            </Box>
        </Stack>
      </Container>
    </Box>
  );
}
