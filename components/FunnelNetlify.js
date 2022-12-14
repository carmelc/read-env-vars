import {Cell, Layout, Page, Card} from "wix-style-react";
import {useCallback} from "react";
import Footer from "@components/Footer";

export default function FunnelNetlify() {
  const onClickNext = useCallback(() => {
    const redirect = new URL(window.location.href).searchParams.get('redirect') ?? 'true';
    const baseUrl = 'https://manage.wix.com/_api/wix-anywhere-embed/headless-funnel-redirect';
    const targetUrl = new URL('https://manage.wix.com/account/site-selector');
    targetUrl.searchParams.set('actionUrl', `${baseUrl}/{metaSiteId}#provider=netlify&redirect=${redirect}`);
    targetUrl.searchParams.set('title', 'Please Select the site You wish to connect to Netlify');
    window.open(targetUrl.toString());
  }, []);

  return (
    <>
      <style>
        {`
        .content-container {
          padding: 50px;
        }
        .site-head {
          background: #ebedef url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 630 25.6' style='enableBackground:new 0 0 700 25.6' xml:space='preserve'%3E%3Cstyle%3E.st1{fill-rule:evenodd;clip-rule:evenodd;fill:%23fff}%3C/style%3E%3Ccircle class='st1' cx='3.6' cy='12.8' r='3.5'/%3E%3Ccircle class='st1' cx='16.6' cy='12.8' r='3.5'/%3E%3Ccircle class='st1' cx='29.6' cy='12.8' r='3.5'/%3E%3C/svg%3E") no-repeat 7px 0;
          height: 14px;
        }
        .overlay {
          opacity: 0;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, .8);
        }
        .overlay:hover {
          opacity: 1;
        }
        .netlify-button {
          cursor: pointer;
        }
        `
        }
      </style>
      <Page height="100vh">
        <Page.Header title="Integrate Netlify with Wix Bookings"></Page.Header>
        <Page.Content>
          <Card className="content-container">
            <Layout cols={1} gap="60px">
              <Layout rowHeight="1fr">
                {[
                  '/bookings-template-1.jpeg',
                  '/fitness-1.jpg',
                  '/fitness-2.jpg',
                  '/barber-1.jpg',
                  '/consult-1.jpg',
                  '/consult-2.jpg',
                ].map(src => <Cell span={4} key={src}>
                  <div style={{position: 'relative'}}>
                    <div className="site-head"></div>
                    <img height="100%" width="100%" src={src}/>
                    <div className="overlay">
                      <a onClick={onClickNext} target="_blank" className="netlify-button">
                        <img src="https://www.netlify.com/img/deploy/button.svg" alt="" title="Deploy to Netlify"/>
                      </a>
                    </div>
                  </div>
                </Cell>)}
              </Layout>
            </Layout>
          </Card>
        </Page.Content>
    </Page>
    <Footer/>
  </>
  );
}
