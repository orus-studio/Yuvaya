const fs = require('fs');
const path = require('path');

const urls = {
  shipping: 'https://shop.yuvaya.in/policies/shipping-policy',
  refund: 'https://shop.yuvaya.in/policies/refund-policy',
  privacy: 'https://shop.yuvaya.in/policies/privacy-policy'
};

async function fetchPolicy(name, url) {
  try {
    console.log(`Fetching ${name} from ${url}...`);
    const res = await fetch(url);
    const html = await res.text();
    
    // Simple regex parser to extract policy title and body
    // Shopify policies usually have:
    // <div class="shopify-policy__title"><h1>...</h1></div>
    // <div class="shopify-policy__body">...</div>
    
    const titleMatch = html.match(/class=["']shopify-policy__title["'][^>]*>[\s\S]*?<h1>([\s\S]*?)<\/h1>/i) || 
                       html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Unknown';
    
    // Find shopify-policy__body content
    let body = '';
    const bodyMatch = html.match(/class=["']shopify-policy__body["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/i) ||
                      html.match(/class=["']shopify-policy__body["'][^>]*>([\s\S]*?)<\/div>/i);
                      
    if (bodyMatch) {
      body = bodyMatch[1];
    } else {
      // Fallback: search for standard content wrapper or clean the text
      body = 'Could not find policy body class. Saving full HTML instead.';
    }
    
    // Let's strip HTML tags to make it readable markdown-like text
    const cleanBody = body
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n\s+\n/g, '\n\n')
      .trim();

    const output = `TITLE: ${title}\n\nURL: ${url}\n\nCONTENT:\n\n${cleanBody}`;
    const filePath = path.join(__dirname, `${name}_policy.txt`);
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`Saved ${name}_policy.txt`);
  } catch (err) {
    console.error(`Error fetching ${name}:`, err);
  }
}

async function run() {
  for (const [name, url] of Object.entries(urls)) {
    await fetchPolicy(name, url);
  }
}

run();
