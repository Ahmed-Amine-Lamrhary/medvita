'use client';

import { useState } from 'react';
import Banner from '@/components/Banner';
import Product from '@/components/products/Product';
import products from '@/utils/data/products.json';

interface CategoryState {
  [key: string]: boolean;
}

interface ProductType {
  img: string;
  name: string;
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<CategoryState>({
    'Mannequin': false,
    'Medical Equipment': false,
    'Médicaux-chirurgicaux': false,
    'Medico-hospitalier': false,
    'Medico-technique': false,
    'Uncategorized': false,
  });

  const handleCategoryToggle = (category: string) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      <Banner title="Nos produits" />

      <div className="max-w-screen-xl mx-auto py-24 flex gap-9">
        {/* Sidebar */}
        <div className="p-4 w-1/4 bg-radial-custom h-fit sticky top-24">
          <div className="text-xl font-bold text-[#003087] mb-6">Catégories</div>
          <div className="space-y-3">
            {Object.keys(categories).map((category) => (
              <div key={category} className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories[category]}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 text-[#F28C38] border-gray-300 rounded focus:ring-[#003087]"
                  />
                  <span className="text-gray-500 font-medium text-sm">{category}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: ProductType, index: number) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
