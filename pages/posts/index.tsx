// import {  GetStaticProps, GetStaticPropsContext } from 'next';
// import * as React from 'react';


// export interface PostsPageProps {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     posts: any[]
// }



// export default function PostsPage ({posts}: PostsPageProps) {
//   return (
//     <div>
//        <h1>Posts Pages</h1>
//        <ul>
//        {
//           posts.map((post) => (<li key={post.id}>{post.title}</li>))
//         }
//         </ul> 
//     </div>
//   );
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getStaticProps: GetStaticProps<PostsPageProps> = async (context: GetStaticPropsContext) =>{


//     // server-side
//     // build-time
//     console.log('static-props')
   
//     const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
//     const data = await response.json()
//     console.log(data)
//     return{
//         props: {
//             posts: data.data
//         }
//     }
// }

import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
export interface PostListPageProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	posts: any[]
}

export default function PostListPage({ posts }: PostListPageProps) {
	// console.log('posts', posts)

	return (
		<div>
			<h1>Post List Page</h1>

			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/posts/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	context: GetStaticPropsContext
) => {
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