'use client';

import AddToQuote from "@/components/cart/AddToQuote";
import Zoom from 'react-medium-image-zoom';
import products from '@/utils/data/products.json';
import 'react-medium-image-zoom/dist/styles.css';
import Product from "@/components/products/Product";
import { ProductType } from "../page";

export default function ProductPage() {
    return (
        <>
            <div className="max-w-screen-xl mx-auto pt-24 flex gap-9">
                <div className="p-4 w-2/3 sticky top-24">
                    <div className="max-w-sm mx-auto">
                        <Zoom>
                            <img
                                src="https://h2ssmed.com/wp-content/uploads/2024/07/ABS-FIXATION-DEVICE-30-TACKS-X-6.png.webp"
                                alt="Produit"
                                className="rounded-md cursor-zoom-in"
                            />
                        </Zoom>
                    </div>

                </div>

                <div className="w-full">
                    <div className="text-4xl font-bold text-[#003087] mb-6">ABS FIXATION DEVICE 30 TACKS X 6</div>

                    <ul className="list-disc list-inside space-y-2 text-gray-800 text-base">
                        <li><span className="font-semibold">Instrument médical</span> dernier cri et robuste</li>
                        <li><span className="font-semibold">Confort optimal</span> pour le patient</li>
                        <li><span className="font-semibold">Longueur de l’agrafe :</span> 4,1 mm, <span className="font-semibold">largeur :</span> 5,1 mm</li>
                        <li><span className="font-semibold">Taille de l’arbre :</span> 5 mm</li>
                        <li><span className="font-semibold">Agrafe violette</span> avec fonction de visualisation point noir</li>
                        <li><span className="font-semibold">Conditionnement :</span> 6 agrafes par boîte</li>
                    </ul>

                    <div className="mt-10">
                        <AddToQuote />
                    </div>
                </div>
            </div>

            {/* similar products */}
            <div className="max-w-screen-xl mx-auto pb-24">
                <div className="text-2xl font-bold text-[#003087] text-center mb-6">Produits similaires</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product: ProductType, index: number) => (
                        <Product key={index} product={product} />
                    ))}
                </div>
            </div>

        </>
    );
}
