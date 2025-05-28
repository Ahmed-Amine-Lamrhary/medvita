'use client';

import Banner from '@/components/Banner';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Banner title="Nos produits" />

      {children}
    </div>
  );
}
