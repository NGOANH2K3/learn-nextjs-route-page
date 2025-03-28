import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react';

export interface PostPageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: any
}


export default function PostDetailPage ({post}: PostPageProps) {
   
    const router = useRouter()
    if (router.isFallback){
        return <div style={{fontSize: '2rem', textAlign: 'center'}}>Loading...</div>
    }

    if(!post) return null;
  return (
    <div>
       <h1> Post Detail Page </h1>

        <p>{post.title}</p>
        <p>{post.author}</p>
        <p>{post.description}</p>
    </div>
  );
}


    
    export const getStaticPaths: GetStaticPaths = async () => {
       console.log('\nGET STATIC PROPS');
       const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
        const data = await response.json()
        
        return{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            paths: data.data.map((post: any) => ({params: {postId: post.id}})),
            fallback: true
        }
    }
    
    export const getStaticProps: GetStaticProps<PostPageProps> = async (context: GetStaticPropsContext) => {
        console.log('\nGET STATIC PROPS', context.params?.postId)
        const postsId = context.params?.postId
        if(!postsId)return{ notFound:true }
    // server-side
    // build-time
    // console.log('static props')
        const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postsId}`)
        const data = await response.json()
        // console.log(data)
    
        return {
            props: {
                post: data
            },
            revalidate: 300,
        }
    }
