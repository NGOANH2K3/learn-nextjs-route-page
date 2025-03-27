import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import avatar from '../../images/imgProfile.png'
export function HeroSection () {
  return (
    <Box component={"section"} pt={{xs:4, md: 18}} pb={{xs: 7, md: 9}}>
      <Container>
        <Stack 
        spacing={8} 
        direction={{xs: 'column-reverse', md:'row'}} 
        alignItems={{xs:'center', md: 'flex-start'}}
        textAlign={{xs: 'center', md: 'left'}}
        >
            <Box>
                <Typography 
                  component={'h1'} 
                  variant='h3' 
                  fontWeight={'bold'} 
                  mb={{xs: 3.5, md: 5}}
                >
                    Hi Im NgoAnh, <br/>
                    Web Developper
                </Typography>
                <Typography mb={{xs: 3.5, md: 5}}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                   Dolor voluptates voluptatum quasi, molestiae nam voluptate mollitia,
                   ex repellendus vel dolorem pariatur impedit eum exercitationem quisquam temporibus animi nihil natus beatae?
                </Typography>
                <Button variant='contained' size='large'>Download Resume</Button>
            </Box>

            <Box sx=
                {{
                 minWidth: '240px', 
                 boxShadow: '-5px 13px',
                 color: 'secondary.light',
                 height: '240px',
                 borderRadius: '50%'
                }} 
                >
                <Image src={avatar} width={240} height={240} alt='avata' style={{borderRadius: '50%'}} priority/>
            </Box>
        </Stack>
      </Container>
    </Box>
  );
}
