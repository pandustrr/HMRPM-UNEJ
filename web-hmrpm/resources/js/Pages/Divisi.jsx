import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    ChevronDown,
    X,
    Users,
    ArrowRight,
    Mail,
    Instagram,
    Info,
    LayoutGrid,
    Target,
    Calendar
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { cn } from "../lib/utils";

const Divisi = ({ periods, currentPeriod, activePeriodData, divisions }) => {
    const [selectedDivision, setSelectedDivision] = useState(null);
    // const [currentPeriod, setCurrentPeriod] = useState("2024/2025"); // Now from props
    const [activeFilter, setActiveFilter] = useState("Semua");

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    // Helper for Period Change
    const handlePeriodChange = (e) => {
        router.get('/divisi', { period: e.target.value }, { preserveState: true });
    };

    // Derived state for filtered members
    // Ensure divisions is an array (fallback if empty)
    const safeDivisions = divisions || [];

    const allMembers = safeDivisions.flatMap(d =>
        d.members.map(m => ({
            ...m,
            division: d.name,
            // Fallbacks handled in backend or here
            photo: m.photo || "/storage/logo/hmrpm.png"
        }))
    );

    const displayedMembers = activeFilter === "Semua"
        ? allMembers
        : allMembers.filter(m => m.division === activeFilter);

    return (
        <div className="bg-background min-h-screen selection:bg-brand-red selection:text-white pb-20">
            <Head title={`Divisi & Kepengurusan ${currentPeriod} | HMRPM`} />

            {/* Hero Section - Referring to About Style */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    {activePeriodData?.hero_type === 'video' ? (
                        <video
                            src={activePeriodData.hero_image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={activePeriodData?.hero_image || "/storage/logo/about-hero-bg.png"}
                            alt="HMRPM Background"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black"></div>
                </motion.div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-4 drop-shadow-xl uppercase">
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
                                        onChange={handlePeriodChange}
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
                <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background/50 to-transparent"></div>
            </section>

            {/* Division Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6" data-aos="fade-up">
                    <div className="max-w-2xl">
                        <span className="py-1 px-4 bg-brand-red/10 text-brand-red rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">Organizational Structure</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter mb-4">
                            Struktur <span className="text-brand-yellow">Organisasi</span>
                        </h2>
                        <p className="text-muted-foreground text-base font-medium">
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
                            className="group relative h-64 sm:h-72 bg-card rounded-3xl overflow-hidden border border-white/10 hover:border-brand-red/50 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer"
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
                                    src={div.icon_image}
                                    alt="icon"
                                    className="w-full h-full object-cover rounded-xl opacity-90"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8">
                                <h3 className="text-xl sm:text-2xl font-black tracking-tighter mb-2 text-white group-hover:text-brand-red transition-colors drop-shadow-lg">
                                    {div.name}
                                </h3>
                                <p className="text-white/80 text-sm sm:text-base font-medium leading-relaxed mb-4 max-w-xl line-clamp-2 drop-shadow-md">
                                    {div.short_desc}
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
            <section className="bg-muted/30 py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-4 block underline decoration-brand-yellow/30 underline-offset-4">Executive Committee</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-4 tracking-tighter">
                            Daftar <span className="text-brand-yellow">Pengurus</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed font-medium">
                            Pimpinan dan penggerak utama HMRPM yang berkomitmen penuh dalam mengabdi dan berinovasi.
                        </p>

                        {/* Period Filter Dropdown (Synced & Styled) */}
                        <div className="mt-8 relative inline-block">
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all group">
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider pl-2 border-r border-white/10 pr-3">Periode</span>
                                <div className="relative flex items-center">
                                    <select
                                        value={currentPeriod}
                                        onChange={handlePeriodChange}
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
                        <div className="mt-12 overflow-x-auto pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-brand-red/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand-red/60 transition-colors">
                            <div className="flex flex-nowrap justify-start md:justify-center gap-2 min-w-max">
                                <button
                                    onClick={() => setActiveFilter("Semua")}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border whitespace-nowrap",
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
                                            "px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border whitespace-nowrap",
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
                                className="group relative h-72 sm:h-96 bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-brand-red/50 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer"
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
                                    <h4 className="text-lg sm:text-xl font-black tracking-tight mb-1 text-white group-hover:text-brand-red transition-colors duration-300">
                                        {person.name}
                                    </h4>
                                    <p className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                                        {person.role}
                                    </p>
                                    <p className="text-xs font-medium text-white/50 mb-4 group-hover:text-white/70 transition-colors">
                                        {person.prodi || "TRPM"} ({person.angkatan || "23"})
                                    </p>

                                    {/* Social Icons - Instagram & Email */}
                                    <div className="flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transition-transform">
                                        {person.instagram && (
                                            <a
                                                href={person.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
                                                title="Instagram"
                                            >
                                                <Instagram size={14} className="text-white" />
                                            </a>
                                        )}
                                        {person.email && (
                                            <a
                                                href={`mailto:${person.email}`}
                                                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
                                                title="Email"
                                            >
                                                <Mail size={14} className="text-white" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Division Detail Modal - Replicated from Detail-Division.jsx */}
            <AnimatePresence>
                {selectedDivision && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDivision(null)}
                            className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-2xl bg-card rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-border/50"
                        >
                            {/* Custom Header with Image/Gradient */}
                            <div className="relative h-48 bg-muted shrink-0">
                                {selectedDivision.image && (
                                    <img src={selectedDivision.image} alt={selectedDivision.name} className="w-full h-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 dark:from-zinc-900 dark:via-zinc-900/40 to-transparent" />
                                <button
                                    onClick={() => setSelectedDivision(null)}
                                    className="absolute top-4 right-4 p-2 bg-zinc-900/10 dark:bg-white/10 hover:bg-zinc-900/20 dark:hover:bg-white/20 text-zinc-900 dark:text-white rounded-full transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-6 left-8 flex items-end gap-4">
                                    {selectedDivision.icon_image && (
                                        <div className="w-16 h-16 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-zinc-200 dark:border-white/20 shrink-0 shadow-sm">
                                            <img src={selectedDivision.icon_image} alt="icon" className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-3xl font-black text-zinc-900 dark:text-white">{selectedDivision.name}</h2>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-bold">Periode {currentPeriod}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto max-h-[60vh] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                                <div className="space-y-10">
                                    <div className="space-y-8">
                                        {/* Nama Lengkap Departemen Section */}
                                        <div className="space-y-2">
                                            <h3 className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Nama Lengkap Departemen</h3>
                                            <p className="text-foreground/80 leading-relaxed font-bold text-lg whitespace-pre-wrap">{selectedDivision.short_desc}</p>
                                        </div>

                                        {/* Deskripsi Divisi Section */}
                                        <div className="space-y-3">
                                            <h3 className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Deskripsi Divisi</h3>
                                            <div className="space-y-2">
                                                <p className="text-foreground/80 leading-relaxed font-medium whitespace-pre-wrap">{selectedDivision.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest flex items-center gap-2">
                                            <Users size={14} /> Anggota Divisi
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedDivision.members && selectedDivision.members.length > 0 ? (
                                                selectedDivision.members.map(member => (
                                                    <div key={member.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-2xl border border-border/50">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-white shrink-0">
                                                            <img
                                                                src={member.photo || '/storage/logo/hmrpm.png'}
                                                                alt={member.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-sm text-foreground line-clamp-1">{member.name}</p>
                                                            <p className="text-[10px] font-bold text-brand-red uppercase tracking-wider">{member.role}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="col-span-2 text-center py-8 text-muted-foreground text-sm italic">Belum ada anggota yang terdaftar</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-white/5 flex justify-end shrink-0">
                                <button
                                    onClick={() => setSelectedDivision(null)}
                                    className="px-6 py-2 bg-zinc-100 dark:bg-brand-red border border-zinc-200 dark:border-brand-red rounded-xl font-black transition-all duration-300 text-sm text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-brand-red/80 hover:scale-105 active:scale-95 shadow-sm"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Divisi;
