export interface ProfileFormData {
  shopifyAccessToken: string;
  shopifyWebsiteUrl: string;
}

export interface WalletInfo {
  address: string;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}
