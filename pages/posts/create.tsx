import  { useRouter } from 'next/router';
import  React, {useEffect,useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreatPostsPageProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CreatPostsPage (props: CreatPostsPageProps) {

  const [postList, setPostList] = useState([])
  const router = useRouter()

  console.log('render list', router.query)

  const page = router.query?.page

  // chỉ chạy bên phía client
  useEffect(()=>{
    if (!page) return
    ;(async ()=> {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
	    const data = await response.json()
      setPostList(data.data)
    })()
  },[page])

  function handleNextClick() {
		router.push(
			{
				pathname: '/posts/create',
				query: {
					page: (Number(page) || 1) + 1,
				},
			},
			undefined,
			{ shallow: true }
		)
	}
  return (
    <div>
      <h1>Create Posts Pages</h1>
      <ul>

        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          postList.map((post: any) => 
            (<li key={post.id}>{post.title}</li>))}
      </ul>

      <button onClick={handleNextClick}>next page</button>

    </div>
  );
}

export async function getStaticProps() {
  console.log('get static props')
  return {
    props: {},
  }
}