import { PostItem } from '@/components/blog'
import { MainLayout } from '@/components/layouts'
import { Post } from '@/models'
import { getPostList } from '@/utils/posts'
import { Box, Container, Divider } from '@mui/material'
import { GetStaticProps } from 'next'
import Link from 'next/link'
export interface BlogListPageProps {
	
	blogs: Post[]
}

export default function BlogListPage({ blogs }: BlogListPageProps) {
	console.log('posts', blogs)

	return (
		<Box>
			<Container>
				<h1>Blog</h1>

				<Box component={'ul'} sx={{listStyleType:'none', p:0}}>
					{blogs.map((blog) => (
						<li key={blog.id}>
							<Link href={`/blogs/${blog.slug}`}>
							<PostItem post={blog}/>
							</Link>

							<Divider sx={{my: 3}}/>
						</li>
					))}
				</Box>
			</Container>
		</Box>
	)
}

BlogListPage.Layout = MainLayout 

export const getStaticProps: GetStaticProps<BlogListPageProps> = async ( ) => {
	
	// convert markdown files into list of javascpit object
	const postList = await getPostList()
	return {
		props: {
			
			blogs: postList
		},
	}
}