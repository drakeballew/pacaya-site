import { type Metadata } from 'next'
import Head from 'next/head'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

import favicon from '/favicon.ico'

export const metadata: Metadata = {
  title: {
    template: '%s - Pacaya Digital',
    default: 'Pacaya Digital - Experts in Startup Growth',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
