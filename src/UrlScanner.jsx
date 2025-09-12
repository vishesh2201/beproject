import React from "react";

export default function UrlScanner({ urlInput, setUrlInput }) {
    return (
        <>
            <input
                type="text"
                placeholder="Enter suspicious URL"
                className="w-full border p-3 rounded mb-4 text-base"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
            />
            <button className="px-6 py-2 rounded bg-purple-700 text-white font-semibold w-full max-w-xs">Scan Now</button>
        </>
    );
}
