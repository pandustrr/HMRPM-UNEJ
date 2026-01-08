import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import AdminSidebar from "../Components/AdminSidebar";
import Toast from "../Components/Toast";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const AdminLayout = ({ children }) => {
    const { flash } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: "success" });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: "error" });
        }
    }, [flash]);

    useEffect(() => {
        // Force Light Mode for Admin
        const root = window.document.documentElement;
        const previousTheme = localStorage.getItem("theme");
        root.classList.remove("dark");

        return () => {
            // Restore theme preferences when leaving admin
            if (previousTheme === "dark") {
                root.classList.add("dark");
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-foreground flex transition-colors duration-300 font-sans overflow-x-hidden">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AdminSidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out w-full",
                isCollapsed ? "lg:pl-16" : "lg:pl-64",
                "pl-0"
            )}>
                {/* Mobile Top Header */}
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                        <span className="font-black text-brand-red tracking-tighter text-sm uppercase">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-brand-red/10 hover:text-brand-red transition-all"
                    >
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </header>

                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
