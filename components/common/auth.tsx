import { useAuth } from '@/hooks';
import { encodeUrl } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    requireLogin?: boolean
}
export function Auth ({ children, requireLogin= false }: AuthProps ) {
    const router = useRouter()
    const {profile, fisrtLoading } = useAuth()

    useEffect(()=> {
         // do nothing if not require login 
        if(!requireLogin) return

        if (!fisrtLoading && !profile?.username) {
            router.replace(`/login?back_to=${encodeUrl(router.asPath)}`)
        } 
    }, [router, profile, fisrtLoading, requireLogin]) 

    if (requireLogin && !profile?.username) return <p>Loading...</p>

    return <div> {children} </div>
}
