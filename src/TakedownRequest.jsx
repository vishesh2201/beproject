import React from "react";

export default function TakedownRequest({ takedownDomain, setTakedownDomain, takedownReason, setTakedownReason }) {
    return (
        <>
            <input
                type="text"
                placeholder="Domain to takedown (e.g. scam.com)"
                className="w-full border p-3 rounded mb-4 text-base"
                value={takedownDomain}
                onChange={e => setTakedownDomain(e.target.value)}
            />
            <textarea
                placeholder="Reason for takedown"
                className="w-full border p-3 rounded mb-4 text-base"
                rows={3}
                value={takedownReason}
                onChange={e => setTakedownReason(e.target.value)}
            />
            <button className="px-6 py-2 rounded bg-purple-700 text-white font-semibold w-full max-w-xs">Request Takedown</button>
        </>
    );
}
