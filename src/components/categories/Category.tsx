import React from "react";

interface CategoryProps {
    category: {
        img: string;
        name: string;
    };
}

export default function Category({ category }: CategoryProps) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="w-36 h-3w-36 rounded-full overflow-hidden shadow-md border border-gray-400">
                <img src={category.img} alt={category.name} className="w-full h-full object-cover" />
            </div>
            <span className="mt-4 text-md font-medium">{category.name}</span>
        </div>
    );
}
