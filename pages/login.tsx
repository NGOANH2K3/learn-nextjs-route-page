import * as React from 'react';
import  Styles  from '@/styles/login.module.css'
import { useAuth } from '@/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { authApi } from '@/api-client';
import { useRouter } from 'next/router';
import { LoginForm } from '@/components/auth';

export default function loginPage () {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {profile, login, logout} = useAuth({
        revalidateOnMount: false,
    })

    async function handleLoginClick(){
        try{
            await login()
            console.log('redirect to dashboard')
            router.push('/about')
        }
        catch (error){
            console.log('failed to login', error);
        }
    }

    // async function handleGetProfileClick(){
    //     try{
    //         await logout()
    //         console.log('redirect to login page')
    //     }
    //     catch (error) {
    //         console.log('failed to get profile', error);
    //     }
    // }

    async function handleLogoutClick(){
        try {
            await logout()
            console.log('redirect to login page')
        }
        catch (error) {
            console.log('failed to logout', error);
        }
    }

  return (
    <div className={Styles.login}>
      <h1 className={Styles.header}>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {},null, 4)}</p>

      <div className={Styles.btn}>
      <button className={Styles.btnlogin} onClick={handleLoginClick}>Login</button>
      {/* <button className={Styles.btnlogin} onClick={handleGetProfileClick}>Login</button> */}
      <button className={Styles.btnlogout} onClick={handleLogoutClick}>Logout</button>
      <button onClick={()=> router.push("/about")}>Go to about</button>
      </div>

      <LoginForm />
    </div>
  );
}
