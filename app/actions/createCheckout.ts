"use server";

import { shopifyFetch } from "@/lib/shopify";

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export async function createCheckout(variantId: string, quantity: number = 1): Promise<{ webUrl: string } | { error: string }> {
  if (!variantId) {
    return { error: "Variant ID is required to proceed to checkout." };
  }

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const result = await shopifyFetch<CartCreateResponse>({
      query: mutation,
      variables: {
        input: {
          lines: [
            {
              merchandiseId: variantId,
              quantity: quantity,
            },
          ],
        },
      },
    });

    const { cart, userErrors } = result.data.cartCreate;

    if (userErrors && userErrors.length > 0) {
      const errorMsg = userErrors.map((err) => err.message).join(", ");
      return { error: `Shopify Cart Error: ${errorMsg}` };
    }

    if (!cart || !cart.checkoutUrl) {
      return { error: "Failed to generate a checkout URL from Shopify." };
    }

    // Force checkoutUrl to go to the native Shopify store domain to avoid custom domain routing issues
    let finalCheckoutUrl = cart.checkoutUrl;
    console.log("=== CHECKOUT REDIRECT DEBUG ===");
    console.log("Original Shopify Checkout URL:", cart.checkoutUrl);
    console.log("SHOPIFY_STORE environment variable:", process.env.SHOPIFY_STORE);
    
    if (process.env.SHOPIFY_STORE) {
      try {
        const urlObj = new URL(finalCheckoutUrl);
        urlObj.hostname = process.env.SHOPIFY_STORE;
        finalCheckoutUrl = urlObj.toString();
        console.log("Rewritten Checkout URL:", finalCheckoutUrl);
      } catch (e) {
        console.error("Failed to parse checkout URL:", e);
      }
    } else {
      console.warn("SHOPIFY_STORE environment variable is NOT set!");
    }
    console.log("===============================");

    return { webUrl: finalCheckoutUrl };
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return { error: error.message || "An unexpected error occurred. Please try again." };
  }
}
