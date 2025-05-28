import Link from 'next/link';
import { businessName } from '@/utils/shared.json';

export default function Footer() {
    return (
        <footer className="bg-[#121212] text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-xl font-bold text-[#F28C38]">
                            {businessName}
                        </h3>
                        <p className="text-gray-300 mt-2">
                            Votre partenaire de confiance pour le matériel médical certifié.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold">Liens Utiles</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link href="/products" className="text-gray-300 hover:text-[#F28C38]">Nos Produits</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-[#F28C38]">À Propos</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-[#F28C38]">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold">Contactez-Nous</h3>
                        <p className="text-gray-300 mt-2">123 Rue de la Santé, 75001 Paris</p>
                        <p className="text-gray-300">Phone: +33 1 23 45 67 89</p>
                        <p className="text-gray-300">Email: contact@h2ssmedical.com</p>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-400">
                    <p>© 2025 {businessName}. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
