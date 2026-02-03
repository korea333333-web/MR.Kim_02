"use client";

import { useEffect, useState } from "react";

export default function MouseEffect() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMoved, setIsMoved] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isMoved) setIsMoved(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMoved]);

    if (!isMoved) return null; // Don't show until first move

    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(220, 20, 60, 0.15), transparent 80%)`,
            }}
        />
    );
}
