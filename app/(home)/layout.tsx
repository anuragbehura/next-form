import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import React, { ReactNode } from 'react'

function Layout({children}:{children: ReactNode}) {
  return <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
    <Nav />
    <main className="flex w-full flex-grow">{children}</main>
    <Footer />
    </div>
}

export default Layout;