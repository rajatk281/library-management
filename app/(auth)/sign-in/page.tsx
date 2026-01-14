"use client"

import AuthForm from "@/components/AuthForm"
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
  onSubmit={()=>{}}
  />
  
)

export default page