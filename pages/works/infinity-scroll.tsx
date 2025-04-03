import { MainLayout } from '@/components/layouts';
import { WorkList } from '@/components/works';
import { WorkFilters } from '@/components/works/work-filters';
import { useWorkListInfinity } from '@/hooks/use-work-list-infinity';
import { ListParams, ListResponse, Work, WorkFiltersPayLoad } from '@/models';
import { Box, Button, CircularProgress, Container, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {useInView} from 'react-intersection-observer'
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorksPageProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorksPage (props: WorksPageProps) {
  const route = useRouter()
  const filters: Partial<ListParams>= {
    ...route.query
  }

  const initFiltersPayload: WorkFiltersPayLoad = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  }


 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data, isLoading, isValidating, size, setSize} = useWorkListInfinity({params:filters, enabled: route.isReady})

  const workList: Array<Work> = data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>)=> {
    result.push(...currentPage.data)

    return result
  },[]) || []

  const totalRows = data?.[0]?.pagination?._totalRows || 0
  const showLoadMore = totalRows > workList.length
  const loadingMore = isValidating && workList.length > 0
  const {ref} = useInView({
    onChange(inView){
      if(inView) setSize(x => x+1)
    }
  })

  function handleFilterChange(newFilter: WorkFiltersPayLoad) {
  route.push(
    {
      pathname: route.pathname,
      query: {
        ... filters,
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
        ) : (
            <Skeleton 
              variant='rectangular' 
              height={40} 
              sx={{
                display:'inline-block',   
                width:'100%', 
                mt:2 , 
                mb:1, 
                verticalAlign:'middle'
                }}
              />
            )}

        <WorkList workList={workList} loading={!route.isReady || isLoading} />
        {showLoadMore && (
          <Button ref={ref} variant='contained' onClick={()=> setSize((x)=> x+1)} disabled={loadingMore}>
          Load More { loadingMore && <CircularProgress size={24}  />}
        </Button> 
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