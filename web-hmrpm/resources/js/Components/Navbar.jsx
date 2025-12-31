import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();

    const navigation = [
        { name: "Beranda", href: "/" },
        { name: "About", href: "/about" },
        { name: "Divisi & Pengurus", href: "/divisi" },
        { name: "Proker", href: "/proker" },
        { name: "Blog", href: "/blog" },
        { name: "Akademisi Prodi", href: "/akademisi" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 top-4",
                isScrolled ? "top-2" : "top-6"
            )}
        >
            <div
                className={cn(
                    "mx-auto max-w-7xl transition-all duration-500 ease-in-out",
                    isScrolled
                        ? "bg-white/80 dark:bg-brand-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl py-2"
                        : "bg-black/30 dark:bg-black/50 backdrop-blur-md border border-white/10 rounded-4xl py-4 shadow-lg shadow-black/5"
                )}
            >
                <div className="px-6 flex justify-between items-center">
                    <div className="shrink-0 flex items-center gap-3 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="bg-brand-yellow p-1.5 rounded-xl shadow-lg shadow-brand-yellow/30"
                        >
                            <img src="/logo.png" alt="Logo" className="h-7 w-auto" />
                        </motion.div>
                        <span className={cn(
                            "text-sm md:text-base font-black tracking-tight transition-all duration-500",
                            isScrolled
                                ? "text-brand-red dark:text-brand-red"
                                : "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                        )}>
                            Himpunan Mahasiswa <span className="hidden lg:inline">Rekayasa Perancangan Mekanik</span>
                            <span className="lg:hidden">RPM</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 text-xs lg:text-sm font-bold rounded-xl transition-all duration-300 relative group overflow-hidden",
                                    url === item.href
                                        ? (isScrolled
                                            ? "text-brand-red bg-brand-red/10"
                                            : "text-brand-yellow bg-white/20")
                                        : (isScrolled
                                            ? "text-foreground/60 hover:text-brand-red hover:bg-brand-red/5 dark:text-white/60 dark:hover:text-white"
                                            : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105")
                                )}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {url === item.href && !isScrolled && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 mx-3 rounded-full bg-brand-yellow"
                                    />
                                )}
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-border/20 flex items-center">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "p-2 rounded-xl border transition-all duration-300",
                                isScrolled
                                    ? "bg-muted border-border text-foreground"
                                    : "bg-white/10 border-white/20 text-white"
                            )}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: -20 }}
                className={cn(
                    "md:hidden absolute left-4 right-4 mt-2 origin-top pointer-events-none transition-all duration-300",
                    isOpen && "pointer-events-auto"
                )}
            >
                <div className="bg-background/95 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl p-4 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "block px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                url === item.href
                                    ? "bg-brand-red/10 text-brand-red"
                                    : "text-muted-foreground hover:bg-muted dark:hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </nav>
    );
};

export default Navbar;
