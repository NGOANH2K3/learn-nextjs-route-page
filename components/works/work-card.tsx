import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface WorkCardProps {
    work: Work
}

export function WorkCard ({work}: WorkCardProps) {
  return (
    <Stack direction={{xs:'column', md: 'row'}} spacing={2}>
      <Box width={{xs: '100%', md:'240px'}}  height={{ xs: "240px", md: "180px" }} position="relative" flexShrink={0}>
        <Image 
            src={work.thumbnaiUrl} 
            fill
            alt='thumb' 
            priority
        />
      </Box>
      <Box>
        <Typography variant='h4' fontWeight={'bold'}>
            {work.title}
        </Typography>

        <Stack direction={'row'} my={2}>
            <Chip color='secondary' label= {work.createAt} size='small'/>
            <Typography ml={3} color='GrayText'>{work.tagList.join(', ')}</Typography>
        </Stack>

        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
  );
}
