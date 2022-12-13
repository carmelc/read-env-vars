import {Box, CopyClipboard, TextButton} from 'wix-style-react'
import {Card, Cell, FormField, Input, InputArea, Layout} from "wix-style-react";
import {useEffect, useState} from "react";

export default function DeployResults({envVars}) {
  const provider = new URLSearchParams(window.location.hash.slice(1)).get('provider');
  const [vercelUrl, setVercelUrl] = useState('');
  const [netlifyUrl, setNetlifyUrl] = useState('');
  useEffect(() => {
    const vercelUrlObj = new URL('https://vercel.com/new/clone');
    const netlifyUrlObj = new URL('https://app.netlify.com/start/deploy');

    netlifyUrlObj.searchParams.set('repository', 'https://github.com/netanelgilad/wix-fitness-nextjs');
    netlifyUrlObj.hash = `${Object.keys(envVars).map(envVar => `${envVar}=${envVars[envVar]}`).join('&')}`
    setNetlifyUrl(netlifyUrlObj.toString());

    vercelUrlObj.searchParams.set('repository-url', 'https://github.com/netanelgilad/wix-fitness-nextjs');
    vercelUrlObj.searchParams.set('env', Object.keys(envVars).join(','));
    vercelUrlObj.searchParams.set('envDescription', 'Wix API and site details');
    vercelUrlObj.searchParams.set('project-name', 'Wix Fitness Template');
    vercelUrlObj.searchParams.set('envLink', 'https://manage.wix.com/account/api-keys');
    setVercelUrl(vercelUrlObj.toString());
  }, [envVars]);
  return (
    <Box marginTop="SP2" display="block">
      <Card>
        <Card.Header
          title="Data generated successfully"
          subtitle="Please verify that the following Environment Variables are defined automatically in your project, you can also copy the generated dotenv file for local development"
          suffix={
            <Box align="center" verticalAlign="middle" gap={1}>
              {(!provider || provider === 'vercel') ? <a href={vercelUrl} target="_blank">
                <img src="https://vercel.com/button" alt="" title="Deploy with Vercel"/>
              </a> : null}
              {(!provider || provider === 'netlify') ? <a href={netlifyUrl} target="_blank">
                <img src="https://www.netlify.com/img/deploy/button.svg" alt="" title="Deploy to Netlify"/>
              </a> : null}
            </Box>
          }
        />
        <Card.Content>
          <Layout gap="24px">
            {Object.keys(envVars).map(envVar => (
              <Cell key={envVar}>
                <FormField label={envVar}>
                  <CopyClipboard value={envVars[envVar]} resetTimeout={2000}>
                    {({isCopied, copyToClipboard}) => (
                      <Input autoSelect value={envVars[envVar]} readOnly suffix={
                        <Box verticalAlign="middle" marginRight="SP1">
                          <TextButton onClick={() => copyToClipboard()} size="small">
                            {!isCopied ? 'Copy' : 'Copied!'}
                          </TextButton>
                        </Box>}/>)}
                  </CopyClipboard>
                </FormField>
              </Cell>
            ))}
            <Cell>
              <FormField
                infoContent="copy into '.env.local' file (on project root) for local development"
                label="Raw (.env format)"
              >
                <InputArea
                  rows={5}
                  value={Object.keys(envVars).map(envVar => `${envVar}=${envVars[envVar]}`).join('\n')}
                  readOnly
                  resizable
                  autoSelect
                />
              </FormField>
            </Cell>
          </Layout>
        </Card.Content>
      </Card>
    </Box>
  )
}
