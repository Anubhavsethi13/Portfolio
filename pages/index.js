import Head from 'next/head'
import Cursor from '../components/Cursor'
import Desktop from '../components/Desktop'
import IntroLoader from '../components/IntroLoader'

export default function Home() {
  return (
    <>
      <Head>
        <title>Anubhav Sethi — Web Developer & Graphics Designer</title>
        <meta name="description" content="Portfolio of Anubhav Sethi — Web Developer & Graphics Designer engineering clean, performant apps and user experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Anubhav Sethi — Web Developer & Graphics Designer" />
        <meta property="og:description" content="Portfolio of Anubhav Sethi — Web Developer & Graphics Designer." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <IntroLoader />
      <Cursor />

      <main>
        <Desktop />
      </main>
    </>
  )
}
