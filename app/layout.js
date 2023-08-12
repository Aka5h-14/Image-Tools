import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './navbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Image Tools',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <Navbar/>
      <body className={inter.className}>{children}
      </body>
    </html>
  )
}
