import {Card, Cell, FormField, Input, InputArea, Layout, TextButton, Box, CopyClipboard} from "wix-style-react";
import {useEffect, useState} from "react";
import {router} from "next/client";

export default function DeployResults({envVars}) {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const provider = params.get('provider');
  const [netlifyUrl, setNetlifyUrl] = useState('');

  const addEnvVarsToVercel = async () => {
      await fetch('/api/vercel-integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          code: params.get('code'),
          envVars,
        })
      });
      router.push(params.get('next'));
  };

  useEffect(() => {
    const netlifyUrlObj = new URL('https://app.netlify.com/start/deploy');

    netlifyUrlObj.searchParams.set('repository', 'https://github.com/netanelgilad/wix-fitness-nextjs');
    netlifyUrlObj.hash = `${Object.keys(envVars).map(envVar => `${envVar}=${envVars[envVar]}`).join('&')}`
    setNetlifyUrl(netlifyUrlObj.toString());
  }, [envVars]);
  return (
    <Box marginTop="SP2" display="block">
      <Card>
        <Card.Header
          title="Data generated successfully"
          subtitle="Please verify that the following Environment Variables are defined automatically in your project, you can also copy the generated dotenv file for local development"
          suffix={
            <Box align="center" verticalAlign="middle" gap={1}>
              {(!provider || provider === 'vercel') ? <TextButton onClick={addEnvVarsToVercel}>
                <img src="https://vercel.com/button" alt="" title="Deploy with Vercel"/>
              </TextButton> : null}
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
