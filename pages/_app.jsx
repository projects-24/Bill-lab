import '../styles/style.css'
import '../styles/fun.css'
import '../styles/lineIcons/css/simple-line-icons.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
      <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
