import { ReactNode } from "react";
import "./globals.css";
import { Inter } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
})
const LayoutHome = ({children}:{children: ReactNode}) => {
    return (
        <html className={`${inter.className} h-screen`}>
            <body> 
                {children}
            </body>
        </html>
     );
}
 
export default LayoutHome;