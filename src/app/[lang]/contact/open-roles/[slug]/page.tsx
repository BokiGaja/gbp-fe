import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const RolePage = ({ params }: { params: { slug: string } }) => {
    // Format slug to be a title, e.g. "mechanical-design-engineer-1" -> "Mechanical Design Engineer"
    const roleTitle = params.slug
        .split('-')
        .slice(0, -1)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const roleDetails = {
        title: roleTitle,
        sections: [
            {
                title: 'About the role',
                content: 'The founding of our company represents more than just a beginning – it is a vision built on innovation, trust, and determination to advance the military industry. Our goal is to develop technologies and solutions that not only meet but set new standards in the field of defense.'
            },
            {
                title: 'What do you value at GBP?',
                content: 'The founding of our company represents more than just a beginning – it is a vision built on innovation, trust, and determination to advance the military industry. Our goal is to develop technologies and solutions that not only meet but set new standards in the field of defense.'
            },
            {
                title: 'About the role',
                content: 'The founding of our company represents more than just a beginning – it is a vision built on innovation, trust, and determination to advance the military industry. Our goal is to develop technologies and solutions that not only meet but set new standards in the field of defense.'
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navigation />
            <main className="flex-1 w-full px-4 py-10">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="mb-8 text-lg">
                        <Link href="/contact/open-roles" className="text-[#000D2D] hover:text-black">Open Roles</Link>
                        <span className="mx-2 text-[#000D2D]">&gt;</span>
                        <span className="text-gray-500">{roleDetails.title}</span>
                    </div>

                    <h1 className="text-[40px] text-[#000D2D] font-normal mb-12">{roleDetails.title}</h1>

                    <div
                        className="flex flex-col md:flex-row relative rounded-lg"
                    >
                        {/* Left side: Role details */}
                        <div 
                            style={{ boxShadow: '0 0 25px -5px rgba(0, 0, 0, 0.1)' }} 
                            className="w-full md:w-4/5 bg-white p-12 rounded-l-lg"
                        >
                            <div className="space-y-8">
                                {roleDetails.sections.map((section, index) => (
                                    <div key={index}>
                                        <h2 className="text-[20px] font-[500] text-[#000D2D] mb-4">{section.title}</h2>
                                        <p className="text-base text-[#000D2D]/70 font-normal font-[400]">{section.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side: Apply button */}
                        <div className="w-full md:w-1/5 md:relative pt-12 min-w-[220px]">
                             <div className="md:sticky md:top-12">
                                <a href="mailto:info@gb-and-partners.com" className="flex items-center justify-center gap-2 w-full bg-[#000D2D] text-white py-4 px-6 rounded-md md:rounded-l-none text-md font-[400]">
                                    <Mail className="w-5 h-5" />
                                    <span>Apply to this role</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RolePage; 