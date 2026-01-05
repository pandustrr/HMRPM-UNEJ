import { ArrowRight, Users, Calendar, Award, Sparkles, Target } from "lucide-react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const Home = ({ background }) => {
    const homeMissionPoints = [
        { title: "Inovasi Program", desc: "Mengembangkan program kerja strategis yang kolaboratif dan inklusif." },
        { title: "Growth & Skill", desc: "Pelatihan teknis dan manajerial intensif berstandar kebutuhan industri." },
        { title: "Creative Hub", desc: "Wadah pengembangan ide kreatif dan solusi inovatif perancangan mekanik." },
        { title: "Professional Network", desc: "Menghubungkan mahasiswa dengan jaringan industri dan profesional kredibel." },
        { title: "Startup Mindset", desc: "Membangun ekosistem kewirausahaan teknologi di lingkungan kampus." },
        { title: "Strong Synergy", desc: "Memperkuat solidaritas dan budaya kerja tim yang solid antar anggota." }
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-brand-red selection:text-white">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                {/* Background Image Banner */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    {background?.type === 'video' ? (
                        <video
                            src={background.value}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={background?.value || "/storage/logo/about-hero-bg.png"}
                            alt="HMRPM Banner"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black"></div>
                </motion.div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white mb-10 border border-white/20 shadow-sm backdrop-blur-md">
                            <Sparkles size={12} className="animate-pulse text-brand-yellow" />
                            <span>Official Website HMRPM UNEJ</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                            <span className="block text-white drop-shadow-xl">MEWUJUDKAN</span>
                            <span className="bg-linear-to-r from-brand-red via-brand-yellow to-brand-red bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient block mt-1">
                                SINERGI NYATA
                            </span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-12 font-medium leading-relaxed drop-shadow-lg">
                            Himpunan Mahasiswa Rekayasa Perancangan Mekanik — Membangun masa depan teknologi dengan kolaborasi kreatif, inovasi teknis, dan integritas tinggi.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link
                                href="/about"
                                className="px-10 py-5 bg-brand-red hover:bg-brand-maroon text-white rounded-2xl font-black transition-all shadow-2xl shadow-brand-red/20 hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
                            >
                                Jelajahi HMRPM <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/proker"
                                className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-2xl font-black transition-all hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-sm"
                            >
                                Lihat Program Kerja
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Bottom Mask */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background/50 to-transparent"></div>
            </section>

            {/* Content Sections Container */}
            <div className="space-y-32 pb-40 relative z-10">
                {/* Stats/Features Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                icon: Users,
                                title: "Solidaritas Tinggi",
                                desc: "Membangun ikatan kekeluargaan yang kuat dan inklusif antar seluruh mahasiswa RPM.",
                                color: "brand-yellow"
                            },
                            {
                                icon: Calendar,
                                title: "Aktif & Inovatif",
                                desc: "Menyelenggarakan program kerja strategis yang mengembangkan potensi hardskill & softskill.",
                                color: "brand-red"
                            },
                            {
                                icon: Award,
                                title: "Pusat Prestasi",
                                desc: "Mendorong pencapaian kompetisi akademik dan non-akademik di tingkat nasional maupun internasional.",
                                color: "brand-maroon"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -12 }}
                                className="p-10 rounded-[2.5rem] bg-card/50 backdrop-blur-sm border border-border/50 hover:border-brand-red/30 transition-all duration-500 shadow-sm hover:shadow-2xl group"
                            >
                                <div className={cn(
                                    "mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500",
                                    index === 0 ? "bg-brand-yellow/10" : index === 1 ? "bg-brand-red/10" : "bg-brand-maroon/10"
                                )}>
                                    <item.icon className={cn(
                                        "w-8 h-8 transition-transform duration-500 group-hover:scale-110",
                                        index === 0 ? "text-brand-yellow" : index === 1 ? "text-brand-red" : "text-brand-maroon"
                                    )} />
                                </div>
                                <h3 className="text-2xl font-black text-foreground mb-4 tracking-tighter group-hover:text-brand-red transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Visi & Misi Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-24">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-4 block">Our North Star</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tighter">
                            Visi & <span className="text-brand-yellow">Misi</span> Kami
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            Himpunan Mahasiswa Rekayasa Perancangan Mekanik Universitas Jember berkomitmen untuk terus berinovasi.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {/* Visi Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group lg:max-w-5xl lg:mx-auto"
                        >
                            <div className="absolute -inset-4 bg-linear-to-r from-brand-red/20 to-brand-yellow/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative bg-linear-to-br from-brand-red to-brand-maroon p-12 sm:p-20 rounded-[3rem] text-white shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 select-none">
                                    <Target className="w-80 h-80" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full text-xl md:text-3xl font-black uppercase tracking-[0.2em] mb-10 border border-white/20 shadow-xl">
                                        <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
                                        VISI
                                    </div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed tracking-tight max-w-4xl mx-auto opacity-100 italic">
                                        &quot;Pusat Ekselensi Rekayasa Perancangan Mekanik: Inovasi, Teknologi, dan Mahasiswa Unggul di Era Digital.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {homeMissionPoints.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative flex flex-col gap-4 p-8 bg-card hover:bg-muted/30 rounded-3xl border border-border/50 hover:border-brand-red/20 transition-all duration-300 shadow-md hover:shadow-xl text-left"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-brand-red/5 flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                        <span className="font-black text-base">{index + 1}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-foreground group-hover:text-brand-red transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-sm md:text-base leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
