import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Transaction from './components/Transaction';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();

  },blockNumber);
  const prevBlock=()=>{
     const actualBlock = blockNumber -1 < 0 ? 0 : blockNumber -1
     setBlockNumber(actualBlock)
  }
  const nextBlock=()=>{
      const actualBlock = blockNumber + 1
      setBlockNumber(actualBlock)
  }
  const Block = () => {
    return (
      <>
        <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 24, 
            fontSize: 24,
          }}>
          <b>Block Details</b>
        </div>
        <div style={{display:"flex", justifyContent: "center", marginTop: 24}}>
          <button style={{marginRight: 20,margin: 15 }} onClick={() => prevBlock()}>-</button>
          <p>{` Block Number: ${blockNumber} `}</p>
          <button style={{marginLeft: 24 ,margin: 15 }}onClick={() => nextBlock()}>+</button>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <Navbar />
      <div className="block" style={{marginTop: "10px"}}>
        <button onClick={() => prevBlock()}>-</button>
        <p> {` Block Number: ${blockNumber}`} </p>
        <button onClick={() => nextBlock()}>+</button>
      </div>
      
      <Transaction blockNumber={blockNumber}/>
    </div>
  );
  
}

export default App;
