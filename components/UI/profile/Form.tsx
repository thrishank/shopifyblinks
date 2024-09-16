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
import { Eye, EyeOff, HelpCircle, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileFormData, WalletInfo } from "@/lib/profile";
import { validateEmail, validateUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

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
  }, [status]);

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [showToken, setShowToken] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast.error("Invalid access token or Shopify website URL");
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
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
            placeholder="**************"
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
        <Label htmlFor="shopifyWebsiteUrl">Shopify Website URL</Label>
        <Input
          id="shopifyWebsiteUrl"
          name="shopifyWebsiteUrl"
          type="url"
          value={formData.shopifyWebsiteUrl}
          onChange={handleInputChange}
          placeholder="https://xyz.myshopify.com/"
        />
        {errors.shopifyWebsiteUrl && (
          <p className="text-red-500 text-sm mt-1">
            {errors.shopifyWebsiteUrl}
          </p>
        )}
      </div>

      <Label>Wallet Connection</Label>
      <WalletConnect
        onConnect={(info) => setWalletInfo(info)}
        onDisconnect={() => setWalletInfo(null)}
      />

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
