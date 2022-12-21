import FunnelNetlify from './funnel-netlify';
import FunnelVercel from './funnel-vercel';

export default process.env.NEXT_PUBLIC_VERCEL_ENV ? FunnelVercel : FunnelNetlify;
