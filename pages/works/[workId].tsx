import { MainLayout } from '@/components/layouts';
import { WorkForm } from '@/components/works';
import { useWorkDetail } from '@/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddEditWorksPageProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddEditWorksPage (props: AddEditWorksPageProps) {
  const route = useRouter()
  const {workId} = route.query
  const isAddMode = workId === 'add'
  
  const {data: workDetail, isLoading} = useWorkDetail({
    workId: (workId as string ) || '',
    enabled: route.isReady && !isAddMode
    
  })

  console.log({ workDetail, isLoading});
  
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={'h1'} variant='h3' fontWeight={'bold'}>
            {isAddMode ? 'Add new work' : `Edit work #${workId}`}
          </Typography>
        </Box>
        <Box>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, natus quidem. Magni, totam quos, animi amet delectus repellendus nulla, cum rem atque corporis adipisci accusamus repellat. Quam hic amet perspiciatis.
        </Box>
        <Box>
          {(isAddMode || Boolean(workDetail)) && (<WorkForm initialValues={workDetail} onSubmit={() => {}}/>)}
        </Box>
      </Container>
    </Box>
  );
}

AddEditWorksPage.Layout = MainLayout