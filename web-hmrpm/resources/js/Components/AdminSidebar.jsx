import { Link, usePage, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    FileText,
    Users,
    Calendar,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Trophy,
    Info,
    GraduationCap,
    Home
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
    const { url } = usePage();
    const [openSubmenu, setOpenSubmenu] = useState("Divisi & Pengurus"); // Default open

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        { name: "Beranda", icon: Home, href: "/admin/beranda" },
        { name: "About", icon: Info, href: "/admin/about" },
        {
            name: "Divisi & Pengurus",
            icon: Users,
            href: "/admin/divisions-dashboard",
            submenu: [
                { name: "Kelola Periode", href: "/admin/periods" },
                { name: "Kelola Divisi & Pengurus", href: "/admin/divisions" },
            ]
        },
        { name: "Proker", icon: Trophy, href: "/admin/proker" },
        { name: "Blog", icon: FileText, href: "/admin/blog" },
        { name: "Akademisi Prodi", icon: GraduationCap, href: "/admin/akademisi" },
    ];

    const toggleSubmenu = (itemName) => {
        setOpenSubmenu(openSubmenu === itemName ? null : itemName);
    };

    const isActiveSubmenu = (submenu) => {
        return submenu.some(sub => url.startsWith(sub.href));
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen z-50 transition-all duration-500 ease-in-out",
                "bg-white backdrop-blur-2xl border-r border-slate-200",
                isCollapsed ? "w-20" : "w-72"
            )}
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                            <span className="font-black text-brand-red tracking-tighter">ADMIN PANEL</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="px-3 py-4 space-y-1">
                {menuItems.map((item) => (
                    <div key={item.name}>
                        {/* Main Menu Item */}
                        {item.submenu ? (
                            <button
                                onClick={() => {
                                    if (item.href && !isCollapsed) {
                                        router.get(item.href);
                                    } else if (!isCollapsed) {
                                        toggleSubmenu(item.name);
                                    }
                                }}
                                className={cn(
                                    "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                                    isActiveSubmenu(item.submenu)
                                        ? "bg-brand-red/10 text-brand-red font-bold"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon size={22} className={cn(
                                    "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                    isActiveSubmenu(item.submenu) ? "text-brand-red" : "text-muted-foreground"
                                )} />

                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="flex-1 text-left whitespace-nowrap overflow-hidden"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {!isCollapsed && (
                                    <ChevronDown
                                        size={16}
                                        className={cn(
                                            "transition-transform duration-300",
                                            openSubmenu === item.name && "rotate-180"
                                        )}
                                    />
                                )}
                            </button>
                        ) : (
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                                    url === item.href
                                        ? "bg-brand-red/10 text-brand-red font-bold"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon size={22} className={cn(
                                    "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                    url === item.href ? "text-brand-red" : "text-muted-foreground"
                                )} />

                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="whitespace-nowrap overflow-hidden"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {url === item.href && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-8 bg-brand-red rounded-r-full"
                                    />
                                )}
                            </Link>
                        )}

                        {/* Submenu Items */}
                        {item.submenu && !isCollapsed && (
                            <AnimatePresence>
                                {openSubmenu === item.name && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-4">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm",
                                                        url.startsWith(subItem.href)
                                                            ? "bg-brand-red/10 text-brand-red font-semibold"
                                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full transition-colors",
                                                        url.startsWith(subItem.href) ? "bg-brand-red" : "bg-muted-foreground/30"
                                                    )} />
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="absolute bottom-6 left-0 right-0 px-3">
                <Link
                    href="/admin/logout"
                    method="post"
                    as="button"
                    className={cn(
                        "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-muted-foreground hover:bg-brand-red/10 hover:text-brand-red transition-all duration-300 group"
                    )}
                >
                    <LogOut size={22} className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
