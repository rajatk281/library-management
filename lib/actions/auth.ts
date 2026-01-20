"use server"

import { signIn } from "@/auth"
import { db } from "@/Database/Drizzle"
import { users } from "@/Database/Schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params
    const result = await signIn("credentials", { email, password, redirect: false })
    if (result?.error) {
        return ({ success: false, message: result.error })
    }
    return { success: true }
}

export const signUp = async (params: AuthCredentials) => {

    const { fullName, email, password, universityID, universityCard } = params

    // Check if the user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existingUser.length > 0) {
        return { success: false, message: "User already exists" }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        await db.insert(users).values({
            id: uuidv4(),
            fullName,
            email,
            password: hashedPassword,
            universityID,
            universityCard
        })
        await signInWithCredentials({ email, password })
        return { success: true, message: "User created successfully" }

    } catch (error) {
        console.log(error)
        return { success: false, message: " Signup error " }
    }


}