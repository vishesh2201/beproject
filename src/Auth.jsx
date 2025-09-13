import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setError(error.message);
            else alert('Login successful!');
        } else {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setError(error.message);
            else alert('Signup successful! Check your email to confirm.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ background: 'linear-gradient(135deg, #EFE9E7 0%, #DAE0F2 100%)' }}>
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto p-6 sm:p-8 border-2" style={{ borderColor: '#52154E' }}>
                {/* Tab Switcher */}
                <div className="relative flex mb-6 sm:mb-8 bg-[#EFE9E7] rounded-lg overflow-hidden" style={{ height: 48 }}>
                    <button
                        className={`flex-1 z-10 py-3 text-sm sm:text-base font-semibold transition-colors duration-300 ${isLogin ? 'text-[#52154E]' : 'text-[#111344]'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 z-10 py-3 text-sm sm:text-base font-semibold transition-colors duration-300 ${!isLogin ? 'text-[#52154E]' : 'text-[#111344]'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                    <span
                        className="absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-300"
                        style={{
                            background: '#F9CFF2',
                            transform: isLogin ? 'translateX(0%)' : 'translateX(100%)',
                            boxShadow: '0 2px 8px 0 #f9cff2cc',
                        }}
                    />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6" style={{ color: '#52154E' }}>
                    {isLogin ? 'Login to your account' : 'Create Your Account'}
                </h2>

                {error && (
                    <div className="p-3 rounded mb-4 text-center text-sm sm:text-base" style={{ background: '#F9CFF2', color: '#52154E' }}>
                        {error}
                    </div>
                )}

                <div className="overflow-hidden" style={{ height: 'auto', minHeight: 240 }}>
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: isLogin ? 'translateX(0%)' : 'translateX(-50%)', width: '200%' }}
                    >
                        {/* Login Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 flex flex-col items-center w-1/2 px-2"
                            style={{ minWidth: 0 }}
                        >
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full max-w-xs px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base"
                                style={{ borderColor: '#52154E', color: '#111344', background: '#fff', boxShadow: 'none' }}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full max-w-xs px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base"
                                style={{ borderColor: '#52154E', color: '#111344', background: '#fff', boxShadow: 'none' }}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full max-w-xs py-3 rounded-md font-semibold border transition text-sm sm:text-base"
                                style={{ background: '#111344', color: '#F9CFF2', borderColor: '#52154E' }}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Login'}
                            </button>
                        </form>
                        {/* Sign Up Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 flex flex-col items-center w-1/2 px-2"
                            style={{ minWidth: 0 }}
                        >
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full max-w-xs px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base"
                                style={{ borderColor: '#52154E', color: '#111344', background: '#fff', boxShadow: 'none' }}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full max-w-xs px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base"
                                style={{ borderColor: '#52154E', color: '#111344', background: '#fff', boxShadow: 'none' }}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full max-w-xs py-3 rounded-md font-semibold border transition text-sm sm:text-base"
                                style={{ background: '#111344', color: '#F9CFF2', borderColor: '#52154E' }}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-4 sm:mt-6 text-center" style={{ color: '#52154E' }}>
                    <button
                        type="button"
                        className="hover:underline font-medium text-sm sm:text-base"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin
                            ? "Don't have an account? Sign Up"
                            : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}