import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ChevronDown, Mail, Instagram, MapPin, FlaskConical, Zap, User } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import AOS from "aos";
import "aos/dist/aos.css";
import DetailAcademicModal from "./DetailAcademicModal";

const Akademisi = ({ background, academics }) => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    const [hoveredLab, setHoveredLab] = useState(null);
    const [selectedAcademic, setSelectedAcademic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (academic) => {
        setSelectedAcademic(academic);
        setIsModalOpen(true);
    };

    const lecturers = academics.filter(a => a.type === 'dosen');
    const technicians = academics.filter(a => a.type === 'teknisi');

    const laboratories = [
        {
            id: 1,
            name: "Laboratorium CAD/CAM",
            role: "Kepala Lab: Dr. Eng. Ir. Sutrisno, M.T.",
            image: "/storage/logo/hmrpm.png",
            video: null,
            details: [
                { label: "Lokasi", value: "Gedung Laboratorium Terpadu Lt. 1", icon: MapPin },
                { label: "Fasilitas Utama", value: "30 Workstations, CNC Simulator", icon: Zap },
                { label: "Jenis Kegiatan", value: "Praktikum Desain & Manufaktur", icon: FlaskConical },
                { label: "Kapasitas", value: "30 Mahasiswa", icon: User },
            ]
        },
        {
            id: 2,
            name: "Laboratorium Material Teknik",
            role: "Kepala Lab: Prof. Dr. Budiarto",
            image: "/storage/logo/hmrpm.png",
            video: null,
            details: [
                { label: "Lokasi", value: "Gedung Laboratorium Terpadu Lt. 2", icon: MapPin },
                { label: "Fasilitas Utama", value: "Uji Tarik, Uji Kekerasan, Mikroskop", icon: Zap },
                { label: "Jenis Kegiatan", value: "Pengujian Material & Metalurgi", icon: FlaskConical },
                { label: "Kapasitas", value: "25 Mahasiswa", icon: User },
            ]
        },
        {
            id: 3,
            name: "Laboratorium Mekatronika",
            role: "Kepala Lab: Ir. Haryono, M.Eng.",
            image: "/storage/logo/hmrpm.png",
            video: null,
            details: [
                { label: "Lokasi", value: "Gedung Laboratorium Terpadu Lt. 3", icon: MapPin },
                { label: "Fasilitas Utama", value: "PLC Training Kits, Robotic Arms", icon: Zap },
                { label: "Jenis Kegiatan", value: "Otomasi Industri & Robotika", icon: FlaskConical },
                { label: "Kapasitas", value: "20 Mahasiswa", icon: User },
            ]
        }
    ];

    return (
        <div className="bg-background min-h-screen pb-20">
            <Head title="Akademisi | HMRPM" />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
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
                            alt="Akademisi Background"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black"></div>
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 drop-shadow-xl uppercase">
                            Akademisi <span className="text-brand-yellow">Prodi</span>
                        </h1>
                        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                            Daftar Dosen dan Teknisi yang mendukung kegiatan akademik di lingkungan Himpunan Mahasiswa Rekayasa Perancangan Mekanik.
                        </p>
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

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Dosen Section */}
                <div className="mb-32">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-3 block underline decoration-brand-yellow/30 underline-offset-4">Academic Staff</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-4 tracking-tighter">
                            Daftar <span className="text-brand-yellow">Dosen</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium">
                            Tenaga pendidik profesional yang membimbing dan menyalurkan ilmu bagi mahasiswa Rekayasa Perancangan Mekanik.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
                        {lecturers.map((person, index) => (
                            <motion.div
                                key={person.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => openModal(person)}
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
                                    src={person.image || "/storage/logo/hmrpm.png"}
                                    alt={person.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                    onError={(e) => e.target.src = "/storage/logo/hmrpm.png"}
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
                                    <h4 className="text-base sm:text-lg font-black tracking-tight mb-1 text-white group-hover:text-brand-red transition-colors duration-300 line-clamp-2">
                                        {person.name}
                                    </h4>
                                    <p className="text-[10px] sm:text-xs font-bold text-brand-yellow uppercase tracking-wider mb-1 line-clamp-1">
                                        {person.position || 'Dosen'}
                                    </p>
                                    <p className="text-[10px] font-medium text-white/50 mb-4 group-hover:text-white/70 transition-colors font-mono">
                                        {person.nidn || ""}
                                    </p>

                                    {/* Social Icons - Instagram & Email */}
                                    <div className="flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transition-transform">
                                        {person.email && (
                                            <div
                                                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
                                                title="Detail"
                                            >
                                                <User size={14} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Teknisi Section */}
                <div>
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-3 block underline decoration-brand-yellow/30 underline-offset-4">Technical Staff</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-4 tracking-tighter">
                            Daftar <span className="text-brand-yellow">Teknisi</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium">
                            Tim ahli yang mendukung keberlanjutan pratikum dan pemeliharaan fasilitas laboratorium di Prodi RPM.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
                        {technicians.map((person, index) => (
                            <motion.div
                                key={person.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => openModal(person)}
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
                                    src={person.image || "/storage/logo/hmrpm.png"}
                                    alt={person.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                    onError={(e) => e.target.src = "/storage/logo/hmrpm.png"}
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
                                    <h4 className="text-base sm:text-lg font-black tracking-tight mb-1 text-white group-hover:text-brand-red transition-colors duration-300 line-clamp-2">
                                        {person.name}
                                    </h4>
                                    <p className="text-[10px] sm:text-xs font-bold text-brand-yellow uppercase tracking-wider mb-1 line-clamp-1">
                                        {person.position || 'Teknisi'}
                                    </p>

                                    {/* Social Icons - Instagram & Email */}
                                    <div className="flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transition-transform mt-2">
                                        <div
                                            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
                                            title="Detail"
                                        >
                                            <User size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Laboratorium Section (Zig-Zag Style like About.jsx) */}
                <div className="mt-32">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-3 block underline decoration-brand-yellow/30 underline-offset-4">Facilities</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-4 tracking-tighter">
                            Daftar <span className="text-brand-yellow">Laboratorium</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium">
                            Fasilitas penunjang kegiatan praktikum dan penelitian mahasiswa Rekayasa Perancangan Mekanik.
                        </p>
                    </div>

                    <div className="space-y-24 items-center">
                        {laboratories.map((lab, idx) => (
                            <div key={lab.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    onMouseEnter={() => setHoveredLab(lab.id)}
                                    onMouseLeave={() => setHoveredLab(null)}
                                    className={cn(
                                        "lg:col-span-3 relative group",
                                        idx % 2 !== 0 && "lg:order-2"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                                        idx % 2 === 0 ? "bg-brand-red/10" : "bg-brand-yellow/10"
                                    )}></div>
                                    <div className={cn(
                                        "relative h-72 sm:h-96 rounded-3xl overflow-hidden border-2 shadow-xl bg-black transition-colors duration-500",
                                        idx % 2 === 0 ? "border-brand-red/20 group-hover:border-brand-red/50" : "border-brand-yellow/20 group-hover:border-brand-yellow/50"
                                    )}>
                                        <AnimatePresence mode="wait">
                                            {hoveredLab === lab.id && lab.video ? (
                                                <motion.video
                                                    key="video"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    src={lab.video}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <motion.img
                                                    key="image"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    src={lab.image}
                                                    alt={lab.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    onError={(e) => { e.target.src = "/storage/logo/hmrpm.png"; }}
                                                />
                                            )}
                                        </AnimatePresence>
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                                        <div className={cn(
                                            "absolute bottom-5 left-5 right-5 pointer-events-none",
                                            idx % 2 !== 0 && "text-right"
                                        )}>
                                            <p className={cn(
                                                "font-black uppercase tracking-widest text-[9px] mb-1",
                                                idx % 2 === 0 ? "text-brand-yellow" : "text-brand-red"
                                            )}>{lab.role}</p>
                                            <h4 className="text-white text-lg font-bold leading-tight">{lab.name}</h4>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "lg:col-span-9 space-y-6",
                                        idx % 2 !== 0 && "lg:order-1 lg:text-right"
                                    )}
                                >
                                    <div className={cn(
                                        "flex",
                                        idx % 2 !== 0 ? "lg:justify-end" : "justify-start"
                                    )}>
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-4 py-1.5 border rounded-full text-xs font-black uppercase tracking-widest",
                                            idx % 2 === 0
                                                ? "bg-brand-red/5 border-brand-red/10 text-brand-red"
                                                : "bg-brand-yellow/5 border-brand-yellow/20 text-brand-yellow"
                                        )}>
                                            Detail Laboratorium
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {lab.details.map((detail, detailIdx) => (
                                            <div key={detailIdx} className={cn(
                                                "p-3 bg-card border border-border/50 rounded-xl transition-colors group",
                                                idx % 2 === 0 ? "hover:border-brand-red/30" : "hover:border-brand-yellow/30"
                                            )}>
                                                <div className={cn(
                                                    "flex items-start gap-3",
                                                    idx % 2 !== 0 && "flex-row-reverse text-right"
                                                )}>
                                                    <div className={cn(
                                                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all",
                                                        idx % 2 === 0
                                                            ? "bg-brand-red/5 group-hover:bg-brand-red group-hover:text-white"
                                                            : "bg-brand-yellow/5 group-hover:bg-brand-yellow group-hover:text-black"
                                                    )}>
                                                        <detail.icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="min-w-0 flex flex-col justify-center">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{detail.label}</p>
                                                        <p className="text-xs font-bold text-foreground leading-tight wrap-break-word">{detail.value}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DetailAcademicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                academic={selectedAcademic}
            />
        </div>
    );
};

export default Akademisi;
