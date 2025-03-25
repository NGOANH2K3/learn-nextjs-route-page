import { LayoutProps } from '@/models/index';
import * as React from 'react';
import Link from 'next/link';
import { Auth } from '@/components/common';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';


export function AdminLayout ({children}: LayoutProps) {
  const {profile, logout} = useAuth()
  const router = useRouter()
  async function handleLogoutClick(){
    try{
      await logout()
      console.log('redirect to login page')
      router.push('/login')
    } catch (error) {
      console.log('failed to logout', error)
    }
  }
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>
      <p>Profile: {JSON.stringify(profile)}</p>
      <button onClick={handleLogoutClick}>Logout</button>

      <Link href='/'>
        home
      </Link>
      
      <Link href='/about'>
        About
      </Link>

      <div>
        {children}
      </div>
    </Auth>
  );
}
