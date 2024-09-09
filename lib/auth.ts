import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  accessToken: string;
  shopifyWebsiteUrl: string;
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

        // async function verifyTokenWithShopify(
        //   token: string,
        //   url: string
        // ): Promise<boolean> {
        //   try {
        //     const response = await fetch(`${url}/admin/api/2023-04/shop.json`, {
        //       headers: {
        //         "X-Shopify-Access-Token": token,
        //       },
        //     });
        //     return response.ok;
        //   } catch (error) {
        //     console.error("Error verifying token:", error);
        //     return false;
        //   }
        // }

        // const isValid = await verifyTokenWithShopify(
        //   accessToken,
        //   shopifyWebsiteUrl
        // );
        // if (!isValid) {
        //   throw new Error("Invalid access token");
        // }

        return {
          id: "1", // You might want to generate a unique ID here
          accessToken,
          shopifyWebsiteUrl,
        };
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
        },
      };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.shopifyWebsiteUrl = user.shopifyWebsiteUrl;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/profile",
  },
};
