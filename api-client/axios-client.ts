import axios from "axios"


    const axiosClient = axios.create({
        baseURL: '/api',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    axiosClient.interceptors.response.use(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (response:any) {
        return response.data
        },
        function (error){
            return Promise.reject(error)
        }
    )

    export default axiosClient