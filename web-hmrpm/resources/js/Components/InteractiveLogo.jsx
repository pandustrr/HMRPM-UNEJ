import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/**
 * InteractiveLogo Component
 * Features a high-performance 3D tilt effect with dedicated layers for depth.
 */
const InteractiveLogo = ({ src }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smoothed movement with springs
    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

    // Rotation transforms - increased range for visibility
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / rect.width) - 0.5;
        const yPct = (mouseY / rect.height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: "1500px" }}>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                className="relative group p-12 bg-linear-to-br from-brand-yellow via-brand-yellow to-[#e2db1a] rounded-[3rem] shadow-2xl cursor-pointer"
            >
                {/* Floating Shadow Layer (Behind Logo) */}
                <motion.div
                    style={{
                        transform: "translateZ(30px)",
                        x: useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]),
                        y: useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]),
                    }}
                    className="absolute inset-0 bg-black/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Primary Image Layer (High Depth) */}
                <div style={{ transform: "translateZ(120px)", transformStyle: "preserve-3d" }}>
                    <img
                        src={src}
                        alt="HMRPM Logo 3D"
                        className="w-64 h-64 object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Glossy Overlay Border (Middle Depth) */}
                <div
                    className="absolute inset-0 border-4 border-white/40 rounded-[3rem] pointer-events-none z-20"
                    style={{ transform: "translateZ(40px)" }}
                />

                {/* Light Glare (Top Depth) */}
                <motion.div
                    className="absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 80%)",
                        transform: "translateZ(80px)",
                        x: useTransform(mouseXSpring, [-0.5, 0.5], [-60, 60]),
                        y: useTransform(mouseYSpring, [-0.5, 0.5], [-60, 60]),
                    }}
                />

                {/* Subtle Shine Background */}
                <div className="absolute inset-0 rounded-[3rem] bg-linear-to-tr from-white/20 to-transparent pointer-events-none"></div>
            </motion.div>
        </div>
    );
};

export default InteractiveLogo;
