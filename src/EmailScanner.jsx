import React from "react";

export default function EmailScanner({ setEmailFile }) {
    return (
        <>
            <input
                type="file"
                className="mb-4 w-full"
                onChange={e => setEmailFile(e.target.files[0])}
            />
            <button className="px-6 py-2 rounded bg-purple-700 text-white font-semibold w-full max-w-xs">Scan Email</button>
        </>
    );
}
