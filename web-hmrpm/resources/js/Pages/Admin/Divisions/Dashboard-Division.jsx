import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Calendar, Users, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard({ periodsCount, divisionsCount, membersCount }) {
    const cards = [
        {
            title: "Kelola Periode",
            description: "Atur periode kepengurusan dan background hero halaman divisi",
            icon: Calendar,
            href: "/admin/periods",
            color: "from-blue-500 to-blue-600",
            stats: `${periodsCount || 0} Periode`,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            title: "Kelola Divisi & Pengurus",
            description: "Tambah, edit, dan kelola divisi beserta anggota pengurus",
            icon: Users,
            href: "/admin/divisions",
            color: "from-brand-red to-brand-maroon",
            stats: `${divisionsCount || 0} Divisi • ${membersCount || 0} Anggota`,
            iconBg: "bg-red-100",
            iconColor: "text-brand-red"
        }
    ];

    return (
        <>
            <Head title="Divisi & Pengurus" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-foreground">Divisi & Pengurus</h1>
                    <p className="text-muted-foreground">Kelola periode kepengurusan, divisi, dan anggota organisasi</p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={card.href}
                                className="group block bg-white rounded-2xl border border-border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Icon & Title */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${card.iconBg}`}>
                                        <card.icon size={28} className={card.iconColor} />
                                    </div>
                                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-brand-red/10 transition-colors">
                                        <ArrowRight size={20} className="text-muted-foreground group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <TrendingUp size={16} />
                                    <span>{card.stats}</span>
                                </div>

                                {/* Gradient Bar */}
                                <div className={`h-1 w-full bg-linear-to-r ${card.color} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-8">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-blue-900 mb-1">Informasi</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                Kelola periode terlebih dahulu sebelum menambahkan divisi. Setiap divisi terikat dengan satu periode kepengurusan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <AdminLayout children={page} />;
