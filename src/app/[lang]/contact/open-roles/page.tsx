import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import Link from 'next/link';

const OpenRolesPage = () => {
    const roles = [
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-1' },
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-2' },
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-3' },
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-4' },
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-5' },
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-6' },
        { name: 'Mechanical Design Engineer', slug: 'mechanical-design-engineer-7' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navigation />
            <main className="flex-1 w-full px-4 py-10">
                <div className="w-full mx-auto">
                    {/* Breadcrumbs */}
                    <div className="mb-8 text-lg">
                        <Link href="/contact" className="text-[#000D2D] hover:text-black">Contact Us</Link>
                        <span className="mx-2 text-[#000D2D]">&gt;</span>
                        <span className="text-gray-500">Open Roles</span>
                    </div>

                    <h1 className="text-4xl md:text-[56px] text-[#000D2D] font-normal mb-16">Open Roles</h1>

                    <div>
                        {roles.map((role, index) => (
                            <Link href={`/contact/open-roles/${role.slug}`} key={index} passHref>
                                <div className="group flex justify-between items-center hover:bg-[#D9DBF130] cursor-pointer transition-colors duration-200 p-8">
                                    <h2 className="text-lg text-[#000D2D] font-normal">{role.name}</h2>
                                    <div className="flex items-center text-[#000D2D] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <span className="mr-2 text-md">View role</span>
                                        <span>&rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OpenRolesPage; 