'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { differenceInDays } from 'date-fns';

const products = [
    {
        id: 1,
        name: 'Fauteuil roulant',
        price: 200,
        rentPrice: 10,
        image: 'https://h2ssmed.com/wp-content/uploads/2024/09/ABAISSE_LANGUE_PEDIATRIQUE__-removebg-preview-600x600.png',
    },
    {
        id: 2,
        name: 'Lit médicalisé',
        price: 500,
        rentPrice: 25,
        image: 'https://h2ssmed.com/wp-content/uploads/2024/09/ABAISSE_LANGUE_PEDIATRIQUE__-removebg-preview-600x600.png',
    },
];

export default function MedicalCart() {
    const [items, setItems] = useState(
        products.map((p) => ({
            ...p,
            quantity: 1,
            mode: 'buy',
            rentStart: null,
            rentEnd: null,
        }))
    );

    const updateItem = (index: number, changes: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...changes };
        setItems(newItems);
    };

    const getRentalDays = (start: number, end: number) => {
        if (!start || !end) return 0;
        const days = differenceInDays(end, start) + 1;
        return days > 0 ? days : 0;
    };

    return (
        <div className="space-y-10 p-14 max-w-3xl mx-auto">
            {items.map((item: any, index) => {
                const rentalDays = getRentalDays(item.rentStart, item.rentEnd);
                const totalPrice =
                    item.mode === 'buy'
                        ? item.price * item.quantity
                        : item.rentPrice * rentalDays * item.quantity;

                return (
                    <div key={item.id} className="p-4 bg-white border-2 border-gray-100 rounded-md space-y-4">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-20 rounded-md object-cover" />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{item.name}</h3>

                                <div className="mt-2 flex gap-4">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name={`mode-${item.id}`}
                                            value="buy"
                                            checked={item.mode === 'buy'}
                                            onChange={() => updateItem(index, { mode: 'buy' })}
                                        />
                                        Acheter ({item.price}€)
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name={`mode-${item.id}`}
                                            value="rent"
                                            checked={item.mode === 'rent'}
                                            onChange={() => updateItem(index, { mode: 'rent' })}
                                        />
                                        Louer ({item.rentPrice}€/jour)
                                    </label>
                                </div>

                                {item.mode === 'rent' && (
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-2">
                                            <DatePicker
                                                selected={item.rentStart}
                                                onChange={(date) => updateItem(index, { rentStart: date })}
                                                selectsStart
                                                startDate={item.rentStart}
                                                endDate={item.rentEnd}
                                                placeholderText="Date de début"
                                                className="border rounded px-2 py-1"
                                            />
                                            <DatePicker
                                                selected={item.rentEnd}
                                                onChange={(date) => updateItem(index, { rentEnd: date })}
                                                selectsEnd
                                                startDate={item.rentStart}
                                                endDate={item.rentEnd}
                                                minDate={item.rentStart}
                                                placeholderText="Date de fin"
                                                className="border rounded px-2 py-1"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Jours sélectionnés : {rentalDays} &nbsp; | Prix total : {totalPrice}€
                                        </p>
                                    </div>
                                )}

                                {item.mode === 'buy' && (
                                    <p className="text-sm text-gray-600 mt-2">Prix total : {totalPrice}€</p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        updateItem(index, { quantity: Math.max(1, item.quantity - 1) })
                                    }
                                    className="px-3 py-1 bg-gray-100 rounded"
                                >
                                    –
                                </button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateItem(index, { quantity: item.quantity + 1 })}
                                    className="px-3 py-1 bg-gray-100 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            <button className="cursor-pointer w-full bg-gradient-to-r from-[#F28C38] to-[#e07b2c] text-white px-6 py-3 rounded-lg hover:from-[#e07b2c] hover:to-[#F28C38] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                Valider la commande
            </button>
        </div>
    );
}
