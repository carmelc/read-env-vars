import {useCallback, useEffect, useState} from 'react';
import {Button, Card, Cell, FormField, Input, InputArea, Layout, Page, Text, Notification} from "wix-style-react";
import DeployResults from "@components/DeployResults";
import Footer from "@components/Footer";

export default function Results() {
  const [envVars, setEnvVars] = useState(null);
  const [hasErrors, setHasErrors] = useState(false);
  const url = new URL(window.location.href);
  const metasiteId = url.searchParams.get('metasiteId');
  const [apiKey, setApiKey] = useState('');
  const [accountId, setAccountId] = useState('');

  const onGenerate = useCallback(() => {
    if (apiKey && metasiteId && accountId) {
      setEnvVars(null);
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
      })).catch(e => {
        console.error('*** Failed to get: ', e);
        setHasErrors(true);
      })
    }
  }, [apiKey, metasiteId, accountId]);
  useEffect(() => {
    setHasErrors(false);
  }, [apiKey, accountId]);


  return (
    <Page height="100vh">
      <Page.Header title="Integrate Netlify/Vercel with Wix Bookings"></Page.Header>
      <Page.Content>
        <Layout>
          <Cell>
            <Notification theme="error" show={hasErrors}>
              <Notification.TextLabel>Something went wrong, please verify your API key and account
                Id</Notification.TextLabel>
              <Notification.CloseButton/>
            </Notification>
          </Cell>
          <Cell>
            <Card>
              <Card.Header
                title="Please provide required information in order to generate env vars"
                suffix={
                  <Button size="small" disabled={!accountId || !apiKey} onClick={onGenerate}>
                    Generate
                  </Button>
                }
              />
              <Card.Divider/>
              <Card.Content>
                <Layout gap="24px">
                  <Cell>
                    <FormField
                      required
                      label="Insert Your Wix API Key (Bookings Permissions are required)"
                      infoContent={
                        <Text size="small" light>In order to acquire your API key, please visit <a target="_blank"
                                                                                                   href='https://manage.wix.com/account/api-keys'>Wix
                          Account Settings</a> page</Text>
                      }
                    >
                      <InputArea value={apiKey} onChange={e => setApiKey(e.target.value)}/>
                    </FormField>
                  </Cell>
                  <Cell>
                    <FormField
                      required
                      label="Insert Your Wix Account Id"
                      infoContent={
                        <Text size="small" light>In order to acquire your API key, please visit <a target="_blank"
                                                                                                   href='https://manage.wix.com/account/api-keys'>Wix
                          Account Settings</a> page</Text>
                      }
                    >
                      <Input value={accountId} onChange={e => setAccountId(e.target.value)}/>
                    </FormField>
                  </Cell>
                </Layout>
              </Card.Content>
            </Card>
            {envVars ? <DeployResults envVars={envVars}/> : null}
          </Cell>
        </Layout>
      </Page.Content>
      <Page.FixedFooter>
        <Page.Footer>
          <Page.Footer.Center>
            <Footer/>
          </Page.Footer.Center>
        </Page.Footer>
      </Page.FixedFooter>
    </Page>
  )
}
