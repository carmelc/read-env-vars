import Head from 'next/head'
import Footer from '@components/Footer'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Wix Anywhere Funnel Home</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Footer/>
    </div>
  )
}
