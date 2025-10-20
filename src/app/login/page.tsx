"use client"

import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

 export default function Page() {

   const router = useRouter();
     const [user, setUser] = useState({
             email : "",
             password : ""
            
      })

      const [isSigningIn, setIsSigningIn] = useState(false)

      const onSignin = async ()=>{

         

        try {
        setIsSigningIn(true);

        if(!user.email ||!user.password){
          toast.error('email or passsword required')
          return;   
        }

        const response = await axios.post('/api/users/login',user);

        if(response.status === 200){
          toast.success('Sign in successful');
          router.push(`/profile/${response.data.user._id}`);
        }
        else {
          toast.error('Email or password incorrect');
        }

          
        } catch (error) {
          toast.error('error in login');
          console.log('error in login',error);
        }finally{
          setUser({
            email : '',
            password : ''
          })
          setIsSigningIn(false);
        }
      }
  return (
     <div  className=' bg-black text-white min-h-screen flex flex-col   gap-2 justify-center items-center'>
         

           <div className='flex  flex-col gap-2'>
            <label className='bg-wheat block text-center' htmlFor="email">email</label>
    
            <input className='bg-gray-50 text-black rounded-md textarea:text-center' type="email" name="email" 
            id="email"
                 
             placeholder='email'
             onChange={(e)=>{setUser({...user,email:e.target.value})}}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='bg-wheat block text-center' htmlFor="password">password</label>
    
            <input className='bg-gray-50 text-black rounded-md textarea:text-center' type="password" name="password" 
            id="password"
             
             placeholder='password'
             onChange={(e)=>{setUser({...user,password:e.target.value})}}
            />
          </div>
        
          <Button className='bg-white rounded-lg text-black px-3 py-2 cursor-pointer' 
          disabled = {isSigningIn}
          onClick={onSignin}>Login</Button>
    
    
          <Link href='/signup'>Signup here</Link>
        </div>
  )
}

