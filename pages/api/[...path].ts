// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'
export const config = {
    api: {
        bodyParser: false,
    },
}

const proxy = httpProxy.createProxyServer()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler( req: NextApiRequest,res: NextApiResponse<any>) {
    return new Promise(()=> {
        // convert cookies to header Authorization 
        const cookies = new Cookies(req, res)
        const accessToken = cookies.get('access_token')
        if(accessToken){
            req.headers.authorization = `Bearer ${accessToken}`
        }
        // don't send cookies to api server
        req.headers.cookie = ''
        
        // /api/studentsy
        // https://js-post-api.herokuapp.com/api/studentsy
        
        proxy.web(req,res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false,
        })
        // res.status(200).json({ name: 'Path - Match all here' })

        
    })
}