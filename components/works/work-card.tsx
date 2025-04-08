import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface WorkCardProps {
    work: Work
}

export function WorkCard ({work}: WorkCardProps) {
  return (
    <Link href={`/works/${work.id}/detail`} passHref>
    <Stack direction={{xs:'column', md: 'row'}} spacing={2}>
      <Box width={{xs: '100%', md:'240px'}}  height={{ xs: "240px", md: "180px" }} position="relative" flexShrink={0}>
        <Image 
            src={work.thumbnailUrl} 
            fill
            alt='thumb' 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
        />
      </Box>
      <Box>
        <Typography variant='h4' fontWeight={'bold'}>
            {work.title}
        </Typography>

        <Stack direction={'row'} my={2}>
            <Chip color='secondary' label={new Date(Number.parseInt(work.createdAt)).getFullYear()}  size='small'/>
            <Typography ml={3} color='GrayText'>{work.tagList.join(', ')}</Typography>
        </Stack>

        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
    </Link>
  );
}
