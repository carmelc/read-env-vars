import {Box, Button, Card, Cell, FormField, Input, InputArea, Layout, Page, Text} from "wix-style-react";
import {useCallback, useState} from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const onClickNext = useCallback(() => {
    const baseUrl = window.location.origin;
    const targetUrl = new URL('https://manage.wix.com/account/site-selector');
    targetUrl.searchParams.set('actionUrl', `${baseUrl}/read-keys/{metaSiteId}#?apiKey=${apiKey}&accountId=${accountId}`);
    targetUrl.searchParams.set('title', 'Please Select the site You wish to connect to Netlify');
    window.open(targetUrl.toString());
  }, [accountId, apiKey]);

  return (
    <Page height="100vh">
      <Page.Header title="Integrate Netlify with Wix Bookings"></Page.Header>
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Header
                title="Please provide required information"
                suffix={
                  <Button size="small" disabled={!accountId || !apiKey} onClick={onClickNext}>
                    Next
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
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
}
