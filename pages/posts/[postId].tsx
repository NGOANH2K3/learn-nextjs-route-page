import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PostDetailPageProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PostDetailPage (props: PostDetailPageProps) {
    const router = useRouter()
  return (
    <div>
       <h1> Post Detail Page </h1>

        <p>query: {JSON.stringify(router.query)}</p>
    </div>
  );
}

export interface PostListPageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        posts: any[]
    }
    
    export const getStaticPaths: GetStaticPaths = async () => {
       
        return{
            paths: [
                {params: {postId: '1'}},
                {params: {postId: '2'}},
                {params: {postId: '3'}},
                {params: {postId: '4'}},
            ],
            fallback: false
        }
    }
    
    export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
        console.log('\nGET STATIC PROPS', context.params?.postId)
    // server-side
    // build-time
    // console.log('static props')
        const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
        const data = await response.json()
        // console.log(data)
    
        return {
            props: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
            },
        }
    }
