// import Header from '@/components/header';
import Header from '@/components/header';
import { MainLayout } from '@/components/layouts';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import  React from 'react';
// const Header = dynamic(()=> import('@/components/header'), {ssr: false})
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AboutPageProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AboutPage (props: AboutPageProps) {
  const router = useRouter()
  console.log('About query', router.query)
  return (
    <div>
        About Page
        <Header/>
    </div>
  )
}
AboutPage.Layout = MainLayout
// const async function getStaticProps() {
//   console.log('get static props')
//   return {
//     props: {}
//   }
// }

