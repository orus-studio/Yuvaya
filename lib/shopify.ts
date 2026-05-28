const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

export interface ShopifyProduct {
  id: string;
  title: string;
  image: string;
  price: string;
  variantId: string;
}

interface ShopifyGraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<ShopifyGraphQLResponse<T>> {
  if (!SHOPIFY_STORE || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Missing Shopify environment variables: SHOPIFY_STORE or SHOPIFY_STOREFRONT_TOKEN");
  }

  const endpoint = `https://${SHOPIFY_STORE}/api/2026-04/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Shopify API responded with status ${response.status}: ${text}`);
    }

    const result = (await response.json()) as ShopifyGraphQLResponse<T>;

    if (result.errors) {
      throw new Error(`Shopify GraphQL errors: ${result.errors.map((e) => e.message).join(", ")}`);
    }

    return result;
  } catch (error) {
    console.error("Shopify API fetch failed:", error);
    throw error;
  }
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  interface ShopifyProductsData {
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          images: {
            edges: Array<{
              node: {
                url: string;
                altText: string;
              };
            }>;
          };
          variants: {
            edges: Array<{
              node: {
                id: string;
                price: {
                  amount: string;
                  currencyCode: string;
                };
              };
            }>;
          };
        };
      }>;
    };
  }

  const response = await shopifyFetch<ShopifyProductsData>({ query });

  return response.data.products.edges.map(({ node }) => {
    const imageNode = node.images.edges[0]?.node;
    const variantNode = node.variants.edges[0]?.node;

    return {
      id: node.id,
      title: node.title,
      image: imageNode?.url || "/placeholder.png",
      price: variantNode ? `${variantNode.price.currencyCode} ${variantNode.price.amount}` : "N/A",
      variantId: variantNode?.id || "",
    };
  });
}

export interface ShopifyLandingProductNode {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

interface ShopifyLandingProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyLandingProductNode;
    }>;
  };
}

export async function getLandingProducts(): Promise<ShopifyLandingProductNode[]> {
  const query = `
    query {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            vendor
            productType
            tags
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<ShopifyLandingProductsResponse>({ query });
    return response.data.products.edges.map(({ node }) => node);
  } catch (error) {
    console.error("Failed to fetch landing products from Shopify:", error);
    return [];
  }
}
