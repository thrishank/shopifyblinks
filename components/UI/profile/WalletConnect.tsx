import React, { useState, useCallback } from "react";
import { Button } from "@/components/common/button";
import { Loader2, Wallet } from "lucide-react";
import { WalletInfo } from "@/lib/profile";
import { useWallet } from "@solana/wallet-adapter-react";

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
  const [error, setError] = useState<string | null>(null);

  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // setTimeout(() => {
      //   const mockWalletInfo: WalletInfo = {
      //     address: wallet.adapter.publicKey?.toBase58() || "Unknown",
      //   };
      //   setWalletInfo(mockWalletInfo);
      //   onConnect(mockWalletInfo);
      //   setIsConnecting(false);
      // }, 2000);
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
      setIsConnecting(false);
    }
  }, [onConnect]);

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
        </div>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full"
      >
        {isConnecting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wallet className="mr-2 h-4 w-4" />
        )}
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
