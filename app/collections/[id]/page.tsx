import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [{ id: "all" }, { id: "collagreens" }, { id: "frontpage" }];
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  redirect(`/?variant=${resolvedParams.id}#shop`);
}
