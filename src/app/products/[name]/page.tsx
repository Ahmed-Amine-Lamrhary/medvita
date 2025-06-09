"use client";

import AddToQuote from "@/components/cart/AddToQuote";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Product, { ProductType } from "@/components/products/Product";
import LoadingBox from "@/components/LoadingBox";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { name } = useParams();

  return (
    <>
      <LoadingBox endpoint={`equipment/details/${name}`}>
        {(product: ProductType) => (
          <div className="max-w-screen-xl mx-auto pt-24 flex gap-9">
            <div className="p-4 w-2/3 sticky top-24">
              <div className="max-w-sm mx-auto">
                <Zoom>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/${product.imageName}`}
                    alt="Produit"
                    className="rounded-md cursor-zoom-in"
                  />
                </Zoom>
              </div>
            </div>

            <div className="w-full">
              <div className="text-4xl font-bold text-[#003087] mb-6">
                {product.name}
              </div>

              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base">
                {product.features
                  ?.split(";")
                  .filter(Boolean)
                  .map((feature, index) => {
                    const match = feature.match(/^([^:]+):\s*(.+)$/); // Detect "Label: value"
                    if (match) {
                      return (
                        <li key={index}>
                          <span className="font-semibold">
                            {match[1].trim()}:
                          </span>{" "}
                          {match[2].trim()}
                        </li>
                      );
                    } else {
                      const words = feature.trim().split(" ");
                      return (
                        <li key={index}>
                          <span className="font-semibold">
                            {words.slice(0, 2).join(" ")}
                          </span>{" "}
                          {words.slice(2).join(" ")}
                        </li>
                      );
                    }
                  })}
              </ul>

              <div className="mt-10">
                <AddToQuote product={product} />
              </div>
            </div>
          </div>
        )}
      </LoadingBox>

      {/* similar products */}
      <LoadingBox endpoint="equipment">
        {(products: ProductType[]) => (
          <div className="max-w-screen-xl mx-auto pb-24">
            <div className="text-2xl font-bold text-[#003087] text-center mb-6">
              Produits similaires
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: ProductType, index: number) => (
                <Product key={index} product={product} />
              ))}
            </div>
          </div>
        )}
      </LoadingBox>
    </>
  );
}
