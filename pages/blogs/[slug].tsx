import { Seo } from '@/components/common/SEO';
import { MainLayout } from '@/components/layouts';
import { Post } from '@/models';
import { getPostList } from '@/utils/posts';
import { Box, Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Script from 'next/script';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';

export interface BlogDetailPageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: any
}


export default function BlogDetailPage ({post}: BlogDetailPageProps) {

    if(!post) return null;
  return (
    <Box>
        <Seo data={{
            title: `${post.title} | NgoAnh Blog`,
            description: post.description,
            url: `${process.env.HOST_URL}/blogs/${post.slug}`,
            thumbnaiUrl: post.thumbnaiUrl || 'https://res.cloudinary.com/dr3f1lp7e/image/upload/v1743069542/igmeTele_axfter.jpg',
          }}/>
        <Container>
            <p>{post.title}</p>
            <p>{post.author?.name}</p>
            <p>{post.description}</p>
            <div dangerouslySetInnerHTML={{__html: post.htmlContent || ''}}></div>
        </Container>
        <Script src='/prism.js' strategy='afterInteractive'></Script>
    </Box>
  );
}
BlogDetailPage.Layout = MainLayout 

    
    export const getStaticPaths: GetStaticPaths = async () => {
       console.log('\nGET STATIC PROPS');
       const postList = await getPostList()
        
        
        return{
            paths: postList.map((post: Post) => ({params: {slug: post.slug}})),
            fallback: false
        }
    }
    
    export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async (context: GetStaticPropsContext) => {
        const postList = await getPostList()
        const slug = context.params?.slug
        if(!slug)return{ notFound:true }

        const post = postList.find(x => x.slug === slug)
        if(!post) return {notFound: true}

        // parse md to html
        const file = await unified()
            .use(remarkParse)
            .use(remarkToc, {heading: 'Agenda.*'})
            .use(remarkRehype)
            .use(rehypePrism, )
            .use(rehypeSlug)
            .use(rehypeAutoLinkHeadings, {behavior: 'wrap'})
            .use(rehypeDocument, {title: 'Blog Detail Page'})
            .use(rehypeFormat)
            .use(rehypeStringify)
            .process(post.mdContent || '');

        post.htmlContent = file.toString()
        return {
            props: {
                post,
            },
        }
    }
