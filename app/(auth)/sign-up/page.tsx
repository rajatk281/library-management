"use client"
import AuthForm from "@/components/AuthForm"
import { signUp } from "@/lib/actions/auth"
import { signUpSchema } from "@/lib/validations"
import { email } from "zod"

const page = () => (
  <AuthForm
  type="SIGN_UP"
  schema={signUpSchema}
  defaultValues={{
    fullName:"",
    email:"",
    password:"",
    universityID:0,
    universityCard:""
    
  }}
  onSubmit={signUp}
  />
  
)

export default page