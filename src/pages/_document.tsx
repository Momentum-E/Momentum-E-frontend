import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* [#060e02] */}
      <body className='bg-white-100 dark:bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
