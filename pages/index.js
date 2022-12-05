import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {useRouter} from 'next/router'
import {useEffect, useState} from "react";

export default function Home() {
  const [envVars, setEnvVars] = useState(null);
  const router = useRouter();
  const queryParams = router.query;
  const {apiKey, metasiteId, accountId} = queryParams;
  useEffect(() => {
    if (apiKey && metasiteId && accountId) {
      fetch('/wix-api/site-list/v2/sites/query', {
        method: 'POST',
        headers: {
          'wix-account-id': accountId,
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
          Authorization: apiKey,
        },
        body: JSON.stringify({
          "query": {
            "filter": {
              "id": {"$in": [metasiteId]},
              "sort": [{"fieldName": "createdDate", "order": "ASC"}],
              "cursorPaging": {"limit": 2}
            }
          }
        })
      }).then(res => res.json()).then(({sites}) => setEnvVars({
        BOOKINGS_API_KEY: apiKey,
        BOOKINGS_SITE_ID: metasiteId,
        NEXT_PUBLIC_BOOKINGS_CHECKOUT_URL: `${sites[0].viewUrl}/booking-form?dayful=sch`

      }))
    }
  }, [apiKey, metasiteId, accountId]);

  return (
    <div className="container">
      <Head>
        <title>format env params</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Header title="Format env param!"/>
        {(apiKey && metasiteId && accountId) ? (
          <>
            {envVars ? <textarea style={{width: '100%', height: '100%'}} value={
              Object.keys(envVars).map(envVar => `${envVar}=${envVars[envVar]}`).join('\n')
            }/> : <div>Loading...</div>}
          </>
        ) : <div>{`ERROR missing param - ${apiKey ?  '' : 'apiKey,'} ${metasiteId ?  '' : 'metasiteId,'} ${accountId ?  '' : 'accountId,'}`}</div>}
      </main>

      <Footer/>
    </div>
  )
}
