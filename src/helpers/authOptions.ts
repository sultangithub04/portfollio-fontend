import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn:"/login"
    }
}
