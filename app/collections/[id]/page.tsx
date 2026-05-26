import { redirect } from 'next/navigation';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  // Server-side redirect to landing page's ShopFromUs section for SEO
  redirect('/#shop');
}
