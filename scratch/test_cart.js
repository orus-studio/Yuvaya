const SHOPIFY_STORE = "f1trh0-ay.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "533d55678eccafe73cbac892ca8efb90";

const query = `
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

async function testCartCreate() {
  const endpoint = `https://${SHOPIFY_STORE}/api/2026-01/graphql.json`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          lines: [
            {
              merchandiseId: "gid://shopify/ProductVariant/58221348290641",
              quantity: 1,
            },
          ],
        },
      },
    }),
  });
  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
}

testCartCreate();
