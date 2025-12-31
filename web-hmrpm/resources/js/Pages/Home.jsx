import { ArrowRight, Users, Calendar, Award } from "lucide-react";
import { Link } from "@inertiajs/react";

const Home = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-background">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-red rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-yellow rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-maroon rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        <span className="block text-foreground mb-2">Mewujudkan Sinergi</span>
                        <span className="bg-linear-to-r from-brand-red via-brand-yellow to-brand-red bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                            Mahasiswa Unggulan
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground mb-10">
                        Himpunan Mahasiswa Rekayasa Perangkat Lunak - Membangun masa depan teknologi dengan kolaborasi dan inovasi.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/about"
                            className="px-8 py-3 bg-brand-red hover:bg-brand-maroon text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            Tentang Kami <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/proker"
                            className="px-8 py-3 bg-card hover:bg-card/80 text-foreground border border-border rounded-full font-semibold transition-all backdrop-blur-sm"
                        >
                            Lihat Program
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats/Features */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Users className="w-12 h-12 text-brand-yellow" />,
                            title: "Solidaritas",
                            desc: "Membangun ikatan kekeluargaan yang kuat antar mahasiswa.",
                        },
                        {
                            icon: <Calendar className="w-12 h-12 text-brand-red" />,
                            title: "Aktif & Kreatif",
                            desc: "Menyelenggarakan kegiatan yang mengembangkan potensi diri.",
                        },
                        {
                            icon: <Award className="w-12 h-12 text-blue-400" />, // Using a complementary color for variety or stick to brand? Sticking to brand for consistnecy usually better but blue is ok for variety. Let's use white or maybe red again.
                            // Let's use white for the third icon to balance.
                            title: "Berprestasi",
                            desc: "Mendorong pencapaian akademik dan non-akademik.",
                        }
                    ].map((item, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:border-brand-yellow/50 transition-colors group">
                            <div className="mb-4 p-3 bg-muted rounded-lg inline-block">{item.icon}</div>
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-yellow transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
