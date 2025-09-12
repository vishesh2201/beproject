import React from "react";

export default function MetadataFetcher({ typoDomain, setTypoDomain }) {
    return (
        <>
            <input
                type="text"
                placeholder="Enter domain (e.g. example.com)"
                className="w-full border p-3 rounded mb-4 text-base"
                value={typoDomain}
                onChange={e => setTypoDomain(e.target.value)}
            />
            <button className="px-6 py-2 rounded bg-purple-700 text-white font-semibold w-full max-w-xs">Fetch Metadata</button>
        </>
    );
}
