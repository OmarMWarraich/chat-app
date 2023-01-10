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
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userList, setUserList] = useState([]);

    // Chat User Data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    // Router
    const router = useRouter();

    // Fetch Data at Page Load
    const fetchData = async () => {
        try {
            // Get Contract
            const contract = await connectingWithContract();
            // Get Account
            const createdAccount = await connectWallet();
            setAccount(createdAccount);
            // Get User Name
            const userName = await contract.getUsername(createdAccount);
            setUserName(userName);
            // Get Friend List
            const friendLists = await contract.getMyfriendList(createdAccount);
            setFriendLists(friendLists);
            // Get User List
            const userList = await contract.getAllAppUser();
            setUserList(userList);
        } catch (error) {
            setError("Please Install and Connect Metamask");
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    // Read Message
    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const friendMsg = await contract.readMessage(friendAddress);
            setFriendMsg(friendMsg);
        } catch (error) {
            setError("Currently you have no messages.");
        }
    }

    // Create Account
    const createAccount = async ({ name }) => {
        try {
            // if ((name ) === "") return setError("Please fill all the fields.");

            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error in Creating Account. Please try again.");
        }
    }

    // Add Friends
    const addFriends = async (accountAddress, name) => {
        try {
            if ((name || accountAddress) === "") return setError("Please fill all the fields.");

            const contract = await connectingWithContract();
            const getAddedFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await getAddedFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Error in Adding Friend. Please try again.");
        }
    }

    // Send Message
    const sendMsg = async (address, msg) => {
        try {
            if ( address || msg ) return setError("Please fill all the fields.");

            const contract = await connectingWithContract();
            const getSentMsg = await contract.sendMessage(address, msg);
            setLoading(true);
            await getSentMsg.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error in Sending Message. Please try again.");
        }
    }

    // Read User Info
    const readUserInfo = async (userAddress) => {
            const contract = await connectingWithContract();
            const userName = await contract.getUserName(userAddress);
            setCurrentUserName(userName);
            setCurrentUserAddress(userAddress);
    };

    return(
        // UseState
        <ChatAppContext.Provider 
          value={{ 
            readMessage, 
            createAccount, 
            addFriends, 
            sendMsg, 
            readUserInfo,
            connectWallet,
            checkIfWalletIsConnected,
            account,
            userName,
            friendLists,
            friendMsg,
            userList,
            error,
            loading,
            currentUserName,
            currentUserAddress
            }}>
            {children}
        </ChatAppContext.Provider>
    )
}
