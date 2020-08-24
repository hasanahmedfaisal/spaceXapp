import App from '../components/app/App'
import getRequestDetails from '../helpers/fetchData'
import { parse } from '../helpers/ResultsParser'
import Head from 'next/head';

const AppContainer = (props) => {
  return (
    <>
    <Head>
      <title>SpaceX app</title>
      <meta
        name="description"
        content="offline enablement"
      />
    </Head>
      <App {...props}/>
    </>
  )
}

AppContainer.getInitialProps = async ({query}) => {
  const { endpoint, filters } = getRequestDetails(query)
  const res = await fetch(endpoint)
  const result = await res.json()
  const data = parse(result)

  return {
      data,
      filters
  }
}

export default AppContainer