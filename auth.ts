import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./Database/Drizzle"
import { users } from "./Database/Schema"
import { eq } from "drizzle-orm"
import bcrypt, { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('No credentials provided')
                }
                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, String(credentials.email)))
                    .limit(1);

                if (user.length === 0) {
                    throw new Error('No user found')
                }

                const isPasswordValid = await compare(credentials.password.toString(), user[0].password)

                if (!isPasswordValid) {
                    throw new Error('Incorrect password')
                }

                return {
                    id: user[0].id,
                    name: user[0].fullName,
                    email: user[0].email,
                } as User
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