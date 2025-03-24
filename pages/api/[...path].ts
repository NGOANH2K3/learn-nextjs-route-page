// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'

export const config = {
    api: {
        bodyParser: false,
    },
}

const proxy = httpProxy.createProxyServer()
export default function handler(
req: NextApiRequest,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
res: NextApiResponse<any>
) {
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
}