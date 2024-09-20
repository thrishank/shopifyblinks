"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { WalletInfo } from "@/lib/profile";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletConnectProps {
  onConnect: (walletInfo: WalletInfo) => void;
  onDisconnect: () => void;
}

export function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const { publicKey, connected, disconnect, autoConnect } = useWallet();
  const prevConnectedRef = useRef(connected);
  const prevPublicKeyRef = useRef(publicKey);

  console.log(publicKey, connected, autoConnect);
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
    <Card className="shadow-md w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-purple-700 dark:text-purple-300">
          Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
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
            <div className="flex flex-col sm:flex-row gap-2">
              <WalletMultiButton className="w-full h-10" />
            </div>
          </div>
        ) : (
          <WalletMultiButton className="w-full h-10" />
        )}
      </CardContent>
    </Card>
  );
}
