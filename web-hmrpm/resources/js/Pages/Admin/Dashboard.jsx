import AdminLayout from "../../Layouts/AdminLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    FileText,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    GraduationCap,
    Info,
    BookOpen,
    Home
} from "lucide-react";

const Dashboard = () => {
    const { auth } = usePage().props;

    const stats = [
        {
            label: "Total Blog",
            value: "12",
            增长: "+2",
            positive: true,
            icon: FileText,
            color: "bg-blue-500"
        },
        {
            label: "Total Proker",
            value: "8",
            增长: "+1",
            positive: true,
            icon: Calendar,
            color: "bg-emerald-500"
        },
        {
            label: "Total Pengurus",
            value: "45",
            增长: "0",
            positive: true,
            icon: Users,
            color: "bg-amber-500"
        },
        {
            label: "Data Akademisi",
            value: "15",
            增长: "+3",
            positive: true,
            icon: GraduationCap,
            color: "bg-brand-red"
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Head title="Admin Dashboard | HMRPM" />
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Welcome */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter text-foreground">
                        Selamat Datang, <span className="text-brand-red">{auth?.user?.name || 'Administrator'}!</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">Ini adalah ringkasan performa sistem HMRPM hari ini.</p>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="bg-white border border-slate-200 p-6 rounded-4xl hover:shadow-2xl hover:shadow-brand-red/10 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-4 rounded-2xl text-white shadow-xl", stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full",
                                    stat.positive ? "text-emerald-500 bg-emerald-500/10" : "text-brand-red bg-brand-red/10"
                                )}>
                                    {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.增长}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                                <p className="text-3xl font-black text-foreground">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black tracking-tighter">Aktivitas Terbaru</h2>
                            <button className="text-xs font-bold text-brand-red hover:underline tracking-widest uppercase">Lihat Semua</button>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-6xl p-8 space-y-6 shadow-sm">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 items-center group">
                                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-foreground">Artikel Baru Diterbitkan</p>
                                        <p className="text-xs text-muted-foreground font-medium">"Optimalisasi Desain Mekanik di Era 4.0"</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground font-medium">2 Jam Lalu</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black tracking-tighter">Aksi Cepat</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { name: "Pengaturan Beranda", icon: Home, color: "hover:bg-indigo-500", href: "/admin/beranda" },
                                { name: "Edit About Us", icon: Info, color: "hover:bg-slate-700", href: "/admin/about" },
                                { name: "Tulis Blog Baru", icon: FileText, color: "hover:bg-blue-500", href: "/admin/blog/create" },
                                { name: "Update Proker", icon: Calendar, color: "hover:bg-emerald-500", href: "/admin/proker" },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className={cn(
                                        "flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 text-slate-900 transition-all group",
                                        action.color,
                                        "hover:text-white hover:shadow-xl hover:-translate-y-1"
                                    )}
                                >
                                    <div className="p-3 rounded-xl bg-muted group-hover:bg-white/20 transition-all">
                                        <action.icon size={20} />
                                    </div>
                                    <span className="font-bold tracking-tight">{action.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper for cn (since it's defined in utils but I used it here)
function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
}

Dashboard.layout = (page) => <AdminLayout children={page} />;

export default Dashboard;
