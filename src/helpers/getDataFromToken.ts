import { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from 'jose';

interface TokenPayload extends JWTPayload {
  id: string;
  email: string;
  username: string;
}

export async function getdataFromToken(req: NextRequest): Promise<TokenPayload | null> {
  try { 
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return null;
    }

    // Convert the secret to the format required by jose
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    
    // Use jose library for Edge Runtime compatibility
    const { payload } = await jwtVerify(token, secret);
    
    const decoded = payload as TokenPayload;
    console.log('Decoded token from getDataFromToken:', decoded); 
    
    
    if (!decoded || !decoded.id) {
      throw new Error('Invalid token data');
    }

    return decoded;
    
  } catch (error) {
    console.log('Error in getDataFromToken token verification:', error);  
    return null;
  }
}