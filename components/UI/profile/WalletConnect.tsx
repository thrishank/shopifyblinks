"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Loader2, Wallet } from "lucide-react";
import { WalletInfo } from "@/lib/profile";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

// Import the wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletConnectProps {
  onConnect: (walletInfo: WalletInfo) => void;
  onDisconnect: () => void;
}

export function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const { publicKey, connected, disconnect } = useWallet();
  const prevConnectedRef = useRef(connected);
  const prevPublicKeyRef = useRef(publicKey);

  useEffect(() => {
    if (
      connected !== prevConnectedRef.current ||
      publicKey !== prevPublicKeyRef.current
    ) {
      prevConnectedRef.current = connected;
      prevPublicKeyRef.current = publicKey;

      if (connected && publicKey) {
        const walletInfo: WalletInfo = {
          address: publicKey.toBase58(),
        };
        onConnect(walletInfo);
      } else if (!connected) {
        onDisconnect();
      }
    }
  }, [connected, publicKey, onConnect, onDisconnect]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-700 dark:text-purple-300">
          Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <WalletModalProvider>
          {connected && publicKey ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Connected Wallet
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-all">
                  {publicKey.toBase58()}
                </p>
              </div>
              <div className="flex space-x-2">
                <WalletMultiButton className="flex-1" />
                <Button
                  variant="outline"
                  className="flex-1 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={disconnect}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            <WalletMultiButton className="w-full" />
          )}
        </WalletModalProvider>
      </CardContent>
    </Card>
  );
}
