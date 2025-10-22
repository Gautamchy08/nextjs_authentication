"use client";

import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";


export default function VerifyEmailPage(){

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)


    const verifyUserEmail = async()=>{
        try {
        const response = await axios.post('/api/users/verifyEmail',{token});
        if(response.status===200){
            setVerified(true);
            setError(false);
        }
        else {
            setError(true);
            setVerified(false);
        }
        
    } catch (error) {

        setError(true);
        console.log(error)

    }
    }


    useEffect(()=>{

        const urlToken = window.location.search.split('token=')[1] || "";
        setToken(urlToken);
    },[]);

    useEffect
    (()=>{
        if(token.length > 0 ) 
        verifyUserEmail();
    },[token]);

    return(
        <div className="min-h-screen flex justify-center items-center py-2">
             <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )


}