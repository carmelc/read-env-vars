import dynamic from 'next/dynamic'

// wix-style-react is not SSR friendly :(
const ResultsNoSSR = dynamic(
  () => import('@components/Results'),
  { ssr: false }
)

function Results() {
  return (
    <>
      <ResultsNoSSR/>
    </>
  )
}

export default Results
