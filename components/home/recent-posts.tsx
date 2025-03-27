
import { PostCard } from '@/components/home/posts-card';
import { Post } from '@/models';
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import Link from 'next/link';


export function RecentPosts () {
    const postList: Post[] = [
        {
            id: '1',
            title: 'Khóa học java - từ A-Z',
            publishedDate: '1743045786405',
            tagList: ['FullStack', 'BackEnd'],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequatur non alias iusto qui pariatur nisi, officiis explicabo repellendus perferendis cumque placeat, officia optio nesciunt tenetur, laboriosam tempore fuga eum.',
        },
        {
            id: '2',
            title: 'Khóa học Nextjs & Typescript - từ A-Z',
            publishedDate: '1743045786405',
            tagList: ['FontEnd', 'Rest-API'],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequatur non alias iusto qui pariatur nisi, officiis explicabo repellendus perferendis cumque placeat, officia optio nesciunt tenetur, laboriosam tempore fuga eum.',
        },
    ]

  return (
    <Box component={'section'} bgcolor={'secondary.light'} pt={2} pb={4}>
      <Container>
        <Stack 
            direction={'row'} mb={2} 
            justifyContent={{xs: 'center', md:'space-between'}} 
            alignItems={'center'}
        >
            <Typography variant='h5'>Recent Posts</Typography>
            <Link href={'/blog'} passHref>
                <MuiLink component={'span'} sx={{display: {xs:'none', md: 'inline-block'}}}>
                    View all
                </MuiLink>
            </Link>
        </Stack>

        <Stack 
            direction={{xs:'column', md:'row'}}
            spacing={3} 
            sx={{
                '&>div':{
                    width:{
                        xs: '100%',
                        md: '50%'
                    }
                }
            }}
        >

            {postList.map((post) => (
            <Box key={post.id}>
              <PostCard post={post}/>
            </Box>
            ))}

        </Stack>
      </Container>
    </Box>
  );
}
