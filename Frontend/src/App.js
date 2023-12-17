import './App.css';
import React from 'react';
import {useState,useEffect} from 'react';
import Web3 from 'web3';
import withrawfunds from './withdrawfunds.js';
const { ethers } = require("ethers");


function App() {
  let provider;
  const[address,setAddress] = useState('');
  const detectCurrentProvider = () => {
    if (window.ethereum) {
      provider = window.ethereum;
      return provider;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      return provider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
      alert("Non-ethereum browser detected. You should install Metamask");
    }
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        setAddress(userAccount[0]);
      }
    } catch (err) {
      console.log(err);
    }
    return address;
  };
  onConnect();
 
  const RequestHandler = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    withrawfunds(signer,address);
  }
  return (
    <div className="App">
      {    
        <div className='box'><div className="input-box">
      </div><button className="button" onClick={RequestHandler}>Withdraw funds</button> </div>
      } </div>
  );
}

export default App;