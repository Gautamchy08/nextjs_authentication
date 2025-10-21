"use client"

import OtpUI from '@/components/OtpUI'
import PasswordUI from '@/components/PasswordUI'
import Link from 'next/link'
import React, { useState } from 'react'

 export default function Page() {
  

  const [isPasswordForget, setIsPasswordForget] = useState(false)
  
  return (
     <div  className=' bg-black text-white min-h-screen flex flex-col   gap-2 justify-center items-center'>




      {
        isPasswordForget ?<OtpUI   setIsPasswordForget={ setIsPasswordForget}/>:<PasswordUI setIsPasswordForget = {setIsPasswordForget} />

      }
         
             
               

         

               </div>

  )
}





