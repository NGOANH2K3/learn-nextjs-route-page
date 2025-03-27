import { Facebook, GitHub, Instagram, YouTube } from '@mui/icons-material';
import { Box, Icon, Stack, Typography } from '@mui/material';
import * as React from 'react';


export function Footer () {
  const socialLink = [
    {
      icon: Facebook,
      url: 'https://google.com',
    },
    {
      icon: Instagram,
      url: 'https://google.com',
    },
    {
      icon: GitHub,
      url: 'https://google.com',
    },
    {
      icon: YouTube,
      url: 'https://google.com',
    },
  ]

  return (
    <Box component='footer' py={2} textAlign='center'>
      <Stack direction={'row'} justifyContent={'center'}>
        {socialLink.map((item, index )=> (
          <Box key={index} component={'a'} p={2} href={item.url} target='_blank' rel='noopener noreferrer'>
            <Icon component={item.icon} sx={{fontSize: 48}}/>
          </Box>
        ))}
      </Stack>
      <Typography>
      Copyright ©{new Date().getFullYear()} All rights reserved
      </Typography>
    </Box>
  );
}
