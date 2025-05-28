import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface BannerProps {
    title?: string;
}

export default function Banner({ title }: BannerProps) {
    return (
        <section
            className={`relative ${!title ? 'h-[500px] bg-center' : 'h-[200px]'} w-full bg-[#003087] overflow-hidden bg-cover`}
            style={{
                backgroundImage: "url('/images/banner.png')",
            }}
        >
            {
                title && (
                    <div
                        className="absolute inset-0 bg-no-repeat"
                        style={{
                            backgroundImage: "url('/images/banner.png')",
                            zIndex: 0,
                        }}
                    />
                )
            }

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {
                    title ? (
                        <h1 className="text-7xl font-bold text-center w-full text-blue-800">
                            {title}
                        </h1>
                    ) : (
                        <div className={`${!title ? 'mt-72' : ''} flex items-center space-x-4`}>
                            <Link href="/contact">
                                <button className="bg-[#003087] text-white px-6 py-3 rounded-md hover:bg-[#002060] transition">
                                    Nous Contacter
                                </button>
                            </Link>
                            <Link href="/products">
                                <button className="flex items-center space-x-2 text-[#003087] hover:text-[#002060] transition">
                                    <span>Explorer Le Catalogue</span>
                                    <FaPlus className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </section>
    );
}