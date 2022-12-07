import {Button, Card, Cell, Layout, Page} from "wix-style-react";
import {useCallback} from "react";

export default function Funnel() {
  const onClickNext = useCallback(() => {
    const baseUrl = 'https://manage.wix.com/_api/wix-anywhere-embed/headless-funnel-redirect';
    const targetUrl = new URL('https://manage.wix.com/account/site-selector');
    targetUrl.searchParams.set('actionUrl', `${baseUrl}/{metaSiteId}`);
    targetUrl.searchParams.set('title', 'Please Select the site You wish to connect to Netlify');
    window.open(targetUrl.toString());
  }, []);

  return (
    <Page height="100vh">
      <Page.Header title="Integrate Netlify/Vercel with Wix Bookings"></Page.Header>
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Header
                title="You will now be redirected to a site selector"
                suffix={
                  <Button size="small" onClick={onClickNext}>
                    Next
                  </Button>
                }
              />
              <Card.Divider/>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
}
