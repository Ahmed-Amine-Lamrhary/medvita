import React from "react";
import categories from "@/utils/data/categories.json";
import Category from "./Category";

export default function Categories() {
    return (
        <section className="max-w-screen-xl mx-auto py-24">
            <h2 className="text-blue-600 font-bold text-sm uppercase">Plus de catégories</h2>
            <p className="text-gray-800 font-semibold text-lg mt-2">
                Explorez notre gamme complète d’équipements médicaux classés par catégorie.
            </p>

            <div className="grid grid-cols-4 gap-6 mt-6">
                {categories.map((category, index) => (
                    <Category key={index} category={category} />
                ))}
            </div>
        </section>
    );
}
