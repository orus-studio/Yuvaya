import { redirect } from "next/navigation";
import { getLandingProducts, getProducts } from "@/lib/shopify";

interface PageProps {
  params: Promise<{ id: string }>;
}

function cleanId(raw: string): string {
  if (!raw) return "";
  const part = raw.includes("/") ? raw.split("/").pop() || "" : raw;
  return part.replace(/[^a-zA-Z0-9_-]/g, "");
}

export async function generateStaticParams() {
  try {
    const [landingProducts, products] = await Promise.all([
      getLandingProducts().catch(() => []),
      getProducts().catch(() => []),
    ]);

    const ids = new Set<string>();
    ids.add("collagreens");

    landingProducts.forEach((p) => {
      if (p.id) {
        const cleaned = cleanId(p.id);
        if (cleaned) ids.add(cleaned);
      }
      if (p.handle) {
        const cleaned = cleanId(p.handle);
        if (cleaned) ids.add(cleaned);
      }
      p.variants?.edges?.forEach((v) => {
        if (v.node.id) {
          const cleaned = cleanId(v.node.id);
          if (cleaned) ids.add(cleaned);
        }
      });
    });

    products.forEach((p) => {
      if (p.id) {
        const cleaned = cleanId(p.id);
        if (cleaned) ids.add(cleaned);
      }
      if (p.variantId) {
        const cleaned = cleanId(p.variantId);
        if (cleaned) ids.add(cleaned);
      }
    });

    return Array.from(ids).map((id) => ({ id }));
  } catch {
    return [{ id: "collagreens" }];
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  redirect(`/?variant=${resolvedParams.id}#shop`);
}
