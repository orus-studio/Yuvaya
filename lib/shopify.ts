const SHOPIFY_STORE = process.env.SHOPIFY_STORE || "f1trh0-ay.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || "533d55678eccafe73cbac892ca8efb90";

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
  cache = "default",
  revalidate = 60,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  revalidate?: number;
}): Promise<ShopifyGraphQLResponse<T>> {
  const endpoint = `https://${SHOPIFY_STORE}/api/2026-04/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      ...(cache !== "no-store" ? { next: { revalidate } } : {}),
    });

    if (!response.ok) {
      const text = await response.text();
      console.warn(`Shopify API responded with status ${response.status}: ${text}`);
      return { data: {} as T };
    }

    const result = (await response.json()) as ShopifyGraphQLResponse<T>;

    if (result.errors) {
      console.warn(`Shopify GraphQL errors: ${result.errors.map((e) => e.message).join(", ")}`);
    }

    return result;
  } catch (error) {
    console.error("Shopify API fetch failed:", error);
    return { data: {} as T };
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
            images(first: 20) {
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

export interface ShopifyArticle {
  id: string;
  title: string;
  publishedAt: string;
  handle: string;
  onlineStoreUrl: string;
  image: {
    url: string;
    altText: string | null;
    width?: number;
    height?: number;
  } | null;
  excerpt: string;
  content: string;
  contentHtml?: string;
  authorV2?: {
    name: string;
  } | null;
  blog: {
    title: string;
    handle: string;
  };
}

interface ShopifyBlogPostsResponse {
  articles: {
    edges: Array<{
      node: ShopifyArticle;
    }>;
  };
}

export async function getBlogPosts(): Promise<ShopifyArticle[]> {
  const query = `
    query {
      articles(first: 5) {
        edges {
          node {
            id
            title
            publishedAt
            handle
            onlineStoreUrl
            image {
              url
              altText
              width
              height
            }
            excerpt
            content
            blog {
              title
              handle
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<ShopifyBlogPostsResponse>({ query });
    return response.data.articles.edges.map(({ node }) => node);
  } catch (error) {
    console.error("Failed to fetch blog posts from Shopify:", error);
    return [];
  }
}

export async function getArticleByHandle(handle: string): Promise<ShopifyArticle | null> {
  const query = `
    query getArticleByHandle($query: String!) {
      articles(first: 1, query: $query) {
        edges {
          node {
            id
            title
            publishedAt
            handle
            onlineStoreUrl
            image {
              url
              altText
              width
              height
            }
            excerpt
            content
            contentHtml
            authorV2 {
              name
            }
            blog {
              title
              handle
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<{
      articles: {
        edges: Array<{
          node: ShopifyArticle;
        }>;
      };
    }>({ 
      query,
      variables: { query: `handle:${handle}` }
    });

    const edge = response.data.articles.edges[0];
    return edge ? edge.node : null;
  } catch (error) {
    console.error(`Failed to fetch article with handle ${handle}:`, error);
    return null;
  }
}

export interface SurveyQuestion {
  id: number;
  question: string;
  options: string[];
  order: number;
}

export async function getSurveyQuestions(): Promise<SurveyQuestion[]> {
  const query = `
    query getSurveyQuestions {
      metaobjects(type: "survey_question", first: 20) {
        edges {
          node {
            fields {
              key
              value
            }
          }
        }
      }
    }
  `;

  interface ShopifySurveyResponse {
    metaobjects: {
      edges: Array<{
        node: {
          fields: Array<{
            key: string;
            value: string;
          }>;
        };
      }>;
    };
  }

  try {
    console.log("shopifyFetch: Querying survey_question metaobjects from Shopify...");
    const response = await shopifyFetch<ShopifySurveyResponse>({ 
      query,
      cache: "no-store"
    });
    const questions: SurveyQuestion[] = [];

    if (!response.data?.metaobjects?.edges) {
      console.warn("shopifyFetch: No data or metaobjects returned from Shopify storefront API.");
      return [];
    }

    response.data.metaobjects.edges.forEach(({ node }, index) => {
      let questionText = "";
      let optionsList: string[] = [];
      let orderVal = index;

      node.fields.forEach((field) => {
        if (field.key === "question") {
          questionText = field.value;
        } else if (field.key === "options") {
          try {
            optionsList = JSON.parse(field.value) as string[];
          } catch (e) {
            console.error("shopifyFetch: Failed to parse options JSON:", field.value);
          }
        } else if (field.key === "order") {
          orderVal = parseInt(field.value) ?? index;
        }
      });

      if (questionText) {
        questions.push({
          id: orderVal + 1,
          question: questionText,
          options: optionsList,
          order: orderVal,
        });
      }
    });

    const sortedQuestions = questions.sort((a, b) => a.order - b.order);
    console.log(`shopifyFetch: Successfully retrieved ${sortedQuestions.length} survey questions from Shopify:`, JSON.stringify(sortedQuestions, null, 2));
    return sortedQuestions;
  } catch (error) {
    console.error("shopifyFetch: Failed to fetch survey questions from Shopify:", error);
    return [];
  }
}
