import './globals.css'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/authProvider'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'CSI Recruitments 2025',
  icons: {
    icon: '/icons/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} bg-zinc-950`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
