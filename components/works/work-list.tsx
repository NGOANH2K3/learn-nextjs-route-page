import { WorkCard } from '@/components/works/work-card';
import { WorkSkeleton } from '@/components/works/work-skeleton';
import { Work } from '@/models';
import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Fragment } from 'react';

export interface WorkListProps {
    workList: Work[]
    loading?: boolean
}


export function WorkList ({workList, loading}: WorkListProps) {
    if(loading) return (
        <Box>
        {Array.from({length:3}).map((_, index) => (
            <Fragment key={index}>
                <WorkSkeleton />
                <Divider sx={{my:3}}/>
            </Fragment>
        ))}
    </Box>
    )

    if(workList.length === 0) return (
        <Box textAlign={'center'} mt={8}>
            <Image
                src={'https://res.cloudinary.com/dr3f1lp7e/image/upload/v1743069542/igmeTele_axfter.jpg'}
                width={250}
                height={250}
                priority
                alt='No data'
            />
            <Typography>No Data</Typography>
        </Box>
    )
  return (
    <Box>
        {workList.map(work => (
            <Fragment key={work.id}>
                <WorkCard work={work} />
                <Divider sx={{my:3}}/>
            </Fragment>
        ))}
    </Box>
  );
}
