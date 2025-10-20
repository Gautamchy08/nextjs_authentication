"use client";

import { useState } from "react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";


 

interface PageProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: PageProps) {
    const router = useRouter();


    const [loggingOut, setLoggingOut] = useState(false)
    const logOut =async function (){

        try {
            setLoggingOut(true);
            const response = await axios.get('/api/users/logout');

            if(!response){
                toast.error('error in logging out')
                return;
            }

            console.log('response from logout',response);
            toast.success('log out successfully')

            router.push('/login');
        } catch (error) {
            console.log('error in logging out',error); 
        }finally{
            setLoggingOut(false);
        }

    }


  return (     <div className="bg-black min-h-screen  m">

    <nav className="w-full h-[50px] px-3 py-2 text-center  bg-gray-500 text-black">

        <Button 
        className="cursor-pointer"
            disabled = {loggingOut}
          onClick={logOut}
        >Logout</Button>

    </nav>

  
  <div className=" bg-black h-full text-white p-3 flex flex-col justify-center items-center">


            <h1 className="text-xl"> profile</h1>

            <h1 className="text-4xl"> heyy i am from profile {params.id}</h1>


  </div>
        </div>)

 }