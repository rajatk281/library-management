import { ReactNode } from 'react'
import Image from 'next/image'
const layout = ({children}:{children : ReactNode}) => {
  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box'>
            <Image src='/icons/logo.svg' alt='logo' width={37} height={37}/>
        </div>
      </section>
    </main>
  )
}

export default layout
