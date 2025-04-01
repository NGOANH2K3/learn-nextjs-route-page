import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
}
export function Auth ({ children }: AuthProps ) {
    const router = useRouter()
    const {profile, fisrtLoading } = useAuth()

    useEffect(()=> {
        if (!fisrtLoading && !profile?.username) router.push('/login')
    }, [router, profile, fisrtLoading]) 

    if (!profile?.username) return <p>Loading...</p>

    return <div> {children} </div>
}
