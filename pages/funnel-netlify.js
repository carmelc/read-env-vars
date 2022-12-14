import dynamic from 'next/dynamic'

// wix-style-react is not SSR friendly :(
const FunnelNoSSR = dynamic(
  () => import('@components/FunnelNetlify'),
  { ssr: false }
)

function FunnelNetlify() {
  return (
    <>
      <FunnelNoSSR />
    </>
  )
}

export default FunnelNetlify
