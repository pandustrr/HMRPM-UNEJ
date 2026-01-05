import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Akademisi = ({ background }) => {
    const lecturers = [
        { name: "Dr. Budi Santoso, M.Kom", role: "Kaprodi", nip: "19800101..." },
        { name: "Siti Aminah, S.T., M.T.", role: "Dosen Pembimbing", nip: "19850202..." },
        { name: "Rudi Hartono, M.Cs.", role: "Dosen", nip: "19900303..." },
    ];

    const technicians = [
        { name: "Ahmad Junaedi", role: "Teknisi Lab RPL" },
        { name: "Dewi Sartika", role: "Laboran" },
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
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-brand-yellow mb-8 border-b border-border pb-2 uppercase tracking-tighter">Dosen</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lecturers.map((dosen, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card p-6 rounded-3xl flex items-center space-x-4 hover:bg-card/80 transition-all border border-border/50 hover:border-brand-red/30 shadow-sm hover:shadow-xl group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-brand-maroon flex items-center justify-center text-xl font-bold text-white group-hover:scale-110 transition-transform shadow-lg">
                                    {dosen.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-brand-red transition-colors">{dosen.name}</h3>
                                    <p className="text-sm text-brand-yellow font-medium">{dosen.role}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{dosen.nip}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-brand-yellow mb-8 border-b border-border pb-2 uppercase tracking-tighter">Teknisi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technicians.map((tek, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card p-6 rounded-3xl flex items-center space-x-4 hover:bg-card/80 transition-all border border-border/50 hover:border-brand-red/30 shadow-sm hover:shadow-xl group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center text-xl font-bold text-foreground group-hover:scale-110 transition-transform shadow-md">
                                    {tek.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-brand-red transition-colors">{tek.name}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">{tek.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Akademisi;
