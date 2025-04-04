import { MainLayout } from '@/components/layouts';
import { WorkForm } from '@/components/works';
import { useAddwork, useWorkDetail } from '@/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { toast } from 'react-toastify';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddEditWorksPageProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddEditWorksPage (props: AddEditWorksPageProps) {
  const route = useRouter()
  const {workId} = route.query
  const isAddMode = workId === 'add'
  
  const {data: workDetail, isLoading, updateWork} = useWorkDetail({
    workId: (workId as string ) || '',
    enabled: route.isReady && !isAddMode
    
  })
  const addNewWork = useAddwork()

  console.log({ workDetail, isLoading });

  async function handleSubmit(payload:FormData) {
    try{
      if(isAddMode){
        const newkork = await addNewWork(payload)
        toast.success(`add new successfully, ${newkork?.id}`)
      } else {
        await updateWork(payload)
        toast.success('update work successfully')
      }

      
    } catch (error) {
      console.log(error);
    }
  }
  
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
          {(isAddMode || Boolean(workDetail)) && (<WorkForm initialValues={workDetail} onSubmit={handleSubmit}/>)}
        </Box>
      </Container>
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
    </Box>
  );
}

AddEditWorksPage.Layout = MainLayout