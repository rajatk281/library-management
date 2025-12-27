import { ReactNode } from "react"
import Header from "@/components/Header"
const Layout = ({children} : {children:ReactNode}) => {
  return <main className="root-container">
    <div className="mx-auto max-w-7xl text-white">
        <Header/>
        <div>
          {children}
        </div>
    </div>
  </main>
}

export default Layout