import axios from "axios"
import { AxiosError } from "axios";

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
        function (error: AxiosError){
            return Promise.reject(error.response?.data)
        }
    )

    export default axiosClient