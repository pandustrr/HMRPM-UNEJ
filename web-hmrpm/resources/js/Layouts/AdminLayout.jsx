import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import AdminSidebar from "../Components/AdminSidebar";
import Toast from "../Components/Toast";
import { cn } from "../lib/utils";

const AdminLayout = ({ children }) => {
    const { flash } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);
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
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300 font-sans">
            <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out",
                isCollapsed ? "pl-20" : "pl-72"
            )}>
                <main className="flex-1 p-8">
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
