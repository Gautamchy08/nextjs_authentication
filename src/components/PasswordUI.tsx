"use client"

import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

 export default function PasswordUI({setIsPasswordForget}: {setIsPasswordForget: (value: boolean) => void}) {

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
         
       <div className='bg-gray-600 h-[300px] w-[350px] px-2 flex flex-col justify-center items-center gap-2'>

           <div className='flex  flex-col gap-2'>
            <label className='bg-wheat block text-center' htmlFor="email">email</label>
    
            <input className= ' px-2 bg-gray-50 text-black rounded-md textarea:text-center' type="email" name="email" 
            id="email"
                 
             placeholder='email'
             onChange={(e)=>{setUser({...user,email:e.target.value})}}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='bg-wheat block text-center' htmlFor="password">password</label>
    
            <input className= 'px-2 bg-gray-50 text-black rounded-md textarea:text-center' type="password" name="password" 
            id="password"
             
             placeholder='password'
             onChange={(e)=>{setUser({...user,password:e.target.value})}}
            />
          </div>
        
          <Button className='bg-white mt-2 rounded-lg text-black px-3 py-2 cursor-pointer hover:text-white' 
          disabled = {isSigningIn}
          onClick={onSignin}>Login</Button>

             <Link className='block text-green-500 hover:rounded-lg hover:bg-gray-900 hover:text-white hover:px-2 hover:py-1 transition-all ease-in-out '
                
                href={'/login'}> <a
                 onClick={()=>setIsPasswordForget(true)} >Forgot Password?</a></Link>

                  <Link className='block text-green-500 hover:rounded-lg hover:bg-gray-900 hover:text-white hover:px-2 hover:py-1 transition-all ease-in-out  ' href='/signup'>Signup here</Link>


    
    
        </div>
               </div>

  )
}





