import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, usePage } from "@inertiajs/react";
import { ChevronLeft, Calendar, CheckCircle2, Clock, CircleDashed, Users, X, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

const DetailProker = ({ background, divisionId }) => {
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

    // Mock Data (Shared with Proker.jsx - In real app, this should come from API/Props)
    const allDivisions = [
        {
            id: "psdm",
            name: "PSDM",
            fullName: "Pengembangan Sumber Daya Mahasiswa",
            description: "Fokus pada pengembangan soft skill dan hard skill mahasiswa.",
            programs: [
                {
                    name: "Latihan Dasar Kepemimpinan",
                    status: "Selesai",
                    date: "Januari 2025",
                    image: "/storage/proker/ldk.jpg",
                    description: "Pelatihan kepemimpinan dasar untuk mahasiswa baru.",
                    content: "Latihan Dasar Kepemimpinan (LDK) adalah program wajib bagi mahasiswa baru untuk membentuk karakter kepemimpinan yang tangguh, disiplin, dan bertanggung jawab. Kegiatan ini meliputi materi manajemen organisasi, problem solving, dan team building.",
                    documentation: [
                        "/storage/proker/ldk-1.jpg",
                        "/storage/proker/ldk-2.jpg",
                        "/storage/proker/ldk-3.jpg",
                    ]
                },
                {
                    name: "Upgrading Staff",
                    status: "Progress",
                    date: "Februari 2025",
                    image: "/storage/proker/upgrading.jpg",
                    description: "Peningkatan kapasitas staff himpunan.",
                    content: "Upgrading Staff bertujuan untuk meningkatkan kompetensi dan kinerja seluruh pengurus himpunan. Materi yang diberikan mencakup administrasi, manajemen waktu, dan strategi komunikasi efektif.",
                    documentation: [
                        "/storage/proker/upgrading-1.jpg",
                        "/storage/proker/upgrading-2.jpg"
                    ]
                },
                {
                    name: "Webinar Nasional",
                    status: "Progress",
                    date: "Mei 2025",
                    image: "/storage/proker/webinar.jpg",
                    description: "Seminar online dengan pembicara nasional.",
                    content: "Webinar Nasional mengangkat tema teknologi terkini dalam dunia perancangan mekanik. Mengundang narasumber ahli dari industri dan akademisi untuk berbagi wawasan kepada mahasiswa.",
                    documentation: []
                },
                {
                    name: "Workshop CV & Interview",
                    status: "Progress",
                    date: "Juni 2025",
                    image: "/storage/proker/workshop.jpg",
                    description: "Persiapan karir untuk mahasiswa tingkat akhir.",
                    content: "Workshop ini memberikan panduan praktis membuat CV yang menarik dan tips menghadapi wawancara kerja. Bekerja sama dengan HRD perusahaan ternama.",
                    documentation: []
                },
                {
                    name: "Program Mentoring",
                    status: "Selesai",
                    date: "Sepanjang Periode",
                    image: "/storage/proker/mentoring.jpg",
                    description: "Mentoring akademik dan organisasi.",
                    content: "Program Mentoring memfasilitasi mahasiswa tingkat awal untuk mendapatkan bimbingan dari kakak tingkat mengenai akademik dan adaptasi kehidupan kampus.",
                    documentation: [
                        "/storage/proker/mentoring-1.jpg"
                    ]
                },
            ]
        },
        {
            id: "kominfo",
            name: "Kominfo",
            fullName: "Komunikasi dan Informasi",
            description: "Mengelola informasi dan media sosial himpunan.",
            programs: [
                {
                    name: "Maintenance Website",
                    status: "Progress",
                    date: "Setiap Bulan",
                    image: "/storage/proker/website.jpg",
                    description: "Pemeliharaan dan update konten website.",
                    content: "Kegiatan rutin untuk memastikan website himpunan tetap aman, cepat, dan up-to-date dengan informasi terbaru seputar kegiatan mahasiswa.",
                    documentation: []
                },
                {
                    name: "Pelatihan Desain Grafis",
                    status: "Progress",
                    date: "Maret 2025",
                    image: "/storage/proker/desain.jpg",
                    description: "Workshop desain menggunakan Adobe Illustrator.",
                    content: "Pelatihan ini mengajarkan dasar-dasar desain grafis kepada mahasiswa agar mampu membuat konten visual yang menarik untuk keperluan himpunan maupun pribadi.",
                    documentation: ["/storage/proker/desain-1.jpg"]
                },
                {
                    name: "Social Media Activation",
                    status: "Progress",
                    date: "Setiap Hari",
                    image: "/storage/proker/socmed.jpg",
                    description: "Pengelolaan Instagram dan TikTok HMRPM.",
                    content: "Mengelola akun media sosial resmi himpunan untuk menyebarkan informasi kegiatan, prestasi, dan konten edukatif yang relevan.",
                    documentation: []
                },
                {
                    name: "Documentation Event",
                    status: "Selesai",
                    date: "Fleksibel",
                    image: "/storage/proker/doc.jpg",
                    description: "Dokumentasi setiap kegiatan himpunan.",
                    content: "Bertanggung jawab mendokumentasikan setiap momen penting dalam kegiatan himpunan, baik berupa foto maupun video.",
                    documentation: ["/storage/proker/doc-1.jpg", "/storage/proker/doc-2.jpg"]
                },
            ]
        },
        {
            id: "hublu",
            name: "Hublu",
            fullName: "Hubungan Luar",
            description: "Membangun relasi dengan pihak eksternal kampus dan alumni.",
            programs: [
                {
                    name: "Studi Banding",
                    status: "Progress",
                    date: "April 2025",
                    image: "/storage/proker/stuban.jpg",
                    description: "Kunjungan ke Himpunan Mesin universitas lain.",
                    content: "Bertukar wawasan dan pengalaman organisasi dengan himpunan mahasiswa dari universitas lain untuk meningkatkan kualitas manajemen organisasi.",
                    documentation: ["/storage/proker/stuban-1.jpg"]
                },
                {
                    name: "Alumni Gathering",
                    status: "Progress",
                    date: "Agustus 2025",
                    image: "/storage/proker/alumni.jpg",
                    description: "Temu kangen alumni lintas angkatan.",
                    content: "Ajang silaturahmi antara pengurus aktif dengan alumni untuk mempererat ikatan kekeluargaan dan networking profesional.",
                    documentation: []
                },
                {
                    name: "Kunjungan Industri",
                    status: "Progress",
                    date: "Oktober 2025",
                    image: "/storage/proker/industry.jpg",
                    description: "Visit company ke perusahaan manufaktur.",
                    content: "Mengajak mahasiswa melihat langsung proses produksi dan lingkungan kerja di industri manufaktur untuk menambah wawasan praktis.",
                    documentation: ["/storage/proker/industry-1.jpg"]
                },
            ]
        }
    ];

    const division = allDivisions.find(d => d.id === divisionId) || allDivisions[0];

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

            {/* Back Button */}
            {/* Keeping existing back button logic */}


            {/* Hero Section (Specific Division) */}
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

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-sm">
                            Divisi {division.name}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 drop-shadow-xl uppercase">
                            {division.fullName}
                        </h1>
                        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                            {division.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-6">
                    <Link
                        href="/proker"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md border border-border rounded-full text-sm font-bold text-muted-foreground hover:text-foreground hover:border-brand-red transition-all shadow-sm hover:shadow-lg group dark:text-brand-red dark:border-brand-red/50 dark:bg-brand-red/5"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Kembali
                    </Link>
                </div>

                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-6 h-6 text-brand-red" />
                        Daftar Program Kerja
                    </h2>
                    <div className="text-sm text-muted-foreground font-medium">
                        Total {division.programs.length} Program
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {division.programs.map((program, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => setSelectedProgram(program)}
                            className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-brand-red/30 hover:shadow-2xl hover:shadow-brand-red/5 transition-all duration-500 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={program.image}
                                    alt={program.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${program.name}&background=1a1a1a&color=fff&size=512`;
                                    }}
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg", getStatusColor(program.status))}>
                                        {getStatusIcon(program.status)}
                                        {program.status}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col grow">
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-3">
                                    <Calendar className="w-3 h-3" />
                                    {program.date}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
                                    {program.name}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 grow">
                                    {program.description}
                                </p>

                                <div className="pt-4 border-t border-border/50 mt-auto">
                                    <button className="text-brand-red text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Detail Program <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
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
                                <img src={selectedProgram.image} alt={selectedProgram.name} className="w-full h-full object-cover" />
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
                                    <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 leading-tight">{selectedProgram.name}</h2>
                                    <p className="text-muted-foreground text-sm font-bold flex items-center gap-2">
                                        <Calendar size={14} className="text-brand-red" />
                                        {selectedProgram.date}
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
                                            {selectedProgram.content}
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
                                                        <img
                                                            src={doc}
                                                            alt={`Dokumentasi ${idx + 1}`}
                                                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=Doc+${idx + 1}&background=random` }}
                                                        />
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

export default DetailProker;
