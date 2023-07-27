import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import OrphansABI from './OrphansABI.json'; 

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0x98914AE039578adFa695C77c455C17587e9fB631'; 
const contract = new ethers.Contract(contractAddress, OrphansABI, provider);

const ContractInteraction = () => {
  const [contractBalance, setContractBalance] = useState(0);
  const [contributedAmount, setContributedAmount] = useState(0);
  const [isContributor, setIsContributor] = useState(false);
  const [isLoading, setLoading] = useState(false);

  
  useEffect(() => {
    const getContractBalance = async () => {
      const balance = await provider.getBalance(contractAddress);
      setContractBalance(ethers.utils.formatEther(balance));
    };
    getContractBalance();
  }, []);

  
  useEffect(() => {
    const checkContributor = async () => {
      const currentAddress = await provider.getSigner().getAddress();
      const contributed = await contract.contributors(currentAddress);
      setIsContributor(contributed > 0);
    };
    checkContributor();
  }, []);

  
  const contribute = async (amount) => {
    setLoading(true);
    try {
      const signer = provider.getSigner();
      const transaction = await contract.sendEth({ value: ethers.utils.parseEther(amount.toString()) });
      await transaction.wait();
      setLoading(false);
      setContributedAmount((prev) => prev + amount);
      setIsContributor(true);
    } catch (error) {
      console.error('Error contributing to the contract:', error);
      setLoading(false);
    }
  };

  
  const requestRefund = async () => {
    setLoading(true);
    try {
      const transaction = await contract.refund();
      await transaction.wait();
      setLoading(false);
      setIsContributor(false);
    } catch (error) {
      console.error('Error requesting refund:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Orphans Contract Interaction</h1>
      <p>Contract Balance: {contractBalance} ETH</p>
      {isContributor ? (
        <div>
          <p>You have contributed: {contributedAmount} ETH</p>
          <button onClick={() => requestRefund()} disabled={isLoading}>
            Request Refund
          </button>
        </div>
      ) : (
        <div>
          <p>You have not contributed yet.</p>
          <input type="number" onChange={(e) => setContributedAmount(e.target.value)} />
          <button onClick={() => contribute(contributedAmount)} disabled={isLoading}>
            Contribute
          </button>
        </div>
      )}
    </div>
  );
};

export default ContractInteraction;
