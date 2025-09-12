import React, { useState } from "react";

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hi! 👋 How can I help you today?' },
        { from: 'bot', text: 'You can ask about our tools or just say hello.' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, { from: 'user', text: input }]);
        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {open ? (
                <div className="w-80 h-96 bg-white rounded-xl shadow-lg flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2 border-b rounded-t-xl bg-purple-700">
                        <span className="text-white font-semibold">Chatbot</span>
                        <button
                            className="text-white text-lg font-bold hover:opacity-70"
                            onClick={() => setOpen(false)}
                            aria-label="Minimize chatbot"
                        >
                            –
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={
                                    msg.from === 'user'
                                        ? 'flex justify-end'
                                        : 'flex justify-start'
                                }
                            >
                                <div
                                    className={
                                        'px-3 py-2 rounded-lg max-w-[75%] ' +
                                        (msg.from === 'user'
                                            ? 'bg-purple-700 text-white'
                                            : 'bg-white border text-gray-800')
                                    }
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="p-2 border-t flex gap-2 bg-white">
                        <input
                            type="text"
                            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
                            placeholder="Type a message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-purple-700 text-white px-4 py-2 rounded font-semibold hover:bg-purple-800"
                        >
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    className="w-16 h-16 rounded-full bg-purple-700 shadow-lg flex items-center justify-center text-white text-3xl hover:scale-105 transition"
                    onClick={() => setOpen(true)}
                    aria-label="Open chatbot"
                >
                    💬
                </button>
            )}
        </div>
    );
}
