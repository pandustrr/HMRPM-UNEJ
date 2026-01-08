import ThemeToggle from "./ThemeToggle";
import { User, Bell, Search } from "lucide-react";
import { usePage } from "@inertiajs/react";

const AdminTopbar = () => {
    const { auth } = usePage().props;

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-brand-black/50 backdrop-blur-xl border-b border-border transition-colors duration-300 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red/50 transition-all text-sm w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <ThemeToggle />

                <button className="relative text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border-2 border-background"></span>
                </button>

                <div className="h-8 w-px bg-border/50 mx-2"></div>

                <div className="flex items-center gap-3 group cursor-pointer p-1 pr-3 rounded-2xl hover:bg-muted transition-all">
                    <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white font-bold shadow-lg shadow-brand-red/20 overflow-hidden">
                        <User size={20} />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-foreground leading-tight">{auth?.user?.name || 'Admin'}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
