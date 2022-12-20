import {Cell, Layout, Page, Card} from "wix-style-react";
import Footer from "@components/Footer";

const imagesBaseUrl = (typeof window !== 'undefined') ? window.location.origin : 'https://classy-longma-7cd3d2.netlify.app';

export const templates = [
  {
    id: 'bookings-template-1',
    vertical: 'bookings',
    demoSrc: imagesBaseUrl + '/bookings-template-1.jpeg',
    title: 'Next.js Bookings',
    demoUrl: 'https://bookings-wix-2-bw47pj9kv-ronnyrin.vercel.app',
    repo: 'https://github.com/netanelgilad/wix-fitness-nextjs',
  },
  // TODO : update for each actual template
  {
    id: 'fitness-1',
    vertical: 'bookings',
    demoSrc: imagesBaseUrl + '/fitness-1.jpg',
    title: 'Next.js Bookings',
    demoUrl: 'https://bookings-wix-2-bw47pj9kv-ronnyrin.vercel.app',
    repo: 'https://github.com/netanelgilad/wix-fitness-nextjs',
  },
  {
    id: 'fitness-2',
    vertical: 'bookings',
    demoSrc: imagesBaseUrl + '/fitness-2.jpg',
    title: 'Next.js Bookings',
    demoUrl: 'https://bookings-wix-2-bw47pj9kv-ronnyrin.vercel.app',
    repo: 'https://github.com/netanelgilad/wix-fitness-nextjs',
  },
  {
    id: 'barber-1',
    vertical: 'bookings',
    demoSrc: imagesBaseUrl + '/barber-1.jpg',
    title: 'Next.js Bookings',
    demoUrl: 'https://bookings-wix-2-bw47pj9kv-ronnyrin.vercel.app',
    repo: 'https://github.com/netanelgilad/wix-fitness-nextjs',
  },
  {
    id: 'consult-1',
    vertical: 'bookings',
    demoSrc: imagesBaseUrl + '/consult-1.jpg',
    title: 'Next.js Bookings',
    demoUrl: 'https://bookings-wix-2-bw47pj9kv-ronnyrin.vercel.app',
    repo: 'https://github.com/netanelgilad/wix-fitness-nextjs',
  },
  {
    id: 'consult-2',
    vertical: 'bookings',
    demoSrc: imagesBaseUrl + '/consult-2.jpg',
    title: 'Next.js Bookings',
    demoUrl: 'https://bookings-wix-2-bw47pj9kv-ronnyrin.vercel.app',
    repo: 'https://github.com/netanelgilad/wix-fitness-nextjs',
  },
];

export default function Funnel({onTemplateSelected, title, imgSrc, imgAlt}) {
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
        .select-button {
          cursor: pointer;
        }
        `}
      </style>
      <Page height="100vh">
        <Page.Header title={title}></Page.Header>
        <Page.Content>
          <Card className="content-container">
            <Layout cols={1} gap="60px">
              <Layout rowHeight="1fr">
                {templates.map(template => <Cell span={4} key={template.id}>
                  <div style={{position: 'relative'}}>
                    <div className="site-head"></div>
                    <img height="100%" width="100%" src={template.demoSrc}/>
                    <div className="overlay">
                      <a onClick={() => onTemplateSelected(template)} target="_blank" className="select-button">
                        <img src={imgSrc} alt="" title={imgAlt}/>
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
