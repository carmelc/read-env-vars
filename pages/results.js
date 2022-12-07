import dynamic from 'next/dynamic'
import Footer from "@components/Footer";

// wix-style-react is not SSR friendly :(
const ResultsNoSSR = dynamic(
  () => import('@components/Results'),
  { ssr: false }
)

function Results() {
  return (
    <>
      <ResultsNoSSR/>
      <Footer/>
    </>
  )
}

export default Results
