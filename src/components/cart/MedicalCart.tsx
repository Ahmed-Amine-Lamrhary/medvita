'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { differenceInDays } from 'date-fns';
import Link from 'next/link';
import { ProductType } from '../products/Product';

export interface CartItem {
    product: ProductType,
    quantity: number,
    mode: 'buy' | 'rent',
    rentStart?: Date,
    rentEnd?: Date
}

export default function MedicalCart() {
    const [items, setItems] = useState<CartItem[]>([]);

    const updateItem = (index: number, changes: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...changes };
        setItems(newItems);

        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const deleteItem = (index: number) => {
        const newItems = [...items].filter((_, i) => i !== index);
        setItems(newItems);

        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const getRentalDays = (start?: Date, end?: Date) => {
        if (!start || !end) return 0;
        const days = differenceInDays(end, start) + 1;
        return days > 0 ? days : 0;
    };

    useEffect(() => {
        setItems(
            JSON.parse(localStorage.getItem('cart') || '[]') || []
        );
    }, []);

    if (items.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-14 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
                <p className="text-gray-600">Ajoutez des produits à votre panier pour commencer.</p>

                <div className="mt-10">
                    <Link href="/products" className="cursor-pointer w-full bg-gradient-to-r from-[#F28C38] to-[#e07b2c] text-white px-6 py-3 rounded-lg hover:from-[#e07b2c] hover:to-[#F28C38] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                        Voir les produits
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 p-14 max-w-3xl mx-auto">
            {items.map((item: CartItem, index: number) => {
                const rentalDays = getRentalDays(item.rentStart, item.rentEnd);

                function totalPrice() {
                    let price = 0;
                    if (item.mode === 'buy') {
                        price = item.product.purchasePrice * item.quantity;
                    }
                    else {
                        price = item.product.dailyRentalPrice * rentalDays * item.quantity;
                    }

                    return price.toFixed(2);
                }

                return (
                    <div key={item.product.id} className="p-4 bg-white border-2 border-gray-100 rounded-md space-y-4">
                        <div className="flex items-center gap-4">
                            <img src={item.product.image} alt={item.product.name} className="w-24 h-20 rounded-md object-cover" />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{decodeURIComponent(item.product.name)}</h3>

                                <div className="mt-2 flex gap-4">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name={`mode-${item.product.id}`}
                                            value="buy"
                                            checked={item.mode === 'buy'}
                                            onChange={() => updateItem(index, { mode: 'buy' })}
                                        />
                                        Acheter ({item.product.purchasePrice}€)
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name={`mode-${item.product.id}`}
                                            value="rent"
                                            checked={item.mode === 'rent'}
                                            onChange={() => updateItem(index, { mode: 'rent' })}
                                        />
                                        Louer ({item.product.dailyRentalPrice}€/jour)
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
                                            Jours sélectionnés : {rentalDays} &nbsp; | Prix total : {totalPrice()}€
                                        </p>
                                    </div>
                                )}

                                {item.mode === 'buy' && (
                                    <p className="text-sm text-gray-600 mt-2">Prix total : {totalPrice()}€</p>
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

                        <div className='text-right'>
                            <button onClick={() => deleteItem(index)} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer'>Supprimer</button>
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
