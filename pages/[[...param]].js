import App from '../components/app/App'
import getRequestDetails from '../helpers/RequestHelper'
import { parse } from '../helpers/ResultsParser'
import Head from 'next/head';
import Constants from '../config/Constants'

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
  const { filters } = getRequestDetails(query)
  const res = await fetch(Constants.ENDPOINTS.baseUrl)
  const result = await res.json()
  const data = parse(result)

  return {
      data,
      filters
  }
}

export default AppContainer