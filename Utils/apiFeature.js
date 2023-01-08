import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ChatAppAddress, ChatAppABI } from '../Context/constants';

export const checkIfWalletIsConnected = async () => {
    try {
    if (!window.ethereum) return console.log('Please Install Metamask!');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    const firstAccount = accounts[0];
    return firstAccount;
    } catch (error) {
    console.log(error);
    }
};

export const connectWallet = async () => {
    try {
    if (!window.ethereum) return console.log('Please Install Metamask!');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const firstAccount = accounts[0];
    return firstAccount;
    } catch (error) {
    console.log(error);
    }
}

const GetContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = GetContract(signer);
        return contract;
    } catch (error) {
    console.log(error);
    }
}

export const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
}