import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" >
      <Head />
      <body className='bg-gray-50 dark:bg-slate-800  dark:text-white antialiased'>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
