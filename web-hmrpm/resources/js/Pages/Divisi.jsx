import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    ChevronDown,
    X,
    Users,
    ArrowRight,
    Mail,
    Linkedin,
    Instagram,
    Info,
    LayoutGrid,
    Target,
    Calendar
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { cn } from "../lib/utils";

const Divisi = () => {
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [currentPeriod, setCurrentPeriod] = useState("2024/2025");
    const [activeFilter, setActiveFilter] = useState("Semua");

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    const periods = ["2024/2025", "2023/2024", "2022/2023"];

    const divisions = [
        {
            id: 1,
            name: "Pengurus Harian",
            shortDesc: "Jantung organisasi yang mengelola administrasi, keuangan, dan koordinasi internal.",
            description: "Pengurus Harian (PH) bertanggung jawab atas stabilitas dan jalannya roda organisasi secara keseluruhan. PH bertugas memastikan visi dan misi HMRPM tercapai melalui koordinasi yang efektif antar divisi.",
            members: [
                { name: "Ketua Umum", role: "Leader", prodi: "TRPM", angkatan: "22" },
                { name: "Wakil Ketua", role: "Co-Leader", prodi: "TRPM", angkatan: "22" },
                { name: "Sekretaris I & II", role: "Administration", prodi: "TRPM", angkatan: "23" },
                { name: "Bendahara I & II", role: "Financial Control", prodi: "TRPM", angkatan: "23" },
            ],
            iconImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
            color: "from-brand-red to-brand-maroon",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 2,
            name: "Divisi PSDM",
            shortDesc: "Pengembangan Sumber Daya Mahasiswa untuk mencetak kader unggul.",
            description: "Divisi PSDM berfokus pada pengembangan kualitas internal anggota HMRPM melalui berbagai pelatihan, kaderisasi, dan kegiatan yang membangun karakter serta kompetensi teknis.",
            members: [
                { name: "Koordinator Divisi", role: "Coordinator", prodi: "TRPM", angkatan: "22" },
                { name: "Staf Pengembangan", role: "Skill Development", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Kaderisasi", role: "Growth & Culture", prodi: "TRPM", angkatan: "23" },
            ],
            iconImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400",
            color: "from-brand-maroon to-black",
            image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 3,
            name: "Divisi Kominfo",
            shortDesc: "Pusat komunikasi dan informasi digital HMRPM.",
            description: "Divisi Komunikasi dan Informasi bertanggung jawab dalam mengelola citra organisasi, media sosial, website, serta publikasi informasi penting kepada seluruh anggota dan publik.",
            members: [
                { name: "Koordinator Divisi", role: "Coordinator", prodi: "TRPM", angkatan: "22" },
                { name: "Staf Media", role: "Media Production", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Publikasi", role: "Public Relations", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Website", role: "Digital Infrastructure", prodi: "TRPM", angkatan: "22" },
            ],
            iconImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            color: "from-brand-red to-orange-900",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 4,
            name: "Divisi Hubungan Luar",
            shortDesc: "Menjalin sinergi dan kolaborasi dengan pihak eksternal.",
            description: "Divisi Hubungan Luar berperan sebagai jembatan antara HMRPM dengan organisasi mahasiswa lain, alumni, dunia industri, serta instansi terkait untuk menciptakan kolaborasi yang bermanfaat.",
            members: [
                { name: "Koordinator Divisi", role: "Coordinator", prodi: "TRPM", angkatan: "22" },
                { name: "Staf Humas", role: "Public Relations", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Kerjasama", role: "Partnership", prodi: "TRPM", angkatan: "23" },
            ],
            iconImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400",
            color: "from-black via-brand-maroon to-brand-red",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 5,
            name: "Divisi Kewirausahaan",
            shortDesc: "Membangun kemandirian finansial dan jiwa usaha mahasiswa.",
            description: "Divisi Kewirausahaan fokus pada pengembangan unit bisnis organisasi dan pelatihan soft skill entrepreneurship bagi anggota untuk meningkatkan kemandirian dana.",
            members: [
                { name: "Koordinator Divisi", role: "Coordinator", prodi: "TRPM", angkatan: "22" },
                { name: "Staf Produksi", role: "Product Development", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Pemasaran", role: "Marketing", prodi: "TRPM", angkatan: "23" },
            ],
            iconImage: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400",
            color: "from-amber-600 to-brand-maroon",
            image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 6,
            name: "Divisi Minat Bakat",
            shortDesc: "Wadah kreativitas, seni, dan olahraga mahasiswa RPM.",
            description: "Divisi ini bertujuan menggali dan menyalurkan potensi non-akademik mahasiswa RPM di bidang olahraga, seni, dan kreativitas lainnya untuk meningkatkan prestasi non-akademik.",
            members: [
                { name: "Koordinator Divisi", role: "Coordinator", prodi: "TRPM", angkatan: "22" },
                { name: "Staf Olahraga", role: "Sports", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Seni & Kreatif", role: "Arts & Culture", prodi: "TRPM", angkatan: "23" },
            ],
            iconImage: "https://images.unsplash.com/photo-1511267671478-45c7e002ea48?auto=format&fit=crop&q=80&w=400",
            color: "from-brand-red to-rose-900",
            image: "https://images.unsplash.com/photo-1511267671478-45c7e002ea48?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 7,
            name: "Divisi Keilmuan",
            shortDesc: "Meningkatkan wawasan dan prestasi akademik mahasiswa.",
            description: "Divisi Keilmuan bertanggung jawab dalam menyelenggarakan kegiatan yang menunjang prestasi akademik mahasiswa, seperti lomba karya tulis, riset, dan workshop teknik.",
            members: [
                { name: "Koordinator Divisi", role: "Coordinator", prodi: "TRPM", angkatan: "22" },
                { name: "Staf Riset", role: "Research", prodi: "TRPM", angkatan: "23" },
                { name: "Staf Kompetisi", role: "Academic Awards", prodi: "TRPM", angkatan: "23" },
            ],
            iconImage: "https://images.unsplash.com/photo-1454165833767-0275080064f7?auto=format&fit=crop&q=80&w=400",
            color: "from-brand-maroon to-zinc-900",
            image: "https://images.unsplash.com/photo-1454165833767-0275080064f7?auto=format&fit=crop&q=80&w=800",
        },
    ];

    const officials = [
        {
            name: "Antigravity",
            role: "Ketua Umum HMRPM 2024",
            photo: "/storage/logo/hmrpm.png",
            video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4", // Placeholder video
            prodi: "TRPM",
            angkatan: "22"
        },
        {
            name: "Fulan bin Fulan",
            role: "Wakil Ketua Umum",
            photo: "/storage/logo/hmrpm.png",
            video: null, // No video fallback
            prodi: "TRPM",
            angkatan: "22"
        },
        { name: "Fulanah binti Fulan", role: "Sekretaris Umum", photo: "/storage/logo/hmrpm.png" },
        { name: "Fulanah binti Fulan", role: "Bendahara Umum", photo: "/storage/logo/hmrpm.png" },
    ];

    // Derived state for filtered members
    const allMembers = divisions.flatMap(d =>
        d.members.map(m => ({
            ...m,
            division: d.name,
            photo: "/storage/logo/hmrpm.png"
        }))
    );

    const displayedMembers = activeFilter === "Semua"
        ? allMembers
        : allMembers.filter(m => m.division === activeFilter);

    return (
        <div className="bg-background min-h-screen selection:bg-brand-red selection:text-white pb-20">
            {/* Hero Section - Referring to About Style */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/storage/logo/about-hero-bg.png"
                        alt="HMRPM Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black"></div>
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6 drop-shadow-xl uppercase">
                            Divisi <span className="text-brand-yellow">&</span> Kepengurusan
                        </h1>
                        <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md mb-8">
                            Mengenal lebih dekat struktur organisasi dan tim hebat di balik setiap pergerakan HMRPM.
                        </p>

                        {/* Period Filter Dropdown - Ultra Transparent & Modern */}
                        <div className="relative inline-block">
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all group">
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider pl-2 border-r border-white/10 pr-3">Periode</span>
                                <div className="relative flex items-center">
                                    <select
                                        value={currentPeriod}
                                        onChange={(e) => setCurrentPeriod(e.target.value)}
                                        className="appearance-none bg-transparent text-white/90 font-bold text-sm tracking-wide outline-none cursor-pointer pr-8 pl-1 transition-colors"
                                    >
                                        {periods.map(p => (
                                            <option key={p} value={p} className="bg-zinc-900 text-white">{p}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-1 pointer-events-none text-brand-yellow/40 group-hover:text-brand-yellow/80 transition-colors">
                                        <ChevronDown size={14} />
                                    </div>
                                </div>
                            </div>
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

                {/* Decorative bottom gradient */}
                <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-background to-transparent"></div>
            </section>

            {/* Division Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6" data-aos="fade-up">
                    <div className="max-w-2xl">
                        <span className="py-1 px-4 bg-brand-red/10 text-brand-red rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">Organizational Structure</span>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
                            Struktur <span className="text-brand-yellow">Organisasi</span>
                        </h2>
                        <p className="text-muted-foreground text-lg font-medium">
                            Setiap divisi memiliki peran strategis dalam mewujudkan visi HMRPM untuk memajukan Prodi D4 RPM.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {divisions.map((div, idx) => (
                        <motion.div
                            key={div.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedDivision(div)}
                            className="group relative h-72 sm:h-80 bg-card rounded-[2rem] overflow-hidden border border-white/10 hover:border-brand-red/50 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer"
                        >
                            {/* Full Background Image */}
                            <img
                                src={div.image}
                                alt={div.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Floating Glass Icon */}
                            <div className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg z-20 group-hover:scale-110 transition-transform">
                                <img
                                    src={div.iconImage}
                                    alt="icon"
                                    className="w-full h-full object-cover rounded-xl opacity-90"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8">
                                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-2 text-white group-hover:text-brand-red transition-colors drop-shadow-lg">
                                    {div.name}
                                </h3>
                                <p className="text-white/80 text-sm sm:text-base font-medium leading-relaxed mb-4 max-w-xl line-clamp-2 drop-shadow-md">
                                    {div.shortDesc}
                                </p>

                                <div className="flex items-center gap-2 text-brand-red font-black text-[10px] sm:text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                    Selengkapnya
                                    <ArrowRight size={14} />
                                </div>
                            </div>

                            {/* Hover Gradient Accent */}
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500 bg-linear-to-br mix-blend-overlay",
                                div.color
                            )}></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pengurus Section */}
            <section className="bg-muted/30 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-4 block underline decoration-brand-yellow/30 underline-offset-4">Executive Committee</span>
                        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 tracking-tighter">
                            Daftar <span className="text-brand-yellow">Pengurus</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            Pimpinan dan penggerak utama HMRPM yang berkomitmen penuh dalam mengabdi dan berinovasi.
                        </p>

                        {/* Period Filter Dropdown (Synced & Styled) */}
                        <div className="mt-8 relative inline-block">
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all group">
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider pl-2 border-r border-white/10 pr-3">Periode</span>
                                <div className="relative flex items-center">
                                    <select
                                        value={currentPeriod}
                                        onChange={(e) => setCurrentPeriod(e.target.value)}
                                        className="appearance-none bg-transparent text-white font-bold text-sm tracking-wide outline-none cursor-pointer pr-8 pl-1 transition-colors"
                                    >
                                        {periods.map(p => (
                                            <option key={p} value={p} className="bg-zinc-900 text-white">{p}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-1 pointer-events-none text-brand-yellow/60 group-hover:text-brand-yellow transition-colors">
                                        <ChevronDown size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Division Filters */}
                        <div className="mt-12 overflow-x-auto pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand-red/50 transition-colors">
                            <div className="flex flex-wrap justify-center gap-3 min-w-max">
                                <button
                                    onClick={() => setActiveFilter("Semua")}
                                    className={cn(
                                        "px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all border",
                                        activeFilter === "Semua"
                                            ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20"
                                            : "bg-white/5 text-muted-foreground border-border/50 hover:bg-white/10 hover:border-brand-red/10"
                                    )}
                                >
                                    Semua
                                </button>
                                {divisions.map((div) => (
                                    <button
                                        key={div.id}
                                        onClick={() => setActiveFilter(div.name)}
                                        className={cn(
                                            "px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all border whitespace-nowrap",
                                            activeFilter === div.name
                                                ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20"
                                                : "bg-white/5 text-muted-foreground border-border/50 hover:bg-white/10 hover:border-brand-red/10"
                                        )}
                                    >
                                        {div.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                        {displayedMembers.map((person, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-[22rem] sm:h-[28rem] bg-card rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-border/50 hover:border-brand-red/50 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer"
                                onMouseEnter={(e) => {
                                    const vid = e.currentTarget.querySelector('video');
                                    if (vid) vid.play();
                                }}
                                onMouseLeave={(e) => {
                                    const vid = e.currentTarget.querySelector('video');
                                    if (vid) {
                                        vid.pause();
                                        vid.currentTime = 0;
                                    }
                                }}
                            >
                                {/* Background Image (Default) */}
                                <img
                                    src={person.photo}
                                    alt={person.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                />

                                {/* Background Video (Hover) */}
                                {person.video && (
                                    <video
                                        src={person.video}
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center text-center z-10">
                                    <h4 className="text-xl sm:text-2xl font-black tracking-tight mb-1 text-white group-hover:text-brand-red transition-colors duration-300">
                                        {person.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-1">
                                        {person.role}
                                    </p>
                                    <p className="text-xs font-medium text-white/50 mb-4 group-hover:text-white/70 transition-colors">
                                        {person.prodi || "TRPM"} ({person.angkatan || "23"})
                                    </p>

                                    {/* Social Icons - Always visible or fade in? User didn't specify, but keeping them accessible is good. Let's make them fade in slightly or be subtle. */}
                                    <div className="flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                                            <Instagram size={14} className="text-white" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                                            <Linkedin size={14} className="text-white" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                                            <Mail size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Division Detail Modal */}
            <AnimatePresence>
                {selectedDivision && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDivision(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-card rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedDivision(null)}
                                className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-brand-red text-white flex items-center justify-center transition-all hover:rotate-90 active:scale-95 shadow-xl"
                            >
                                <X size={24} />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                                {/* Left Side - Info */}
                                <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-10 overflow-hidden bg-muted shadow-lg",
                                        "border border-white/10"
                                    )}>
                                        <img
                                            src={selectedDivision.iconImage}
                                            alt={selectedDivision.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 leading-none">
                                        {selectedDivision.name}
                                    </h2>

                                    <div className="space-y-10">
                                        <section>
                                            <div className="flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-widest mb-4">
                                                <Info size={14} /> Description
                                            </div>
                                            <p className="text-foreground/80 leading-relaxed text-lg font-medium">
                                                {selectedDivision.description}
                                            </p>
                                        </section>

                                        <section>
                                            <div className="flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-widest mb-6">
                                                <Users size={14} /> Anggota & Role
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                {selectedDivision.members.map((member, mIdx) => (
                                                    <div key={mIdx} className="flex flex-col p-4 rounded-2xl bg-muted/50 border border-border/50">
                                                        <span className="font-black text-sm text-foreground">{member.name}</span>
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{member.role}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                {/* Right Side - Image/Decoration */}
                                <div className="lg:col-span-2 relative hidden lg:block overflow-hidden">
                                    <img
                                        src={selectedDivision.image}
                                        alt={selectedDivision.name}
                                        className="w-full h-full object-cover scale-110"
                                    />
                                    <div className={cn(
                                        "absolute inset-0 bg-linear-to-br opacity-60",
                                        selectedDivision.color
                                    )}></div>
                                    <div className="absolute inset-0 flex items-center justify-center p-12">
                                        <div className="text-white text-center">
                                            <div className="w-32 h-32 rounded-3xl overflow-hidden mx-auto mb-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                                                <img
                                                    src={selectedDivision.iconImage}
                                                    alt={selectedDivision.name}
                                                    className="w-full h-full object-cover opacity-80"
                                                />
                                            </div>
                                            <h3 className="text-4xl font-black tracking-tighter drop-shadow-lg">
                                                {selectedDivision.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Divisi;

