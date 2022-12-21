import FunnelNetlify from './funnel-netlify';
import FunnelVercel from './funnel-vercel';

export default process.env.VERCEL ? FunnelVercel : FunnelNetlify;
