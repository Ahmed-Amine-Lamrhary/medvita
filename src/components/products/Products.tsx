'use client';

import React from "react";
import Product, { ProductType } from "./Product";
import LoadingBox from "../LoadingBox";

export default function Products() {
    return (
        <section className="bg-gray-50">
            <div className="max-w-screen-xl mx-auto p-24">
                <h2 className="font-bold text-2xl text-center mb-11">
                    Nouveaux équipements technologiques disponibles
                </h2>

                <LoadingBox endpoint="equipment">
                    {
                        (products: ProductType[]) => (
                            <div className="grid grid-cols-4 gap-6 mt-6">
                                {products.map((product, index) => (
                                    <Product key={index} product={product} />
                                ))}
                            </div>
                        )
                    }
                </LoadingBox>
            </div>
        </section>
    );
}
