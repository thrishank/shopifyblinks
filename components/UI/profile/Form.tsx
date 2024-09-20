"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/common/tooltip";
import { WalletConnect } from "./WalletConnect";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileFormData, WalletInfo } from "@/lib/profile";
import { validateEmail, validateUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    shopifyAccessToken: "",
    shopifyWebsiteUrl: "",
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prev) => ({
        ...prev,
        shopifyAccessToken: session.user.accessToken,
        shopifyWebsiteUrl: session.user.shopifyWebsiteUrl,
      }));
    }
  }, [status, session?.user?.accessToken, session?.user?.shopifyWebsiteUrl]);

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [showToken, setShowToken] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!validateEmail(value)) error = "Invalid email address";
        break;
      case "shopifyWebsiteUrl":
        if (!validateUrl(value)) error = "Invalid URL format";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const { connected } = useWallet();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please correct the errors before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        accessToken: formData.shopifyAccessToken,
        shopifyWebsiteUrl: formData.shopifyWebsiteUrl,
      });

      if (!res!.ok) {
        toast.error(res?.error || "error updating the data");
        setIsSubmitting(false);
        return;
      }

      if (!connected) {
        toast.error("Please connect your wallet to receive payments");
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (e) {
      console.log(e);
      toast.error("error updating the data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="shopifyAccessToken" className="flex items-center">
          Shopify Access Token
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                You can find your access token in your Shopify admin panel under
                Apps {">"} Private Apps.
              </p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="relative">
          <Input
            id="shopifyAccessToken"
            name="shopifyAccessToken"
            type={showToken ? "text" : "password"}
            value={formData.shopifyAccessToken}
            onChange={handleInputChange}
            className="pr-10"
            placeholder="shpat_**************"
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          >
            {showToken ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <Button
          type="button"
          variant="outline"
          className="w-full flex justify-between items-center"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          How to get your Shopify access token
          {showInstructions ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {showInstructions && (
          <div className="mt-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                Go to Settings &gt; Apps and sales channel &gt; Develop apps
              </li>
              <li>
                Click on Allow custom app development if this is your first time
                creating an app. If you have already created an app, click on
                create an app
              </li>
              <li>Configure Admin API Scopes</li>
              <li>
                Select the <span className="font-bold">read_products</span> and{" "}
                <span className="font-bold">write_orders</span> permissions
              </li>
              <li>Click the save button at the bottom</li>
              <li>Scroll back to the top of the webpage and install the app</li>
              <li>Copy the access token starts with shpat</li>
              <li>Paste this token in the input field above</li>
            </ol>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="shopifyWebsiteUrl">Shopify Website URL</Label>
        <Input
          id="shopifyWebsiteUrl"
          name="shopifyWebsiteUrl"
          type="url"
          value={formData.shopifyWebsiteUrl}
          onChange={handleInputChange}
          placeholder="https://xyz.myshopify.com"
        />
        {errors.shopifyWebsiteUrl && (
          <p className="text-red-500 text-sm mt-1">
            {errors.shopifyWebsiteUrl}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="shopifyWebsiteUrl">
          Connect your wallet to recieve payments
        </Label>
        <WalletConnect
          onConnect={(info) => setWalletInfo(info)}
          onDisconnect={() => setWalletInfo(null)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
      <ToastContainer position="bottom-right" />
    </form>
  );
}
