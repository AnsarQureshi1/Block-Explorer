import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {toNumber} from 'ethers';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);

export default function Transaction({ blockNumber }) {
    const [blockTransaction, setBlockTransaction] = useState([]);
    const [TransactionSelected, setTransactionSelected] = useState("");
  
    useEffect(() => {
      async function setTransactions() {
        try {
          const { transactions } = await alchemy.core.getBlockWithTransactions(blockNumber);
          setBlockTransaction(transactions);
        } catch (error) {
          setBlockTransaction([]);
        }
      }
  
      setTransactions();
    }, [blockNumber]);
    
    const handleSelectedTransaction=(hash)=>{
         if(blockTransaction.length === 0){
            setTransactionSelected("")
         }else{
            setTransactionSelected(hash)
           
         }
    }
    const getTransaction=(hash)=>{
        const transactions = [...blockTransaction]
        const index = transactions.findIndex(tx => tx.hash === hash)
        if(index>0){
            return transactions[index]
        }else{
            return {}
        }

    }
    
   
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '50%', // Set the table width to 50% of the container
    margin: '20px auto',
  };

  const thStyle = {
    padding: '16px',
    textAlign: 'left',
    background: '#f2f2f2',
    whiteSpace: 'nowrap', // Prevent line breaks in header text
    fontSize: '14px',
  };

  const tdStyle = {
    padding: '16px',
    textAlign: 'left',
    whiteSpace: 'nowrap', // Prevent line breaks in table cell text
    fontSize: '14px',
  };

  const highlightedRowStyle = {
    background: '#e6f7ff',
  };

  const transactionRowStyle = {
    borderBottom: '1px solid #ccc',
  };
    
      const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 24,
        fontSize: 14,
        overflow: 'auto',
        maxHeight: '30rem',
        cursor: 'pointer',
        width: '100%', // Set the container width to 100%
      };
    
      const tableContainerStyle = {
        width: '50%', // Set the width of the table container to 50% of the container
      };
    
      const transactionDetailContainerStyle = {
        width: '50%', // Set the width of the transaction detail container to 50% of the container
        marginLeft: '16px', // Add some space between the table and the transaction detail
      };
      const Transactions = () => {
        return (
          <div style={containerStyle}>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Transaction Hash</th>
                    <th style={thStyle}>From</th>
                    <th style={thStyle}>To</th>
                  </tr>
                </thead>
                <tbody>
                  {blockTransaction.map((transaction) => {
                    const highlightRow = transaction.confirmations === 0;
                    return (
                      <tr
                        key={transaction.hash}
                        style={{ ...highlightedRowStyle, ...transactionRowStyle }}
                        onClick={() => handleSelectedTransaction(transaction.hash)}
                      >
                        <td style={tdStyle}>{transaction.hash.slice(0,15)}</td>
                        <td style={tdStyle}>{transaction.from.slice(0,15)}</td>
                        <td style={tdStyle}>{transaction.to.slice(0,15)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
          </div>
        );
      };    

    const TransactionDetail = (props) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 24,
              fontSize: 12,
              overflow: "auto",
              maxHeight: "20rem",
              cursor: "pointer",
              background: "#fff", // White background
              padding: "8px", // Add some padding for spacing
              border: "1px solid #ccc", // Add a border for a clean look
              borderRadius: "4px", // Slightly round the corners
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
            }}
          >
            <div>
              <p style={labelStyle}>Transaction Hash:</p>
              <p style={valueStyle}>{props.transaction.hash}</p>
              <p style={labelStyle}>Transaction Nonce:</p>
              <p style={valueStyle}>{props.transaction.nonce}</p>
              <p style={labelStyle}>Confirmation:</p>
              <p style={valueStyle}>{props.transaction.confirmations}</p>
              <p style={labelStyle}>ChainId:</p>
              <p style={valueStyle}>{props.transaction.chainId}</p>
            
            </div>
          </div>
        );
      };
      
      const labelStyle = {
        marginBottom: 4,
        fontWeight: "bold",
      };
      
      const valueStyle = {
        marginBottom: 8,
      };
        
    return (
      <>
         <div style={containerStyle}>
        <div style={tableContainerStyle}>
          <Transactions />
        </div>
        {/* {TransactionSelected ? (
          <div style={transactionDetailContainerStyle}>
            <TransactionDetail transaction={getTransaction(TransactionSelected)} />
          </div>
        ) : null} */}
        {TransactionSelected ? (
              <div style={transactionDetailContainerStyle}>
                <TransactionDetail transaction={getTransaction(TransactionSelected)} />
              </div>
            ) : null}
      </div>
       
      </>
    );
  }
  
  