import {useCallback} from "react";
import Funnel from "@components/FunnelBase";

export default function FunnelNetlify() {
  const onClickNext = useCallback((template) => {
    const redirect = new URL(window.location.href).searchParams.get('redirect') ?? 'true';
    const baseUrl = 'https://manage.wix.com/_api/wix-anywhere-embed/headless-funnel-redirect';
    const targetUrl = new URL('https://manage.wix.com/account/site-selector');
    targetUrl.searchParams.set('actionUrl', `${baseUrl}/{metaSiteId}#provider=netlify&redirect=${redirect}&repo=${template.repo}`);
    targetUrl.searchParams.set('title', 'Please Select the business You wish to connect to Netlify');
    window.open(targetUrl.toString());
  }, []);

  return (
    <Funnel title="Integrate Netlify with Wix Bookings"
            imgAlt="Deploy to Netlify"
            imgSrc="https://www.netlify.com/img/deploy/button.svg"
            onTemplateSelected={onClickNext}
    />
  );
}
