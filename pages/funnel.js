import dynamic from 'next/dynamic'
import Footer from "@components/Footer";

// wix-style-react is not SSR friendly :(
const FunnelNoSSR = dynamic(
  () => import('@components/Funnel'),
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
