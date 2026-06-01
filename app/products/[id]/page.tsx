import { redirect } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  // Redirect to landing page and pass the variant handle or ID in the query param
  redirect(`/?variant=${resolvedParams.id}#shop`);
}
