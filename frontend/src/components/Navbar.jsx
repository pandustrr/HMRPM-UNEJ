import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

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
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-brand-red to-brand-yellow bg-clip-text text-transparent">
                            HMRPM
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-200 hover:text-brand-yellow",
                                    location.pathname === item.href
                                        ? "text-brand-yellow"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground hover:text-brand-yellow focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-muted hover:text-brand-yellow transition-colors",
                                    location.pathname === item.href
                                        ? "text-brand-yellow"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
