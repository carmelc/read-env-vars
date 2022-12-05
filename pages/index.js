import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const queryParams = router.query;
  return (
    <div className="container">
      <Head>
        <title>format env params</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Format env param!" />
        <textarea style={{width: '100%', height: '100%'}} value={
          Object.keys(queryParams).map(paramKey => `${paramKey}=${queryParams[paramKey]}`).join('\n')
        }/>
      </main>

      <Footer />
    </div>
  )
}
