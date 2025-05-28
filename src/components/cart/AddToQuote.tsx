import { useState } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri';

export default function AddToQuote() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center bg-red-50 rounded-full px-3 py-2">
                <button
                    onClick={decrement}
                    className="bg-white w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-medium text-xl"
                >
                    –
                </button>
                <span className="mx-3 text-gray-800 font-semibold text-lg">{quantity}</span>
                <button
                    onClick={increment}
                    className="bg-white w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-medium text-xl"
                >
                    +
                </button>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-medium rounded-full flex items-center px-6 py-3 text-base">
                <RiShoppingCart2Line className="w-5 h-5 mr-2" />
                Ajouter au devis
            </button>
        </div>
    );
}
