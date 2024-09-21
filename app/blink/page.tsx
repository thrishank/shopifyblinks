"use client";
import { useSearchParams } from "next/navigation";
import "@dialectlabs/blinks/index.css";
import { Blink, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { clusterApiUrl } from "@solana/web3.js";
import { Share } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlinkPage() {
  const [isCopied, setIsCopied] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const actionApiUrl = `https://solanablinks.me/blink?id=${id}`;

  const { adapter } = useActionSolanaWalletAdapter(
    clusterApiUrl("mainnet-beta")
  );
  const { action } = useAction({ url: actionApiUrl, adapter });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast.success("Blink URL copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!action) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            Solana Blinks
          </h1>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2  ">
            <CardTitle className="text-2xl font-bold ">
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="text-black font-bold hover:bg-purple-100 dark:text-purple-300 dark:border-purple-300 dark:hover:bg-purple-900"
              >
                <Share className="mr-2 h-4 w-4" />
                {isCopied ? "Copied!" : "Share Blink"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-1/2 w-full">
            <Blink
              action={action}
              websiteText={new URL(actionApiUrl).hostname}
            />
          </CardContent>
        </Card>
      </main>
      <ToastContainer />
    </div>
  );
}
