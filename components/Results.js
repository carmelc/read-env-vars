import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Card,
  Cell,
  FormField,
  Input,
  InputArea,
  Layout,
  Page,
  Text,
  Notification,
  Box,
  Loader
} from 'wix-style-react';
import DeployResults from '@components/DeployResults';
import Footer from '@components/Footer';

const StorageKeys = {
  apiKey: 'wix-anywhere-local-storage_apiKey',
  accountId: 'wix-anywhere-local-storage_accountId',
};

export default function Results() {
  const redirect = new URLSearchParams(window.location.hash.slice(1)).get('redirect');
  const [envVars, setEnvVars] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const url = new URL(window.location.href);
  const metasiteId = url.searchParams.get('metasiteId');
  const [apiKey, setApiKey] = useState(localStorage.getItem(StorageKeys.apiKey));
  const [accountId, setAccountId] = useState(localStorage.getItem(StorageKeys.accountId));

  const onGenerate = useCallback(async () => {
      if (apiKey && metasiteId && accountId) {
          setEnvVars(null);
          setIsLoading(true);
          try {
              const sitesResponse = await fetch('/wix-api/site-list/v2/sites/query', {
                  method: 'POST',
                  headers: {
                      'wix-account-id': accountId,
                      'Content-Type': 'application/json',
                      Accept: 'application/json, text/plain, */*',
                      Authorization: apiKey,
                  },
                  body: JSON.stringify({
                      query: {
                          filter: {
                              id: {'$in': [metasiteId]},
                              sort: [{fieldName: 'createdDate', order: 'ASC'}],
                              cursorPaging: {limit: 2}
                          }
                      }
                  })
              });

              const {sites} = await sitesResponse.json();
              const createFormResponse = await fetch('/wix-api/form-schema-service/v4/forms', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: apiKey,
                      'wix-site-id': metasiteId
                  },
                  body: JSON.stringify({
                      form: {
                          namespace: 'wix.forms.form',
                          fields: [
                              {
                                  id: '3add679b-c9c0-4db5-b75e-c5a8199cdf14',
                                  target: 'first_name',
                                  view: {'fieldType': 'CONTACTS_FIRST_NAME', 'label': 'First name'},
                                  validation: {'string': {}},
                                  pii: true
                              },
                              {
                                  id: 'ce4e13f0-ab9c-4438-8f28-50ae0c70a9e0',
                                  target: 'last_name',
                                  view: {'fieldType': 'CONTACTS_LAST_NAME', 'label': 'Last name'},
                                  validation: {'string': {}},
                                  pii: true
                              },
                              {
                                  id: '7fc95c23-c309-418c-b862-11c4a7bda68d',
                                  target: 'email',
                                  view: {'fieldType': 'CONTACTS_EMAIL', 'label': 'Email'},
                                  validation: {'string': {format: 'EMAIL'}},
                                  pii: true
                              },
                              {
                                  id: 'efdb0296-972a-4b2a-a78d-913823cd5ad6',
                                  target: 'subject',
                                  view: {'fieldType': 'TEXT_INPUT', 'label': 'Subject'},
                                  validation: {'string': {}},
                                  pii: false
                              },
                              {
                                  id: 'e24f13d3-ee44-46c1-b2c5-f0842fe07996',
                                  target: 'description',
                                  view: {'fieldType': 'TEXT_AREA', 'label': 'Description'},
                                  validation: {'string': {}},
                                  pii: false
                              }
                          ],
                          postSubmissionTriggers: {
                              upsertContact: {
                                  fieldsMapping: {
                                      first_name: {contactField: 'FIRST_NAME'},
                                      last_name: {contactField: 'LAST_NAME'},
                                      email: {contactField: 'EMAIL', emailInfo: {tag: 'UNTAGGED'}},
                                  },
                              },
                          },
                      }
                  })
              });
              const {form} = await createFormResponse.json();
              setEnvVars({
                  BOOKINGS_API_KEY: apiKey,
                  BOOKINGS_SITE_ID: metasiteId,
                NEXT_PUBLIC_CONTACTS_FORM_ID: form.id,
                // TODO: use metasite solution when fully functional
          NEXT_PUBLIC_BOOKINGS_CHECKOUT_URL: encodeURIComponent(`${sites[0].viewUrl}/_api/dayful/sch/route/booking-form`),
          NEXT_PUBLIC_PAID_PLANS_CHECKOUT_URL: encodeURIComponent(`${sites[0].viewUrl}/_api/dayful/sch/route/plans-pricing/payment/`),
              });
              localStorage.setItem(StorageKeys.apiKey, apiKey);
              localStorage.setItem(StorageKeys.accountId, accountId);
          } catch (e) {
              console.error('*** Failed to get: ', e);
              setHasErrors(true);
          } finally {
              setIsLoading(false)
          }
      }
  }, [apiKey, metasiteId, accountId]);
  useEffect(() => {
    setHasErrors(false);
  }, [apiKey, accountId]);
  useEffect(() => {
    // use local storage values if available
    onGenerate();
  }, []);


  return (
    <>
      <Page height="100vh">
        {redirect === 'true' ? null : <Page.Header title="Integrate Selected Provider with Wix Bookings"></Page.Header>}
        <Page.Content>
          {isLoading ? <Box padding="100px" align="center"><Loader size="large"/></Box> :
            <Box paddingBottom="100px" display="block">
              <Layout>
                <Cell>
                  <Notification theme="error" show={hasErrors}>
                    <Notification.TextLabel>Something went wrong, please verify your API key and account
                      Id</Notification.TextLabel>
                    <Notification.CloseButton/>
                  </Notification>
                </Cell>
                <Cell>
                  {envVars ? <DeployResults envVars={envVars}/> : <Card>
                    <Card.Header
                      title="API Key/Account Id not found on local storage, please provide required information"
                      suffix={
                        <Button size="small" disabled={!accountId || !apiKey} onClick={onGenerate}>
                          {redirect === 'true' ? 'Redirect' : 'Generate'}
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
                  </Card>}
                </Cell>
              </Layout>
            </Box>}
        </Page.Content>
      </Page>
      <Footer/>
    </>
  )
}
