import { WorkCard } from '@/components/works/work-card';
import { Work } from '@/models';
import { Box, Divider } from '@mui/material';
import React, { Fragment } from 'react';

export interface WorkListProps {
    workList: Work[]
}


export function WorkList ({workList}: WorkListProps) {
    if(workList.length === 0) return null
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
