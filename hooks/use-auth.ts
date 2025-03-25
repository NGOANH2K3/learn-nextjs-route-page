
import { authApi } from "@/api-client";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";

export function useAuth(options?: Partial<PublicConfiguration>) {
    // profile
    const {data: profile, error, mutate,} = useSWR('/profile', {
        dedupingInterval: 60*60*1000,
        revalidateOnFocus: false,
        ...options,
    })
 
    const firstLoading = profile === undefined && error === undefined
    async function login() {
        await authApi.login({
            username: 'test',
            password: '123456',
        })

        await mutate()
    }

    async function logout() {
        
        await authApi.logout()
        mutate({}, false)
    }

    return{
        profile,
        error,
        login,
        logout,
        firstLoading,
    }
}