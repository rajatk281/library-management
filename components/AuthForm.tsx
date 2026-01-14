'use client';
import { zodResolver } from '@hookform/resolvers/zod'; //zodResolver → bridge hai jo Zod ko React Hook Form samajhne layak banata hai
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import z, { ZodType } from 'zod'; //React Hook Form → form handling ke liye library
import { Form } from '@/components/ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from 'next/link';
import { Path } from 'react-hook-form';
import ImageUpload from './ImageUpload';
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from './ui/form';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
  
  const isSignIn = type === 'SIGN_IN';

  // console.log(schema)

  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {};

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to bookish ' : 'Create your own account'}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? 'Access the vast collection of resources and stay updated '
          : 'Please Complete all fields and upload a valid university ID to gain access to the library  '}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((field) => (
            <FormField
            key={field as Path<T>} 
              control={form.control}
              name={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? 
                    (<ImageUpload onFileChange={field.onChange}/>) : (
                      <Input required 
                      type=
                        {FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                       {...field} className='form-input'/>
                    ) } 
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button className='form-btn' type="submit">{isSignIn?"Sign in" : "Sign up"}</Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to Bookish ? ' : 'Already have an account ? '}
        <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold text-primary">
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
