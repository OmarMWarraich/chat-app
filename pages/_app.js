import '../styles/globals.css';

// Internal import

import { ChatAppProvider } from '../Context/ChatAppContext';
import { NavBar } from '../components/index';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <ChatAppProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChatAppProvider>
  </div> 
)
  


export default MyApp