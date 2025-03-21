import '../styles/globals.css'

import { EmptyLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'

function MyApp({Component, pageProps}: AppPropsWithLayout){
    console.log('app re-render')
    const Layout =  Component.Layout ?? EmptyLayout
    return(
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
}
export default MyApp