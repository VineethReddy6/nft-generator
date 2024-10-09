// contexts/Web3Context.tsx

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Web3 from "web3";

interface Web3ContextProps {
  web3: Web3 | null;
  account: string;
  network: string;
  connectMetaMask: () => Promise<void>;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Context = createContext<Web3ContextProps | undefined>(
  undefined
);

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");

  useEffect(() => {
    const initializeWeb3 = () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        checkNetwork(web3Instance);
        window.ethereum.on("chainChanged", () => checkNetwork(web3Instance));
      }
    };
    initializeWeb3();
  }, []);

  const connectMetaMask = async () => {
    if (!web3) {
      console.error("MetaMask not detected. Please install MetaMask!");
      return;
    }

    try {
      await window.ethereum?.request({ method: "eth_requestAccounts" });
      const accounts: string[] = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.error(
          "No MetaMask account found. Please create or connect an account."
        );
        return;
      }
      setAccount(accounts[0]);
    } catch (error: any) {
      console.error(`Error connecting to MetaMask: ${error.message}`);
    }
  };

  const checkNetwork = async (web3Instance: Web3) => {
    try {
      const networkId = Number(await web3Instance.eth.net.getId());
      if (networkId === 11155111) {
        setNetwork("Sepolia");
      } else {
        setNetwork("Unsupported Network");
        console.error("Please switch to the Sepolia test network in MetaMask.");
      }
    } catch (error) {
      console.error("Error getting network ID:", error);
    }
  };

  return (
    <Web3Context.Provider value={{ web3, account, network, connectMetaMask }}>
      {children}
    </Web3Context.Provider>
  );
};
