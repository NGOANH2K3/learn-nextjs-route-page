import { MainLayout } from '@/components/layouts';
import { WorkList } from '@/components/works';
import { WorkFilters } from '@/components/works/work-filters';
import { useWorkList } from '@/hooks';
import { ListParams, WorkFiltersPayLoad } from '@/models';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorksPageProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorksPage (props: WorksPageProps) {
  const [filters,setFilters] = useState<Partial<ListParams>>({_page:1, _limit:3})

  const {data, isLoading} = useWorkList({params:filters})
  console.log({data,  isLoading})

  const {_limit, _totalRows, _page} = data?.pagination || {}
  const totalPage = Boolean(_totalRows) ? Math.ceil(_totalRows/_limit): 0


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // setPage(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: value,

    }))
  }

  function handleFilterChange(newFilter: WorkFiltersPayLoad) {
    console.log('Page Level receive from data', newFilter)
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: 1,
      title_like: newFilter.search

    }))
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={'h1'} variant='h3' fontWeight={'bold'}>Works Page</Typography>
        </Box>

        <WorkFilters onSubmit={handleFilterChange} />
        <WorkList workList={data?.data || []} loading={isLoading} />

        {totalPage> 0  && (
          <Stack alignItems={'center'} >
            <Pagination count={totalPage} page={_page} onChange={handlePageChange}></Pagination>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

WorksPage.Layout = MainLayout

export async function getStaticProps() {
  console.log('get static props')
  return {
    props: {}
  }
}