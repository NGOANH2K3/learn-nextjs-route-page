import { WorkList } from '@/components/works';
import { Work } from '@/models';
import { Box, Container, Typography } from '@mui/material';


export function FeaturedWork () {
    const workList: Work[] = [
        {
            id: '1',
            title: 'java ',
            createdAt: '1743045786405',
            updatedAt:'1743045786405',
            tagList: ['FullStack'],
            shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequatur non alias iusto qui pariatur nisi, officiis explicabo repellendus perferendis cumque placeat, officia optio nesciunt tenetur, laboriosam tempore fuga eum.',
            fullDescription: '',
            thumbnailUrl: 'https://res.cloudinary.com/dr3f1lp7e/image/upload/v1743059372/item01_d14crd.jpg',
        },
        {
            id: '2',
            title: 'Nextjs & Typescript',
            createdAt: '1743045786405',
            updatedAt:'1743045786405',
            tagList: ['FontEnd'],
            shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequatur non alias iusto qui pariatur nisi, officiis explicabo repellendus perferendis cumque placeat, officia optio nesciunt tenetur, laboriosam tempore fuga eum.',
            fullDescription: '',
            thumbnailUrl: 'https://res.cloudinary.com/dr3f1lp7e/image/upload/v1743059375/item02_akmn0u.jpg',
        },
        {
            id: '3',
            title: 'ReactJs',
            createdAt: '1743045786405',
            updatedAt:'1743045786405',
            tagList: ['TikTok'],
            shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequatur non alias iusto qui pariatur nisi, officiis explicabo repellendus perferendis cumque placeat, officia optio nesciunt tenetur, laboriosam tempore fuga eum.',
            fullDescription: '',
            thumbnailUrl: 'https://res.cloudinary.com/dr3f1lp7e/image/upload/v1743059376/item03_eemgel.jpg',
        },
    ]

  return (
    <Box component={'section'}  pt={2} pb={4}>
      <Container>
      <Typography variant='h5' mb={4}>Featured Works</Typography>

        <WorkList workList={workList}/>
      </Container>
    </Box>
  );
}
