import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Internal Import
import { 
    checkIfWalletIsConnected, 
    connectWallet,
    connectingWithContract,
  } from '../Utils/apiFeature';

// Context

export const ChatAppContext = React.createContext();

// Provider

export const ChatAppProvider = ({ children }) => {
    // const title = 'Welcome to the Blockchain Chat App';

    return(
        <ChatAppContext.Provider value={{}}>
            {children}
        </ChatAppContext.Provider>
    )
}
