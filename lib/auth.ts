import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkShopifyAccess, verifyTokenAndGetShopInfo } from "./verify";

interface User {
  id: string;
  accessToken: string;
  shopifyWebsiteUrl: string;
  currency: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Access Token",
      credentials: {
        accessToken: {
          label: "Access Token",
          type: "text",
          placeholder: "Enter your access token",
        },
        shopifyWebsiteUrl: {
          label: "Shopify Website URL",
          type: "text",
          placeholder: "Enter your Shopify website URL",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const { accessToken, shopifyWebsiteUrl } = credentials || {};
        if (!accessToken || !shopifyWebsiteUrl) {
          throw new Error("Access token and Shopify website URL are required");
        }

        try {
          const { hasRequiredAccess, missingScopes } = await checkShopifyAccess(
            shopifyWebsiteUrl,
            accessToken
          );

          if (!hasRequiredAccess) {
            throw new Error(
              `The access token does not have these required scopes: ${missingScopes.join(",")}`
            );
          }

          const shopInfo = await verifyTokenAndGetShopInfo(
            accessToken,
            shopifyWebsiteUrl
          );

          return {
            id: shopInfo.id,
            accessToken,
            shopifyWebsiteUrl,
            currency: shopInfo.currency,
          };
        } catch (err) {
          throw new Error(
            err instanceof Error ? err.message : "An unexpected error occurred"
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<any> {
      return {
        ...session,
        user: {
          id: token.id,
          accessToken: token.accessToken,
          shopifyWebsiteUrl: token.shopifyWebsiteUrl,
          currency: token.currency,
        },
      };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.shopifyWebsiteUrl = user.shopifyWebsiteUrl;
        token.currency = user.currency;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/profile",
  },
};
