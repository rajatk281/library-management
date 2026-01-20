"use client"

import AuthForm from "@/components/AuthForm"
import { signInWithCredebntials } from "@/lib/actions/auth"
import { signInSchema } from "@/lib/validations"
import { email } from "zod"

const page = () => (
  <AuthForm
  type="SIGN_IN"
  schema={signInSchema}
  defaultValues={{
    email:"",
    password:"",
  }}
  onSubmit={signInWithCredebntials} 
  />
  
)

export default page