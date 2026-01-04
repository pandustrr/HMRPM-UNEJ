import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "@inertiajs/react";
import { ChevronRight, Calendar, CheckCircle2, Clock, CircleDashed, X, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

const Proker = ({ background, divisions = [] }) => {
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic',
            offset: 100,
        });
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeFilter, setActiveFilter] = useState("Semua");

    const filteredDivisions = activeFilter === "Semua"
        ? divisions
        : divisions.filter(d => d.name === activeFilter);

    const getStatus = (date) => {
        if (!date) return "Perencanaan";
        const eventDate = new Date(date);
        const today = new Date();
        return eventDate < today ? "Selesai" : "Progress";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Selesai': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Progress': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'Perencanaan': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            default: return 'text-muted-foreground bg-muted border-border';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Selesai': return <CheckCircle2 className="w-3 h-3" />;
            case 'Progress': return <Clock className="w-3 h-3" />;
            default: return <CircleDashed className="w-3 h-3" />;
        }
    };

    return (
        <div className="bg-background min-h-screen selection:bg-brand-red selection:text-white">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-60 origin-left"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    {background?.type === 'video' ? (
                        <video src={background.value} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    ) : (
                        <img
                            src={background?.value || "/storage/logo/about-hero-bg.png"}
                            alt="Proker Background"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-background"></div>
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 drop-shadow-xl uppercase">
                            Program <span className="text-brand-yellow">Kerja</span>
                        </h1>
                        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md mb-8">
                            Rencana strategis dan kegiatan nyata Himpunan Mahasiswa Rekayasa Perancangan Mekanik untuk mewujudkan visi dan misi organisasi.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-20 z-40 py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                        <button
                            onClick={() => setActiveFilter("Semua")}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border",
                                activeFilter === "Semua"
                                    ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20"
                                    : "bg-card text-muted-foreground border-border hover:border-brand-red/50 hover:text-foreground"
                            )}
                        >
                            Semua Divisi
                        </button>
                        {divisions.map((div) => (
                            <button
                                key={div.id}
                                onClick={() => setActiveFilter(div.name)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border",
                                    activeFilter === div.name
                                        ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20"
                                        : "bg-card text-muted-foreground border-border hover:border-brand-red/50 hover:text-foreground"
                                )}
                            >
                                {div.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                {filteredDivisions.map((division, idx) => (
                    <motion.div
                        key={division.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Division Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                            <div>
                                <span className="text-brand-yellow font-black tracking-widest uppercase text-[9px] mb-1 block">Divisi</span>
                                <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tighter uppercase">
                                    {division.name}
                                </h2>
                                <p className="text-brand-red font-bold text-sm mt-1">{division.short_desc}</p>
                            </div>
                            <Link
                                href={`/proker/${division.id}`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-brand-yellow transition-colors group shrink-0"
                            >
                                Lihat Selengkapnya
                                <span className="bg-brand-red/10 p-1 rounded-full group-hover:bg-brand-yellow/10 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>

                        {/* Proker Cards Grid (Max 4) */}
                        <div className="flex flex-wrap gap-6 justify-center">
                            {division.program_kerjas?.slice(0, 4).map((program, pIdx) => {
                                const status = program.status || 'Progress';
                                return (
                                    <div
                                        key={program.id}
                                        onClick={() => setSelectedProgram(program)}
                                        className="group relative bg-card rounded-2xl border border-border/50 hover:border-brand-red/30 overflow-hidden hover:shadow-xl hover:shadow-brand-red/5 transition-all duration-500 flex flex-col h-full cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-sm"
                                    >
                                        <div className="relative h-40 overflow-hidden bg-muted shrink-0">
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                            <img
                                                src={program.documentation?.[0]}
                                                alt={program.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${program.title}&background=1a1a1a&color=fff&size=512`;
                                                }}
                                            />
                                            <div className="absolute top-3 right-3 z-20">
                                                <div className={cn("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border backdrop-blur-md", getStatusColor(status))}>
                                                    {getStatusIcon(status)}
                                                    {status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 flex flex-col grow">
                                            <div className="flex items-center gap-2 text-muted-foreground text-[9px] uppercase font-bold tracking-wider mb-2">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(program.event_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                            </div>
                                            <h3 className="text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
                                                {program.title}
                                            </h3>
                                            <div className="mt-auto pt-3 border-t border-border/50 flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Detail Program <ArrowUpRight size={12} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {(!division.program_kerjas || division.program_kerjas.length === 0) && (
                                <div className="col-span-full py-10 text-center bg-muted/20 border border-dashed border-border rounded-2xl">
                                    <p className="text-muted-foreground text-sm">Belum ada program kerja untuk divisi ini.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {filteredDivisions.length === 0 && (
                    <div className="py-20 text-center">
                        <CircleDashed size={48} className="mx-auto text-muted-foreground/30 mb-4 animate-spin-slow" />
                        <h3 className="text-xl font-bold text-foreground">Divisi Tidak Ditemukan</h3>
                        <p className="text-muted-foreground mt-2">Coba filter divisi lainnya.</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedProgram && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProgram(null)}
                            className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-3xl bg-card rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-border/50 max-h-[85vh]"
                        >
                            {/* Modal Header */}
                            <div className="relative h-56 shrink-0">
                                <img
                                    src={selectedProgram.documentation?.[0]}
                                    alt={selectedProgram.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${selectedProgram.title}&background=1a1a1a&color=fff&size=512`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

                                <button
                                    onClick={() => setSelectedProgram(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-20 backdrop-blur-sm"
                                >
                                    <X size={20} />
                                </button>

                                <div className="absolute bottom-6 left-8 right-8">
                                    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg mb-3", getStatusColor(selectedProgram.status))}>
                                        {getStatusIcon(selectedProgram.status)}
                                        {selectedProgram.status}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 leading-tight">{selectedProgram.title}</h2>
                                    <p className="text-muted-foreground text-sm font-bold flex items-center gap-2">
                                        <Calendar size={14} className="text-brand-red" />
                                        {new Date(selectedProgram.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                                <div className="space-y-8">
                                    {/* Isi Kegiatan */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
                                            Isi Kegiatan
                                        </h3>
                                        <p className="text-foreground/80 leading-relaxed text-base">
                                            {selectedProgram.description}
                                        </p>
                                    </div>

                                    {/* Dokumentasi */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black text-brand-red uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
                                            <ImageIcon size={16} /> Dokumentasi
                                        </h3>
                                        {selectedProgram.documentation && selectedProgram.documentation.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {selectedProgram.documentation.map((doc, idx) => (
                                                    <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-muted group/img relative cursor-pointer border border-border/50 hover:border-brand-red/30 transition-all">
                                                        {doc.endsWith('.mp4') || doc.endsWith('.webm') ? (
                                                            <video src={doc} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <img
                                                                src={doc}
                                                                alt={`Dokumentasi ${idx + 1}`}
                                                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                                                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=Doc+${idx + 1}&background=random` }}
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors" />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center bg-muted/30 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground gap-2">
                                                <ImageIcon size={32} className="opacity-20" />
                                                <p className="text-sm">Belum ada dokumentasi</p>
                                            </div>
                                        )}
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

export default Proker;
