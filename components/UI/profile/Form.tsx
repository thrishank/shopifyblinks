import React, { useState } from "react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/common/tooltip";
import { WalletConnect } from "./WalletConnect";
import { Eye, EyeOff, HelpCircle, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileFormData, WalletInfo } from "@/lib/profile";
import { validateEmail, validateUrl } from "@/lib/utils";

export const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    shopifyAccessToken: "",
    shopifyWebsiteUrl: "",
    email: "",
    defaultCurrency: "USD",
  });
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
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
    }, 2000);
  };

  return (
    <TooltipProvider>
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
                  You can find your access token in your Shopify admin panel
                  under Apps {">"} Private Apps.
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
          />
          {errors.shopifyWebsiteUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shopifyWebsiteUrl}
            </p>
          )}
        </div>

        <div>
          <Label>Wallet Connection</Label>
          <WalletConnect
            onConnect={(info) => setWalletInfo(info)}
            onDisconnect={() => setWalletInfo(null)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="defaultCurrency">Default Currency</Label>
          <Select
            value={formData.defaultCurrency}
            onValueChange={(value: any) =>
              setFormData((prev) => ({ ...prev, defaultCurrency: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="SOL">SOL</SelectItem>
            </SelectContent>
          </Select>
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
      </form>
      <ToastContainer position="bottom-right" />
    </TooltipProvider>
  );
};
