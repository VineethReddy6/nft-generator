import React, { useEffect, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { net } from "web3";
import MamogramForm from "@/components/molecules/MamogramForm";

const AccountInfo: React.FC = () => {
  const { web3, account, connectMetaMask, network } = useWeb3();
  const [metaMaskInstalled, setMetaMaskInstalled] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const [isNetworkMatched, setIsNetworkMatched] = useState<boolean>(false);

  // Check if MetaMask is installed when the component mounts
  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      setMetaMaskInstalled(false);
    }
  }, []);

  // Attempt to connect to MetaMask if it is installed but no account is connected
  useEffect(() => {
    if (metaMaskInstalled && !account) {
      connectMetaMask();
    }
  }, [account, metaMaskInstalled, connectMetaMask]);

  useEffect(() => {
    if (metaMaskInstalled && account && network === "Sepolia") {
      setIsNetworkMatched(true);
    }
  }, [network, account, metaMaskInstalled]);
  // Function to connect to MetaMask on button click
  const handleConnectMetaMask = async () => {
    setIsConnecting(true); // Indicate that the connection is in progress

    try {
      await connectMetaMask();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    } finally {
      setIsConnecting(false); // Reset connection status
    }
  };

  // If MetaMask is not installed, show a message to install it
  if (!metaMaskInstalled) {
    return (
      <div>
        <h2>MetaMask Not Installed</h2>
        <p>
          Please install MetaMask to use this application. You can download it{" "}
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    );
  }

  // If MetaMask is installed but no account is connected, show a button to connect
  if (metaMaskInstalled && !account) {
    return (
      <div>
        <h2>you have not Connected MetaMask</h2>
        <button
          onClick={handleConnectMetaMask}
          disabled={isConnecting}
          className="border-solid border-2"
        >
          {isConnecting ? "Connecting..." : "Connect to MetaMask"}
        </button>
      </div>
    );
  }

  if (!isNetworkMatched) {
    return <h1>connect to Sepolia</h1>;
  }
  // If MetaMask is connected, show the account details
  return (
    <div className="relative">
      {/* <h2>Account Information</h2>
      <p>Current Account: {account}</p> */}
      <MamogramForm />
    </div>
  );
};

export default AccountInfo;
