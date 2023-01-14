import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//INTERNAL IMPORT
import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from '../Utils/apiFeature'

export const ChatAppContext = React.createContext()

export const ChatAppProvider = ({ children }) => {
  //USESTATE
  const [account, setAccount] = useState('')
  const [userName, setUserName] = useState('')
  const [friendLists, setFriendLists] = useState([])
  const [friendMsg, setFriendMsg] = useState([])
  const [loading, setLoading] = useState(false)
  const [userLists, setUserLists] = useState([])
  const [error, setError] = useState('')

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState('')
  const [currentUserAddress, setCurrentUserAddress] = useState('')

  const router = useRouter()

  //FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectingWithContract()
      //GET ACCOUNT
      const connectAccount = await connectWallet()
      setAccount(connectAccount)
      //GET USER NAME
      const userName = await contract.getUsername(connectAccount)
      setUserName(userName)
      //GET MY FRIEND LIST
      const friendLists = await contract.getMyFriendList()
      setFriendLists(friendLists)
      //GET ALL APP USER LIST
      const userList = await contract.getAllAppUser()
      setUserLists(userList)
    } catch (error) {
      // setError("Please Install And Connect Your Wallet");
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  //READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract()
      const read = await contract.readMessage(friendAddress)
      setFriendMsg(read)
    } catch (error) {
      console.log('Currently You Have no Message')
    }
  }

  //CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      const contract = await connectingWithContract()
      const getCreatedUser = await contract.createAccount(name)
      setLoading(true)
      await getCreatedUser.wait()
      setLoading(false)
      window.location.reload()
    } catch (error) {
      setError('Error while creating your account Please reload browser')
    }
  }

  //ADD YOUR FRIENDS
  const addFriends = async ({ name, accountAddress }) => {
    try {
      const contract = await connectingWithContract()
      const addMyFriend = await contract.addFriend(accountAddress, name)
      setLoading(true)
      await addMyFriend.wait()
      setLoading(false)
      router.push('/')
      window.location.reload()
    } catch (error) {
      setError('Something went wrong while adding friends, try again')
    }
  }

  //SEND MESSAGE TO YOUR FRIEND
  const sendMessage = async ({ msg, address }) => {
    try {
      const contract = await connectingWithContract()
      const addMessage = await contract.sendMessage(address, msg)
      setLoading(true)
      await addMessage.wait()
      setLoading(false)
      window.location.reload()
    } catch (error) {
      setError('Please reload and try again')
    }
  }

  //READ INFO
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract()
    const userName = await contract.getUsername(userAddress)
    setCurrentUserName(userName)
    setCurrentUserAddress(userAddress)
  }
  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  )
}
