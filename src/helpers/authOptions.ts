import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        };
    }
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.error("Email or Password is missing");
                    return null
                }


                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );
                    // console.log("Response From Backend:", res);
                    if (!res?.ok) {
                        console.error("Login Failed", await res.text());
                        return null;
                    }

                    const user = await res.json();

                    if (user.id) {
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email,
                            image: user?.picture,
                        
                        };
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error(err);
                    return null;
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user?.id
                token.role=user?.role
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token?.id as string
                session.user.role = token?.role as string
            }
            return session
        },
        async signIn({ user, account }) {
            console.log("check auth", user);
            console.log(account);
            if (account?.provider === "google") {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API}/auth/google`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: user.name,
                                email: user.email,
                                role: "USER",                            // backend expects this
                                phone: null,                             // optional
                                picture: user.image,                     // from Google
                                status: "ACTIVE",                        // backend default
                                isVerified: true                         // since Google verifies
                            }),
                        }
                    );

                    if (!res.ok) {
                        console.error("❌ Failed to sync Google user:", await res.text());
                        return false; // stop login
                    }

                    const dbUser = await res.json();
                    console.log("✅ Google user synced to DB:", dbUser);

                    return true; // allow login
                } catch (error) {
                    console.error("❌ Error syncing Google user:", error);
                    return false; // stop login
                }
            }

            // Default for Credentials or other providers
            return true;
        },
        

    },


    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}
