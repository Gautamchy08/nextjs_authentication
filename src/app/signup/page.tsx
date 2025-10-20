"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const router = useRouter()
  
  const [user, setUser] = useState({
         email : "",
         password : "",
         username : ""
  })
const [signingUp, setSigningUp] = useState(false)
const onSignup = async ()=>{ 
  try{

    setSigningUp(true);
     const response =  await axios.post('/api/users/signup',user);

     if(response.status === 201){
      console.log('signup successfully',response.data);
      router.push('/login')
     }
     else {
      console.log('error in signup from frontend')
    }
    
  }catch(err){
    console.log("error",err);
  }finally{
    setSigningUp(false)
  }
 
}
  return (

    
      <div className='min-h-screen min-w-screen bg-black flex items-center justify-center'>
    <div  className=' bg-gray-800 text-white h-[300px] w-[400px]  rounded-lg flex flex-col   gap-2 justify-center items-center'>


   
      <div className='flex flex-col   gap-2 '>

        
        <label className='bg-wheat mr-2 block text-center' htmlFor="username">username</label>

        <input className='bg-gray-50 text-black h-[30px] rounded-md textarea:text-center px-2' type="text" name="username" 
        id="username"
         
         placeholder='username'
         onChange={(e)=>{setUser({...user,username:e.target.value})}}
        />
      </div>
      <div className='flex flex-col  gap-2'>
        <label className='bg-wheat block text-center' htmlFor="password">password</label>

        <input className=  '  h-[30px] bg-gray-50 text-black px-2 rounded-md textarea:text-center' type="password" name="password" 
        id="password"
         
         placeholder='password'
         onChange={(e)=>{setUser({...user,password:e.target.value})}}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='   bg-wheat block text-center' htmlFor="email">email</label>

        <input className='  h-[30px] bg-gray-50 text-black px-2 rounded-md textarea:text-center' type="email" name="email" 
        id="email"
             
         placeholder='email'
         onChange={(e)=>{setUser({...user,email:e.target.value})}}
        />
      </div>
      <Button className='bg-white rounded-lg text-black  font-stretch-95% px-3 py-2 cursor-pointer' 
       disabled = {signingUp}
      onClick={onSignup}>Signup</Button>

      <Link href='/login' className='text-blue-400 underline mt-4'>
        Already have an account? Login here
      </Link>
    </div>
       </div>

  )
}

