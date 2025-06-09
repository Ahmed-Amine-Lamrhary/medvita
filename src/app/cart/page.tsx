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
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const IS_DEBUG = false;

const paymentMethods = [
  {
    value: "CARTE",
    label: "Carte de Crédit",
    image: "credit-card.svg",
    imageWidth: 200,
    subTitle: "Visa, Mastercard, American Express"
  },
  {
    value: "ESPECES",
    label: "Espèces",
    image: "cash.svg",
    imageWidth: 50,
    subTitle: "Paiement en espèces à la livraison"
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
  paymentMethod: Yup.string().required("Please select a payment method"),

  cvc: Yup.string().optional(),
  expiry: Yup.string().optional(),
  number: Yup.string().optional()
});

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [invoiceUrl, setInvoiceUrl] = useState<string>("");

  async function submit(values: any, formikHelpers: any) {
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

      setItems([]);
      formikHelpers.resetForm();
      localStorage.removeItem('cart');

      const invoiceNumber = response.data.invoice.invoiceNumber;
      const invoiceUrl = `${process.env.NEXT_PUBLIC_API_URL}/invoices/cart_${invoiceNumber}.pdf`;

      setInvoiceUrl(invoiceUrl);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error(error.message || "Une erreur s'est produite lors de l'envoi du devis.");
    }
  }

  useEffect(() => {
    setItems(
      JSON.parse(localStorage.getItem('cart') || '[]') || []
    );
  }, []);

  if (items.length === 0 && !invoiceUrl) {
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
          {invoiceUrl ? (
            <>
              <div className="max-w-3xl mx-auto p-14 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Devis envoyé avec succès !</h2>
                <p className="text-gray-600 mb-4">Votre devis a été envoyé à votre adresse e-mail.</p>
                <p className="text-gray-600 mb-4">Vous pouvez également télécharger votre devis en cliquant sur le lien ci-dessous :</p>
                <a href={invoiceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block cursor-pointer w-full bg-gradient-to-r from-[#F28C38] to-[#e07b2c] text-white px-6 py-3 rounded-lg hover:from-[#e07b2c] hover:to-[#F28C38] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                  Télécharger le devis
                </a>
              </div>
            </>
          ) : (
            <Formik
              validationSchema={validationSchema}
              initialValues={
                IS_DEBUG ? {
                  fullName: 'a',
                  email: 'a@gmail.com',
                  phone: '+2123456789',
                  address: 'a',
                  city: 'a',
                  zipCode: 30000,
                  country: 'FR',
                  socialSecurityNumber: 12345678,
                  paymentMethod: paymentMethods[0].value,

                  cvc: "",
                  expiry: "",
                  number: ""
                } : {
                  fullName: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  zipCode: 0,
                  country: 'FR',
                  socialSecurityNumber: 0,
                  paymentMethod: paymentMethods[0].value,

                  cvc: "",
                  expiry: "",
                  number: ""
                }}
              onSubmit={submit}
            >
              {({ setFieldValue, values }) => {
                return (
                  <Form>
                    <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-4 p-16">
                      <div>
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
                                type="telephone"
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
                            <h3 className="mt-10 uppercase text-xs md:text-sm tracking-widest font-semibold mb-5">
                              Mode de paiement
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
                                subTitle={method.subTitle}
                              />
                            ))}
                          </div>
                        </div>

                        {
                          values.paymentMethod === 'CARTE' && (
                            <div className="mb-3">
                              <div className="mb-5">
                                <Cards cvc={values.cvc} expiry={values.expiry} name={values.fullName} number={values.number} />
                              </div>

                              <div className="col-span-6">
                                <div className="col-span-12 md:col-span-6">
                                  <FormField
                                    label="Numéro de Carte"
                                    type="tel"
                                    name="number"
                                    hideLabel
                                  />
                                </div>

                                <div className="grid grid-cols-12 gap-4 mt-3">
                                  <div className="col-span-12 md:col-span-6">
                                    <FormField
                                      label="Code CVC"
                                      type="number"
                                      name="cvc"
                                      hideLabel
                                    />
                                  </div>
                                  <div className="col-span-12 md:col-span-6">
                                    <FormField
                                      label="Date d'Expiration"
                                      type="date"
                                      name="expiry"
                                      hideLabel
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </div>

                      <div>
                        <MedicalCart items={items} setItems={setItems} />
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
