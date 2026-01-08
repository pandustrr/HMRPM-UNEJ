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

const Dashboard = ({ stats, recentActivities }) => {
    const { auth } = usePage().props;

    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Baru saja';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
        if (diffInSeconds < 172800) return 'Kemarin';
        return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
    };

    const cards = [
        {
            label: "Total Divisi",
            value: stats?.totalDivisions || 0,
            icon: Users,
            color: "bg-indigo-500",
            href: "/admin/divisions"
        },
        {
            label: "Total Pengurus",
            value: stats?.totalMembers || 0,
            icon: Users,
            color: "bg-amber-500",
            href: "/admin/members"
        },
        {
            label: "Total Blog",
            value: stats?.totalBlogs || 0,
            icon: FileText,
            color: "bg-blue-500",
            href: "/admin/blog"
        },
        {
            label: "Total Proker",
            value: stats?.totalProkers || 0,
            icon: Calendar,
            color: "bg-emerald-500",
            href: "/admin/program-kerja"
        },
        {
            label: "Data Akademisi",
            value: stats?.totalAcademics || 0,
            icon: GraduationCap,
            color: "bg-brand-red",
            href: "/admin/academics"
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
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                >
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                        >
                            <Link
                                href={card.href}
                                className="block h-full bg-white border border-slate-200 p-4 rounded-3xl hover:shadow-xl hover:shadow-brand-red/10 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className={cn("p-2.5 rounded-xl text-white shadow-lg", card.color)}>
                                        <card.icon size={18} />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-brand-red transition-colors">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">{card.label}</h3>
                                    <p className="text-xl font-black text-slate-900 tracking-tight">{card.value}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-black tracking-tighter">Aktivitas Terbaru</h2>
                            <Link href="/admin/blog" className="text-xs font-bold text-brand-red hover:underline tracking-widest uppercase">Lihat Semua</Link>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-4xl p-6 space-y-4 shadow-sm min-h-[300px] flex flex-col justify-start">
                            {recentActivities && recentActivities.length > 0 ? (
                                recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex gap-4 items-center group">
                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all">
                                            <FileText size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-brand-red transition-colors">Artikel Baru Diterbitkan</p>
                                            <p className="text-xs text-muted-foreground font-medium line-clamp-1 italic">"{activity.title}"</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">{formatRelativeTime(activity.created_at)}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 grayscale opacity-50">
                                    <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 animate-pulse">
                                        <FileText size={32} />
                                    </div>
                                    <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">Belum Ada Aktivitas</p>
                                    <p className="text-xs text-slate-500 font-medium max-w-[200px]">Data blog yang Anda unggah akan muncul di sini sebagai riwayat aktivitas.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-black tracking-tighter">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                            {[
                                { name: "Pengaturan Beranda", icon: Home, color: "hover:bg-indigo-500", href: "/admin/home" },
                                { name: "Edit About Us", icon: Info, color: "hover:bg-slate-700", href: "/admin/about" },
                                { name: "Tulis Blog Baru", icon: FileText, color: "hover:bg-blue-500", href: "/admin/blog/create" },
                                { name: "Update Proker", icon: Calendar, color: "hover:bg-emerald-500", href: "/admin/proker" },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-slate-900 transition-all group",
                                        action.color,
                                        "hover:text-white hover:shadow-lg hover:-translate-y-0.5"
                                    )}
                                >
                                    <div className="p-2 rounded-lg bg-muted group-hover:bg-white/20 transition-all">
                                        <action.icon size={16} />
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{action.name}</span>
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
