import '../styles/globals.css';

// Internal import

import { ChatAppProvider } from '../Context/ChatAppContext';
import { NavBar } from '../components/index';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <ChatAppProvider>
      <Component {...pageProps} />
    </ChatAppProvider>
  </div> 
)
  


export default MyApp