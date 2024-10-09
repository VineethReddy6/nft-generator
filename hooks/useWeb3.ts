// hooks/useWeb3.ts
import { useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";

// Custom hook to access web3, account, network, and connectMetaMask
export const useWeb3 = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }

  return context;
};
