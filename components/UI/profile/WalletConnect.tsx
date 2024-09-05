import React, { useState } from "react";
import { Button } from "@/components/common/button";
import { Loader2, Wallet } from "lucide-react";
import { WalletInfo } from "@/lib/profile";

interface WalletConnectProps {
  onConnect: (walletInfo: WalletInfo) => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulating wallet connection
    setTimeout(() => {
      const mockWalletInfo: WalletInfo = {
        address: "5Uj8Ug...X1LY",
        balance: "10.5 SOL",
      };
      setWalletInfo(mockWalletInfo);
      onConnect(mockWalletInfo);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setWalletInfo(null);
    onDisconnect();
  };

  if (walletInfo) {
    return (
      <div className="flex items-center justify-between p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
        <div>
          <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
            Connected Wallet
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-300">
            {walletInfo.address}
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-300">
            Balance: {walletInfo.balance}
          </p>
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
      {isConnecting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-4 w-4" />
      )}
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
