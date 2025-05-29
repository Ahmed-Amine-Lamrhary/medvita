'use client';

import Product, { ProductType } from '@/components/products/Product';
import LoadingBox from '@/components/LoadingBox';
import { useState } from 'react';

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = new Set(prev);

      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }

      return newCategories;
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto py-24 flex gap-9">
      {/* Sidebar */}
      <div className="p-4 w-1/4 bg-radial-custom h-fit sticky top-24">
        <div className="text-xl font-bold text-[#003087] mb-6">Catégories</div>

        <div className="space-y-3">
          <LoadingBox endpoint="categories/all" size={20}>
            {
              (categories: string[]) => (
                <>
                  {categories?.map((category: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.has(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 text-[#F28C38] border-gray-300 rounded focus:ring-[#003087]"
                        />
                        <span className="text-gray-500 font-medium text-sm">{category}</span>
                      </label>
                    </div>
                  ))}
                </>
              )
            }
          </LoadingBox>
        </div>
      </div>

      <LoadingBox endpoint={selectedCategories.size > 0 ? `equipment/categories?categories=${Array.from(selectedCategories).join(',')}` : 'equipment'}>
        {
          (products: ProductType[]) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: ProductType, index: number) => (
                <Product key={index} product={{ ...product, img: 'images/Prothese.png' }} />
              ))}
            </div>
          )
        }
      </LoadingBox>
    </div>
  );
}
