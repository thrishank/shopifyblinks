export interface ProfileFormData {
  shopifyAccessToken: string;
  shopifyWebsiteUrl: string;
  email: string;
  defaultCurrency: string;
}

export interface WalletInfo {
  address: string;
  balance: string;
}