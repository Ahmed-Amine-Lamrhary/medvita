'use client';

import Banner from "@/components/Banner";
import MedicalCart, { CartItem } from "@/components/cart/MedicalCart";
import PaymentMethod from "@/components/cart/PaymentMethod";
import FormField from "@/components/forms/FormField";
import { callApi } from "@/utils/http-client";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const paymentMethods = [
  {
    value: "CARTE",
    label: "Credit Card",
    image: "credit-card.svg",
    imageWidth: 200
  },
  {
    value: "ESPECES",
    label: "PayPal",
    image: "paypal.svg",
    imageWidth: 80
  }
];

const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required(),
  address: Yup.string().required(),
  city: Yup.string().required(),
  zipCode: Yup.number().required(),
  country: Yup.string().required(),
  socialSecurityNumber: Yup.number().required(),
  paymentMethod: Yup.string().required("Please select a payment method")
});

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>([]);

  async function submit(values: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];

    const purchaseItems = cart.filter((item: any) => item.mode === 'buy').map((item: any) => ({
      equipmentId: item.product.id,
      quantity: item.quantity
    }));

    const rentalItems = cart.filter((item: any) => item.mode === 'rent').map((item: any) => ({
      equipmentId: item.product.id,
      quantity: item.quantity,
      startDate: item.rentStart,
      endDate: item.rentEnd
    }));

    const data = {
      client: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        adress: values.address,
        city: values.city,
        postalCode: values.zipCode,
        country: values.country,
        socialSecurityNumber: values.socialSecurityNumber
      },
      paymentMethod: values.paymentMethod,
      purchaseItems,
      rentalItems
    }

    try {
      const response = await callApi({
        endpoint: "cart/checkout",
        method: "POST",
        body: data
      });

      console.log('Checkout response:', response);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error(error.message);
    }
  }

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
    <div>
      <Banner title="Votre Devis" />

      <div>
        <div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              fullName: 'a',
              email: 'a@gmail.com',
              phone: '+2123456789',
              address: 'a',
              city: 'a',
              zipCode: 30000,
              country: 'FR',
              socialSecurityNumber: 12345678,
              paymentMethod: paymentMethods[0].value
            }}
            onSubmit={submit}
          >
            {({ setFieldValue }) => {
              return (
                <Form>
                  <div className="space-y-10 p-14 max-w-3xl mx-auto">
                    <div className="grid grid-cols-12 gap-4 mb-3">
                      <div className="col-span-12 md:col-span-6">
                        <FormField
                          label="Full Name*"
                          type="text"
                          name="fullName"
                          hideLabel
                        />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <FormField
                          label="Email Address*"
                          type="email"
                          name="email"
                          hideLabel
                        />
                      </div>
                    </div>

                    <div className="mb-8 mt-5">
                      <div className="grid grid-cols-12 gap-4 mb-3">
                        <div className="col-span-12">
                          <FormField
                            label="Address"
                            type="text"
                            name="address"
                            hideLabel
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 mb-3">
                        <div className="col-span-6">
                          <FormField
                            label="Phone"
                            type="tel"
                            name="phone"
                            hideLabel
                          />
                        </div>

                        <div className="col-span-6">
                          <FormField
                            label="Social Security Number"
                            type="number"
                            name="socialSecurityNumber"
                            hideLabel
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 mb-3">
                        <div className="col-span-12 md:col-span-4">
                          <FormField
                            label="City"
                            type="text"
                            name="city"
                            hideLabel
                          />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                          <FormField
                            label="State"
                            type="text"
                            name="state"
                            hideLabel
                          />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                          <FormField
                            label="ZIP Code"
                            type="number"
                            name="zipCode"
                            hideLabel
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 mb-3">
                        <div className="col-span-12">
                          <FormField
                            label="Country"
                            type="country"
                            name="country"
                            hideLabel
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="uppercase text-xs md:text-sm tracking-widest font-semibold mb-5">
                          Payment Method
                        </h3>

                        {paymentMethods.map((method) => (
                          <PaymentMethod
                            key={method.value}
                            name="paymentMethod"
                            value={method.value}
                            label={method.label}
                            image={method.image}
                            imageWidth={method.imageWidth}
                            onChange={() => setFieldValue('paymentMethod', method.value)}
                          />
                        ))}
                      </div>
                    </div>

                    <MedicalCart items={items} setItems={setItems} />
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
