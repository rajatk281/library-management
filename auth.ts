import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./Database/Drizzle"
import { users } from "./Database/Schema"
import { eq } from "drizzle-orm"
import bcrypt, { compare } from "bcryptjs";
import { Toast } from "./components/Toaster"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log("No credentials provided:")
                        return null; 
                    }
                    console.log("EMAIL FROM FORM:", credentials.email);

                    const user = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, String(credentials.email)))
                        .limit(1);

                    console.log("USER FROM DB:", user);


                    if (user.length === 0) {
                        console.log("user not exist")
                        // Toast(message : "")
                        return null; 
                    }

                    const isPasswordValid = await compare(
                        credentials.password.toString(),
                        user[0].password
                    );

                    if (!isPasswordValid) {
                        console.log("Invalid password")
                        return null;
                    }

                    return {
                        id: user[0].id,
                        name: user[0].fullName,
                        email: user[0].email,
                    } as User;

                    console.log(user)

                } catch (err) {
                    console.error("AUTHORIZE ERROR:", err);
                    return null; 
                }
            }
        })

    ],

    pages: {
        signIn: '/sign-in',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.name as string
            }
            return session
        }
    }
})