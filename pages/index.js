import Head from 'next/head'
import Navbar from './navs/Navbar';
import Intro from './FirstHome';
import Partials from './main/Partials';

// import Contestants from './main/Contestants';

export default function Home() {

  return (
    <div>
    <Head>
      <Partials />
    </Head>
    <Navbar />
    <Intro/>



    </div>
  )
}
