
import { authApi } from "@/api-client";
import { StorageKeys } from "@/constants";
import { loginPayload, UserProfile } from "@/models";
import useSWR, {SWRConfiguration} from "swr";

function getUserInfo(): UserProfile | null {
    try{
        return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {   
        return null
    }
}


export function useAuth(options?: Partial<SWRConfiguration>) {
	const {
		data: profile,
		error,
		mutate,
	} = useSWR<UserProfile | null>('/profile', {
		dedupingInterval: 60 * 60 * 1000, // 1hr
		revalidateOnFocus: false,
		...options,
		fallbackData: getUserInfo(),
		onSuccess(data) {
			// save user info to local storage
			localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data))
		},
		onError(err) {
			// failed to get profile --> logout
			console.log(err) // send error log to server if any
			logout()
		},
	})
 
    const fisrtLoading = profile === undefined && error === undefined
    async function login(payload: loginPayload) {
        await authApi.login(payload)

        await mutate()
    }

    async function logout() {
        
        await authApi.logout()
        mutate(null, false)
        
    }

    return{
        profile,
        error,
        login,
        logout,
        fisrtLoading,
    }
}