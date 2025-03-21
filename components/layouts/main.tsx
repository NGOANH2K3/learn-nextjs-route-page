import { LayoutProps } from '@/models/index';
import * as React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';

export function MainLayout ({children}: LayoutProps) {
    useEffect(()=>{
        console.log('MainLayout Mounting');
        return () => console.log('MainLayout UnMounting')
    },[])
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href='/'>
        home
      </Link>
      
      <Link href='/about'>
        About
      </Link>

      <div>
        {children}
      </div>
    </div>
  );
}
