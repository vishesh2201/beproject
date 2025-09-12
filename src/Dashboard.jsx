import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

import { HiOutlineMail, HiOutlineLink, HiOutlineShieldCheck, HiOutlineExclamationCircle } from 'react-icons/hi';
import UrlScanner from './UrlScanner';
import EmailScanner from './EmailScanner';
import MetadataFetcher from './MetadataFetcher';
import TakedownRequest from './TakedownRequest';

export default function Dashboard() {
    const [selectedTool, setSelectedTool] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    // Tool definitions
    const tools = [
        {
            id: 'email',
            icon: <HiOutlineMail />,
            title: 'Email Scanner',
            description: 'Scan your emails for threats—free and instant.'
        },
        {
            id: 'url',
            icon: <HiOutlineLink />,
            title: 'URL Scanner',
            description: 'Scan URLs for phishing and scams.'
        },
        {
            id: 'metadata',
            icon: <HiOutlineShieldCheck />,
            title: 'Metadata Fetching',
            description: 'Retrieve detailed metadata and security information for any website or domain.'
        },
        {
            id: 'takedown',
            icon: <HiOutlineExclamationCircle />,
            title: 'Takedown',
            description: 'Request takedown of scam sites.'
        },
    ];

    const toolsMap = Object.fromEntries(tools.map(t => [t.id, t]));

    // Form state for each tool
    const [urlInput, setUrlInput] = useState('');
    const [emailFile, setEmailFile] = useState(null);
    const [typoDomain, setTypoDomain] = useState('');
    const [takedownDomain, setTakedownDomain] = useState('');
    const [takedownReason, setTakedownReason] = useState('');

    return (
        <div className="min-h-screen w-full" style={{ background: 'linear-gradient(135deg, #EFE9E7 0%, #DAE0F2 100%)' }}>
            {/* Header */}
            <header className="shadow flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-4" style={{ background: '#52154E' }}>
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                    <span className="text-xl sm:text-2xl font-bold" style={{ color: '#F9CFF2' }}>Cybersecurity Toolkit</span>
                </div>
                <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <button className="font-medium hover:underline text-sm sm:text-base" style={{ color: '#DAE0F2' }}>Products</button>
                    <button className="font-medium hover:underline text-sm sm:text-base" style={{ color: '#DAE0F2' }}>Solutions</button>
                    <button className="font-medium hover:underline text-sm sm:text-base" style={{ color: '#DAE0F2' }}>Blog</button>
                    <button className="font-medium hover:underline text-sm sm:text-base" style={{ color: '#DAE0F2' }}>Glossary</button>
                    <button className="font-medium hover:underline text-sm sm:text-base" style={{ color: '#DAE0F2' }}>Community</button>
                </nav>
                <div className="flex gap-2 mt-4 sm:mt-0">
                    <button
                        className="px-4 py-2 rounded border text-sm sm:text-base"
                        style={{ borderColor: '#F9CFF2', color: '#F9CFF2', background: 'transparent' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {!selectedTool ? (
                    // Cards Grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto py-12">
                        {tools.map(tool => (
                            <div
                                key={tool.id}
                                className="p-6 rounded-xl shadow hover:shadow-lg bg-white cursor-pointer transition transform hover:scale-105 flex flex-col items-center text-center"
                                onClick={() => setSelectedTool(tool.id)}
                            >
                                <div className="text-4xl mb-4 text-purple-700">{tool.icon}</div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900">{tool.title}</h3>
                                <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Split Screen
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center max-w-6xl mx-auto py-12 px-4">
                        {/* Left Side */}
                        <div className="md:col-span-2 flex flex-col items-start">
                            <button onClick={() => setSelectedTool(null)} className="text-sm text-blue-600 mb-4 hover:underline">← Back to Tools</button>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{toolsMap[selectedTool].title}</h2>
                            <p className="text-lg text-gray-700 mb-6">{toolsMap[selectedTool].description}</p>
                            <div className="text-6xl text-purple-700">{toolsMap[selectedTool].icon}</div>
                        </div>
                        {/* Right Side */}
                        <div className="md:col-span-3 p-6 bg-white rounded-xl shadow flex flex-col items-center w-full">
                            {selectedTool === 'url' && (
                                <UrlScanner urlInput={urlInput} setUrlInput={setUrlInput} />
                            )}
                            {selectedTool === 'email' && (
                                <EmailScanner setEmailFile={setEmailFile} />
                            )}
                            {selectedTool === 'metadata' && (
                                <MetadataFetcher typoDomain={typoDomain} setTypoDomain={setTypoDomain} />
                            )}
                            {selectedTool === 'takedown' && (
                                <TakedownRequest
                                    takedownDomain={takedownDomain}
                                    setTakedownDomain={setTakedownDomain}
                                    takedownReason={takedownReason}
                                    setTakedownReason={setTakedownReason}
                                />
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}