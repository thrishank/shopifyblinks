import axios from "axios";

interface AccessScope {
  handle: string;
}

interface ShopifyAccessResponse {
  access_scopes: AccessScope[];
}

export async function checkShopifyAccess(
  shopUrl: string,
  accessToken: string
): Promise<{
  hasRequiredAccess: boolean;
  missingScopes: string[];
}> {
  const apiUrl = `${shopUrl}/admin/oauth/access_scopes.json`;
  const requiredScopes = ["read_products", "write_orders"];

  try {
    const response = await axios.get<ShopifyAccessResponse>(apiUrl, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });

    const accessScopes = response.data.access_scopes.map(
      (scope) => scope.handle
    );
    const missingScopes = requiredScopes.filter(
      (scope) => !accessScopes.includes(scope)
    );

    return {
      hasRequiredAccess: missingScopes.length === 0,
      missingScopes,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error checking Shopify access:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error checking Shopify access:", error);
    }
    throw new Error("Failed to check Shopify access");
  }
}

interface ShopifyShop {
  currency: string;
  id: string
}

export async function verifyTokenAndGetShopInfo(
  token: string,
  url: string
): Promise<ShopifyShop> {
  const apiUrl = `${url}/admin/api/2023-04/shop.json`;

  try {
    const response = await axios.get<{ shop: ShopifyShop }>(apiUrl, {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    });

    return response.data.shop;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `HTTP error! status: ${error.response?.status}, message: ${error.message}`
      );
    }
    throw new Error(
      `Failed to verify token: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
