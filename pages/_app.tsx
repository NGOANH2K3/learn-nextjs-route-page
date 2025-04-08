import axiosClient from '@/api-client/axios-client'
import { EmptyLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import { createEmotionCache, theme } from '@/utils'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr'
import '../styles/globals.css'
import '../styles/prism.css'
import React from 'react'
import { Auth } from '@/components/common'
const clientSideEmotionCache = createEmotionCache()

function MyApp({Component, pageProps}: AppPropsWithLayout){
    const Layout =  Component.Layout ?? EmptyLayout;
    return (
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
              <Layout>
                <Auth requireLogin={Component.requireLogin ?? false}>
                <Component {...pageProps} />
                </Auth>
              </Layout>
            </SWRConfig>
          </ThemeProvider>
        </CacheProvider>
      );

}
export default MyApp