import dynamic from 'next/dynamic'

// wix-style-react is not SSR friendly :(
const FunnelNoSSR = dynamic(
  () => import('@components/FunnelVercel'),
  { ssr: false }
)

function FunnelVercel() {
  return (
    <>
      <FunnelNoSSR/>
    </>
  )
}

export default FunnelVercel
