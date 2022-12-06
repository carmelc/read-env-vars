import dynamic from 'next/dynamic'

// wix-style-react is not SSR friendly :(
const FunnelNoSSR = dynamic(
  () => import('../components/Funnel'),
  { ssr: false }
)

function Funnel() {
  return (
    <>
      <FunnelNoSSR/>
    </>
  )
}

export default Funnel
