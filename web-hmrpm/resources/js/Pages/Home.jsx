import { ArrowRight, Users, Calendar, Award, Zap, Sparkles, Target, Layers, ClipboardList, Newspaper, GraduationCap, ArrowUpRight, FlaskConical, Send, Mail, MapPin, Phone, ChevronDown } from "lucide-react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import Toast from "../Components/Toast";

const Home = ({ background, latestBlogs = [], featuredProkers = [], divisions = [] }) => {
    const { flash } = usePage().props;
    const [showToast, setShowToast] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setShowToast(true);
            reset();
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-brand-red selection:text-white">
            <AnimatePresence>
                {showToast && (
                    <Toast
                        message={flash.success}
                        type="success"
                        onClose={() => setShowToast(false)}
                    />
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
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

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-8 border border-white/20 shadow-sm backdrop-blur-md">
                            <Sparkles size={10} className="animate-pulse text-brand-yellow" />
                            Official Website HMRPM UNEJ
                        </div>

                        <h1 className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tight mb-6 leading-tight uppercase text-white">
                            Himpunan Mahasiswa <br className="hidden sm:block" />
                            <span className="text-brand-yellow sm:text-white">Rekayasa Perancangan Mekanik</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xs sm:text-base lg:text-lg text-white/80 mb-8 sm:mb-10 font-medium leading-relaxed drop-shadow-lg">
                            Mewadahi aspirasi, kreativitas, dan inovasi mahasiswa untuk masa depan teknologi yang lebih baik.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/about"
                                className="px-8 py-3.5 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-maroon transition-all shadow-xl shadow-brand-red/20 hover:scale-105"
                            >
                                Jelajahi HMRPM
                            </Link>
                            <Link
                                href="/proker"
                                className="px-8 py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all hover:scale-105"
                            >
                                Program Kerja
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                >
                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">Gulir Kebawah</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="text-white/50 w-6 h-6" />
                    </motion.div>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background/50 to-transparent"></div>
            </section>

            {/* Main Sections Wrapper */}
            <div className="py-16 sm:py-24 lg:py-32 space-y-24 sm:space-y-32 lg:space-y-40">

                {/* 1. About/Philosophy Shortcut */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <span className="text-brand-red font-black tracking-widest uppercase text-[10px] mb-3 block">Tentang Kami</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-4 leading-tight tracking-tighter">
                                Menjadi <span className="text-brand-yellow">Pusat Inovasi</span> Teknologi Perancangan
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                                Menjadikan Himpunan Mahasiswa Rekayasa Perancangan Mekanik sebagai pusat pengembangan kreativitas dan inovasi berbasis teknologi untuk menciptakan mahasiswa yang unggul, kompetitif, dan berjiwa wirausaha di era industri 4.0.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-5 bg-card border border-border/50 rounded-2xl hover:border-brand-red/30 transition-all">
                                    <Target className="text-brand-red mb-3" size={24} />
                                    <h4 className="font-black text-xs uppercase mb-1">Visi Utama</h4>
                                    <p className="text-[10px] text-muted-foreground line-clamp-4 leading-relaxed">Menjadikan HMRPM sebagai pusat pengembangan kreativitas dan inovasi berbasis teknologi untuk menciptakan mahasiswa yang unggul, kompetitif, dan berjiwa wirausaha.</p>
                                </div>
                                <div className="p-5 bg-card border border-border/50 rounded-2xl hover:border-brand-red/30 transition-all">
                                    <Zap className="text-brand-yellow mb-3" size={24} />
                                    <h4 className="font-black text-xs uppercase mb-1">Inovasi Kreatif</h4>
                                    <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">Mengembangkan ide dan solusi inovatif dalam perancangan mekanik.</p>
                                </div>
                            </div>
                            <Link href="/about" className="group inline-flex items-center gap-2 font-black text-brand-red text-sm uppercase tracking-widest hover:gap-4 transition-all mt-8">
                                Baca Selengkapnya <ArrowRight size={16} />
                            </Link>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group lg:col-span-7 order-1 lg:order-2"
                        >
                            <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 bg-linear-to-tr from-brand-red to-brand-yellow"></div>
                            <img src="/storage/logo/about-hero-bg.png" className="relative w-full aspect-video rounded-[2.5rem] object-cover border border-border/50 shadow-2xl" alt="Tentang HMRPM" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-t from-black/60 to-transparent pointer-events-none"></div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Divisions Highlight */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div className="max-w-2xl">
                            <span className="text-brand-red font-black tracking-widest uppercase text-[10px] mb-3 block">Struktur Organisasi</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tighter">
                                Pilar Utama <span className="text-brand-yellow">HMRPM</span>
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base mt-2">
                                Mengenal divisi-divisi yang menggerakkan roda organisasi untuk mencapai visi bersama.
                            </p>
                        </div>
                        <Link href="/divisi" className="flex items-center gap-2 text-sm font-bold text-brand-red uppercase tracking-widest hover:gap-3 transition-all">
                            Lihat Semua Divisi <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {divisions.length > 0 ? divisions.map((div, i) => (
                            <motion.div
                                key={div.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-card rounded-4xl border border-border/50 shadow-sm hover:shadow-xl hover:border-brand-red/30 transition-all text-center group"
                            >
                                <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-all">
                                    <Layers size={24} />
                                </div>
                                <h3 className="font-black text-sm uppercase tracking-tighter line-clamp-2">{div.name}</h3>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center border border-dashed border-border rounded-4xl bg-muted/5">
                                <p className="text-muted-foreground font-medium italic">Masih belum ada data.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. Proker Section Highlight */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="max-w-2xl">
                            <span className="text-brand-red font-black tracking-widest uppercase text-[10px] mb-3 block">Aksi Nyata</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tighter">
                                Program <span className="text-brand-yellow">Kerja</span> Unggulan
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base mt-2">
                                Inisiatif dan kegiatan yang kami lakukan untuk memberikan dampak positif.
                            </p>
                        </div>
                        <Link href="/proker" className="flex items-center gap-2 text-sm font-bold text-brand-red uppercase tracking-widest hover:gap-3 transition-all">
                            Semua Proker <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProkers.length > 0 ? featuredProkers.map((proker, i) => (
                            <motion.div
                                key={proker.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-card rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={proker.image || "/storage/logo/hmrpm.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={proker.name} />
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {proker.status || 'Active'}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-black mb-3 tracking-tighter group-hover:text-brand-red transition-colors">{proker.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{proker.description}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                                            <Calendar size={12} /> {proker.event_date ? new Date(proker.event_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : '-'}
                                        </div>
                                        <ArrowUpRight className="text-muted-foreground group-hover:text-brand-red transition-colors" size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center border border-dashed border-border rounded-[2.5rem] bg-muted/5">
                                <p className="text-muted-foreground font-medium italic">Masih belum ada data.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. Akademisi Section Highlight */}
                <section className="bg-dark-slate py-16 sm:py-24 lg:py-32 rounded-[4rem] mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden border border-white/5 shadow-2xl bg-slate-900 dark:bg-black/40">
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <FlaskConical size={300} className="text-brand-yellow" />
                    </div>
                    <div className="max-w-7xl mx-auto px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="text-white space-y-6">
                                <span className="text-brand-yellow font-black tracking-widest uppercase text-[10px]">Pendidikan & Fasilitas</span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter leading-tight">
                                    Akademisi <span className="text-brand-yellow block">Prodi & Lab</span>
                                </h2>
                                <p className="text-white/70 text-base leading-relaxed max-w-lg">
                                    Didukung oleh tenaga pendidik profesional dan facilities laboratorium modern untuk munjang kegiatan belajar-mengajar yang optimal.
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Users className="text-brand-yellow" size={24} />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-brand-yellow">Dosen</p>
                                            <p className="text-sm font-bold">Tenaga Pendidik</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                                        <FlaskConical className="text-brand-red" size={24} />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-brand-red">Laboratorium</p>
                                            <p className="text-sm font-bold">Fasilitas Riset</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <Link href="/akademisi" className="px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[11px] sm:text-xs hover:bg-brand-yellow transition-all inline-block hover:scale-105">
                                        Lihat Akademisi Prodi
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 group hover:bg-brand-red/10 transition-all">
                                    <GraduationCap size={48} className="text-white group-hover:scale-110 transition-all group-hover:text-brand-red" />
                                </div>
                                <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 mt-12 group hover:bg-brand-yellow/10 transition-all">
                                    <Award size={48} className="text-white group-hover:scale-110 transition-all group-hover:text-brand-yellow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-16">
                        <div>
                            <span className="text-brand-red font-black tracking-widest uppercase text-[10px] mb-3 block">Media & Informasi</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tighter">
                                Berita <span className="text-brand-yellow">&</span> Artikel
                            </h2>
                        </div>
                        <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-red uppercase tracking-widest hover:gap-3 transition-all">
                            Lihat Semua <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBlogs.length > 0 ? latestBlogs.map((blog, i) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-card rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                            >
                                <div className="aspect-16/10 relative overflow-hidden">
                                    <img src={blog.image || "/storage/logo/hmrpm.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                                    <div className="absolute bottom-4 left-4">
                                        <div className="px-3 py-1 bg-brand-red text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                                            {blog.blog_type?.name || 'Berita'}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col grow">
                                    <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-brand-red transition-colors line-clamp-2">{blog.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-8 grow" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }}></p>
                                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                        <div className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2">
                                            <Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                        <Link href={`/blog/${blog.slug}`} className="p-2 bg-muted rounded-full group-hover:bg-brand-red group-hover:text-white transition-all">
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center border border-dashed border-border rounded-4xl bg-muted/5">
                                <p className="text-muted-foreground font-medium italic">Masih belum ada data.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 6. Contact Section */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-2xl relative">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none -rotate-12 translate-x-1/2 -translate-y-1/2">
                            <Send size={200} className="text-brand-red" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch relative z-10">
                            {/* Form Column */}
                            <div className="p-6 sm:p-10 lg:p-12 order-2 lg:order-1">
                                <div className="mb-8">
                                    <span className="text-brand-red font-black tracking-widest uppercase text-[10px] mb-3 block">Hubungi Kami</span>
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tighter">
                                        Kirimkan <span className="text-brand-yellow">Pesan</span> Anda
                                    </h2>
                                    <p className="text-muted-foreground text-[11px] sm:text-xs mt-2 font-medium">
                                        Ada saran, pertanyaan, atau ingin berkolaborasi? Kami siap mendengarkan.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="Contoh: John Doe"
                                                className={cn(
                                                    "w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all font-medium text-xs",
                                                    errors.name && "border-brand-red/50 ring-2 ring-brand-red/10"
                                                )}
                                            />
                                            {errors.name && <p className="text-[10px] font-bold text-brand-red ml-2">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Aktif</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="email@contoh.com"
                                                className={cn(
                                                    "w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all font-medium text-xs",
                                                    errors.email && "border-brand-red/50 ring-2 ring-brand-red/10"
                                                )}
                                            />
                                            {errors.email && <p className="text-[10px] font-bold text-brand-red ml-2">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subjek Pesan</label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={e => setData('subject', e.target.value)}
                                            placeholder="Ingin bertanya tentang..."
                                            className={cn(
                                                "w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all font-medium text-xs",
                                                errors.subject && "border-brand-red/50 ring-2 ring-brand-red/10"
                                            )}
                                        />
                                        {errors.subject && <p className="text-[10px] font-bold text-brand-red ml-2">{errors.subject}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Isi Pesan</label>
                                        <textarea
                                            rows="3"
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            placeholder="Tuliskan detail pesan Anda di sini..."
                                            className={cn(
                                                "w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all font-medium text-xs resize-none",
                                                errors.message && "border-brand-red/50 ring-2 ring-brand-red/10"
                                            )}
                                        ></textarea>
                                        {errors.message && <p className="text-[10px] font-bold text-brand-red ml-2">{errors.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3.5 bg-foreground text-background dark:bg-white dark:text-black hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all focus:ring-4 focus:ring-brand-red/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Sedang Mengirim...' : 'Kirim Pesan'} <Send size={14} className={processing ? 'animate-pulse' : ''} />
                                    </button>
                                </form>
                            </div>

                            {/* Info Column */}
                            <div className="bg-brand-red p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-center order-1 lg:order-2">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                                            <Mail size={18} className="text-brand-yellow" />
                                        </div>
                                        <div>
                                            <h4 className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Email Resmi</h4>
                                            <p className="text-sm font-bold">hmrpm.teknik@unej.ac.id</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                                            <MapPin size={18} className="text-brand-yellow" />
                                        </div>
                                        <div>
                                            <h4 className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Sekretariat</h4>
                                            <p className="text-sm font-bold italic leading-tight">Jubung Lor, Jubung, Sukorambi, Jember</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                                            <Phone size={18} className="text-brand-yellow" />
                                        </div>
                                        <div>
                                            <h4 className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Call Center</h4>
                                            <p className="text-sm font-bold">085194184911</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2.5">
                                        <div className="shrink-0 flex items-center gap-2 group cursor-pointer bg-white p-1 rounded-lg">
                                            <img src="/logo.png" alt="Logo" className="h-4 w-auto" />
                                        </div>
                                        <div className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight">
                                            HMRPM <span className="text-brand-yellow block">UNEJ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
