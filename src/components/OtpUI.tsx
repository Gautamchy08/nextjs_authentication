import { useState } from "react"
import { Button } from "./ui/button"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"


export   default function OtpUI ({setIsPasswordForget}:{setIsPasswordForget : (value:boolean)=>void}){


    const router = useRouter()

 const [user, setUser] = useState({
    email : "",
    OTP : ""
 })

 const [submitting, setSubmitting] = useState(false)

 const onSubmit = async ()=>{

    try {

        setSubmitting(true);



      
        router.push('/profile')
    } catch (error) {
         
        console.log('failed to submit OTP',error);
        toast.error('failed to submit OTP');
        
    }finally {
        setSubmitting(false);
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
            <label className='bg-wheat block text-center' htmlFor="password">OTP</label>
    
            <input className= 'px-2 bg-gray-50 text-black rounded-md textarea:text-center' type="OTP" name="OTP" 
            id="OTP"
             
             placeholder='OTP'
             onChange={(e)=>{setUser({...user,OTP:e.target.value})}}
            />
          </div>
        
          <Button className='bg-white mt-2 rounded-lg text-black px-3 py-2 cursor-pointer hover:text-white' 
          disabled = {submitting}
          onClick={onSubmit}>Submit</Button>

             <Link className='block text-green-500 hover:rounded-lg hover:bg-gray-900 hover:text-white hover:px-2 hover:py-1 transition-all ease-in-out '  
              href={'/login'}> <a
              onClick={()=>setIsPasswordForget(false)} >Back to Login</a></Link>

               <Link className='block text-green-500 hover:rounded-lg hover:bg-gray-900 hover:text-white hover:px-2 hover:py-1 transition-all ease-in-out  ' href='/signup'>Signup here</Link>
</div>
      </div>

    )
}