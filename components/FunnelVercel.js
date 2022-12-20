import {useCallback} from "react";
import Funnel from "@components/FunnelBase";

export default function FunnelVercel() {
  const onClickNext = useCallback((template) => {
    const targetUrl = new URL('https://vercel.com/new/clone');
    targetUrl.searchParams.set('demo-title', template.title);
    targetUrl.searchParams.set('demo-image', template.demoSrc);
    targetUrl.searchParams.set('demo-url', template.demoUrl);
    targetUrl.searchParams.set('integration-ids',	'oac_GHcNqToRvr9QOMR7VpsBPgLe');
    targetUrl.searchParams.set('project-name',	template.vertical);
    targetUrl.searchParams.set('repository-name',	template.vertical);
    targetUrl.searchParams.set('s',	template.repo);
    targetUrl.searchParams.set('skippable-integrations',	'1');
    targetUrl.searchParams.set('demo-description', 'An all-in-one starter kit for high-performance bookings sites.');
    window.open(targetUrl.toString());
  }, []);

  return (
    <Funnel title="Integrate Vercel with Wix Bookings"
            imgAlt="Deploy to Vercel"
            imgSrc="/vercel-deploy-logo.svg"
            onTemplateSelected={onClickNext}
    />
  );
}
