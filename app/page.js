"use client";

import dynamic from "next/dynamic";

const KingSquare = dynamic(() => import("../kingsquare"), {
    ssr: false,
    loading: () => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0D1117", color: "#D4A017", fontFamily: "Georgia, serif", fontSize: 18 }}>
            Loading KingSquare...
        </div>
    ),
});

export default function Home() {
    return <KingSquare />;
}
