import React from 'react'

const page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
      <h1 className='fonts-bebas-neue text-5xl font-bold text-light-100'>
        Too many attempts!!
      </h1>
      <p className='mt-3 max-w-xl text-center text-light-400'>
        Whoa there! You’re clicking a little too fast. Please slow down and try again in a moment. This helps us keep everything fair and safe for everyone
      </p>

    </main>
  )
}

export default page