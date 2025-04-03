import { MainLayout } from '@/components/layouts';
import { WorkList } from '@/components/works';
import { WorkFilters } from '@/components/works/work-filters';
import { useWorkList } from '@/hooks';
import { ListParams, WorkFiltersPayLoad } from '@/models';
import { Box, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorksPageProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorksPage (props: WorksPageProps) {
  const route = useRouter()
  const filters: Partial<ListParams>= {
    _page:1,
    _limit:3,
    ...route.query
  }

  const initFiltersPayload: WorkFiltersPayLoad = {
    search: filters.title_like || '',
    tagList_like: '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  }


  const {data, isLoading} = useWorkList({params:filters, enabled: route.isReady})
  const {_limit, _totalRows, _page} = data?.pagination || {}
  const totalPage = Boolean(_totalRows) ? Math.ceil(_totalRows/_limit): 0


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    route.push(
      {
        pathname: route.pathname,
        query: {
          ... filters,
          _page: value
        },
      },
      undefined,
      {shallow: true}
    )
  }

  function handleFilterChange(newFilter: WorkFiltersPayLoad) {
  route.push(
    {
      pathname: route.pathname,
      query: {
        ... filters,
        _page: 1,
        title_like: newFilter.search,
        tagList_like: newFilter.tagList_like,
      },
    },
    undefined,
    {shallow: true}
  )
}

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={'h1'} variant='h3' fontWeight={'bold'}>Works Page</Typography>
        </Box>

        {route.isReady ? (
          <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFilterChange} />
        ) : <Skeleton variant='rectangular' height={40} sx={{display:'inline-block', width:'100%', mt:2 , mb:1}}/>}
        <WorkList workList={data?.data || []} loading={!route.isReady || isLoading} />

        {totalPage > 0  && (
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