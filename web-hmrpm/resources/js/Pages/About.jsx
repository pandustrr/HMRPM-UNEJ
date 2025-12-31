import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Target,
    Palette,
    Layers,
    Hexagon,
    Cpu,
    Shield,
    Zap,
    ChevronDown
} from "lucide-react";
import InteractiveLogo from "../Components/InteractiveLogo";
import { cn } from "../lib/utils";

const About = ({ background }) => {
    useEffect(() => {
        AOS.init({
            duration: 1500, // Durasi diperlambat menjadi 1.5 detik
            once: true,
            easing: 'ease-out-cubic',
            offset: 120,
        });
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const missionPoints = [
        "Mengembangkan program kerja yang mendorong kolaborasi dan keterlibatan aktif mahasiswa dalam kegiatan akademik dan non-akademik.",
        "Membina keterampilan teknis dan manajerial mahasiswa melalui pelatihan, seminar, dan workshop yang relevan dengan kebutuhan industri dan kewirausahaan.",
        "Menciptakan ruang kreatif bagi mahasiswa untuk mengembangkan ide dan inovasi dalam bidang perancangan mekanik.",
        "Menghubungkan mahasiswa dengan dunia industri dan profesional melalui program magang, studi ekskursi, dan jejaring komunitas.",
        "Membangun ekosistem kewirausahaan berbasis teknologi di lingkungan kampus untuk mendorong lahirnya startup baru yang inovatif.",
        "Meningkatkan solidaritas dan rasa memiliki antaranggota himpunan untuk memperkuat budaya kerja tim dan semangat kolaboratif."
    ];

    const logoElements = [
        {
            image: "/storage/logo/huruf-m.png",
            title: "Huruf M",
            description: "Huruf M menandakan bahwa mahasiswa Rekayasa Perancangan Mekanik mempelajari keilmuan tentang Teknik Mesin pada bidang Desain Mekanik"
        },
        {
            image: "/storage/logo/gerigi-4.png",
            title: "Gerigi Berjumlah 4",
            description: "Gerigi berjumlah 4 menandakan Himpunan Mahasiswa Rekayasa Perancangan Mekanik lahir pada tanggal 4"
        },
        {
            image: "/storage/logo/hmrpm.png",
            title: "HMRPM",
            description: "Tulisan HMRPM pada logo merupakan Akronim dari Himpunan Mahasiswa Rekayasa Perancangan Mekanik"
        },
        {
            image: "/storage/logo/lingkaran.png",
            title: "Lingkaran",
            description: "Logo berbentuk lingkaran melambangkan kesatuan antar pengurus, anggota, dan juga alumni yang cukup kuat untuk memajukan prodi"
        },
        {
            image: "/storage/logo/huruf-v.png",
            title: "Huruf V",
            description: "Huruf V pada potongan logo menandakan bahwasanya Prodi D4 RPM bertempat pada Kampus yang bakal Calon Kampus/Fakultas Vokasi"
        },
        {
            image: "/storage/logo/roda-gigi.png",
            title: "Roda Gigi & Huruf M/V",
            description: "Roda Gigi yang mengelilingi huruf M dan V melambangkan Kesolidan antar sesama mahasiswa dan lingkungan kampus"
        },
        {
            image: "/storage/logo/lubang.png",
            title: "Lubang Berjumlah 3",
            description: "Lubang yang berjumlah 3 menandakan bulan lahir Himpunan Mahasiswa Rekayasa Perancangan Mekanik lahir pada bulan maret"
        },
        {
            image: "/storage/logo/garis-potong.png",
            title: "Garis Potongan Huruf M",
            description: "Garis potongan pada huruf M merupakan angka Romawi yang berjumlah 2 melambangkan tahun berdiri Himpunan Rekayasa Perancangan Mekanik yaitu 2022"
        }
    ];

    const logoColors = [
        {
            name: "Hitam",
            hex: "#0F0F0F",
            meaning: "Melambangkan ketegasan, profesionalisme, dan ketangguhan dalam menghadapi tantangan teknik."
        },
        {
            name: "Merah",
            hex: "#AC190D",
            meaning: "Melambangkan semangat juang, inovasi, serta keberanian dalam menghadapi tantangan di dunia perancangan mekanik."
        },
        {
            name: "Maroon",
            hex: "#8D0A01",
            meaning: "Melambangkan kedalaman ilmu, kedewasaan berpikir, dan dedikasi tinggi terhadap bidang rekayasa."
        },
        {
            name: "Kuning",
            hex: "#F8F223",
            meaning: "Mencerminkan kecerdasan, kreativitas dalam desain, serta harapan untuk masa depan yang lebih maju."
        }
    ];

    return (
        <div className="bg-background min-h-screen selection:bg-brand-red selection:text-white">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-60 origin-left"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
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
                            alt="HMRPM Team Background"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black"></div>
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6 drop-shadow-xl">
                            MENGENAL <span className="text-brand-yellow">HMRPM</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                            Membangun masa depan perancangan mekanik dengan integritas, inovasi, dan kolaborasi tanpa batas.
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
                <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-background to-transparent"></div>
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40 space-y-40 lg:space-y-60">

                {/* Logo Philosophy Section - Tentang Logo */}
                <section className="relative">
                    {/* Background decoration */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -z-10"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center lg:items-start text-center lg:text-left"
                        >
                            <span className="py-1 px-4 bg-brand-red/10 text-brand-red rounded-full text-xs font-black uppercase tracking-widest mb-6">Filosofi Eksklusif</span>
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-none tracking-tighter">
                                Tentang <span className="text-brand-red">Logo</span>
                            </h3>
                            <h4 className="text-xl md:text-2xl font-bold text-foreground/80 mb-8">
                                Himpunan Mahasiswa Rekayasa Perancangan Mekanik
                            </h4>
                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    Semua yang ada di dalam logo Himpunan ini merepresentasikan sejarah terbentuknya Prodi D4 Rekayasa Perancangan Mekanik serta kondisi Mahasiswa dan logo ini dibuat sebagai identitas dari himpunan
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="flex justify-center relative group"
                        >
                            <div className="absolute inset-0 bg-brand-yellow/10 blur-[100px] rounded-full group-hover:bg-brand-yellow/20 transition-all duration-700"></div>
                            <InteractiveLogo src="/logo.png" />
                        </motion.div>
                    </div>
                </section>

                {/* Arti Elemen Section */}
                <section className="relative">
                    <div className="mb-16">
                        <h2 className="text-brand-red font-black tracking-widest uppercase mb-4 text-sm">Visual Identity</h2>
                        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Arti-Arti <span className="text-brand-yellow">Elemen</span> Yang Ada Pada Logo</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                            Setiap bagian dari logo kami dirancang dengan ketelitian teknis, mencerminkan aspek fundamental dari rekayasa perancangan mekanik serta sejarah organisasi.
                        </p>
                        <div className="mt-8 h-1 w-20 bg-linear-to-r from-brand-red to-brand-maroon rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {logoElements.map((element, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="group bg-card hover:bg-muted/30 p-8 rounded-4xl border border-border/50 hover:border-brand-red/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-brand-red/5 flex flex-col h-full"
                            >
                                <div className="w-full aspect-square bg-brand-red/5 group-hover:bg-brand-red/10 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 overflow-hidden shrink-0">
                                    {element.image ? (
                                        <img src={element.image} alt={element.title} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="text-brand-red/20 font-black text-xl uppercase tracking-tighter">Placeholder</div>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold mb-4 group-hover:text-brand-red transition-colors">{element.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed outline-none grow">{element.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Arti Warna Section */}
                <section className="relative py-24 px-8 lg:px-20 rounded-[4rem] bg-linear-to-br from-muted/50 via-muted/20 to-transparent border border-border/50 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.03] select-none pointer-events-none">
                        <Palette className="w-[500px] h-[500px]" />
                    </div>

                    <div className="relative z-10">
                        <div className="max-w-3xl mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tighter uppercase">
                                Arti <span className="text-brand-red underline decoration-brand-yellow/30 underline-offset-8">Warna</span>
                            </h2>
                            <h3 className="text-xl font-bold text-foreground/80 mb-6 font-black uppercase tracking-widest">Warna-Warna Yang Digunakan Pada Logo</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Warna-warna pada logo Himpunan Mahasiswa Rekayasa Perancangan Mekanik memiliki makna mendalam yang mencerminkan identitas dan nilai yang dijunjung.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {logoColors.map((color, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 150}
                                    className="flex flex-col gap-6 bg-background p-8 rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 group h-full"
                                >
                                    <div
                                        className="w-full h-32 rounded-2xl shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shrink-0"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                                        <div className="absolute bottom-4 right-4 text-white/40 font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-tighter">
                                            {color.hex}
                                        </div>
                                    </div>
                                    <div className="flex flex-col grow">
                                        <h4 className="font-black text-2xl mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color.hex }}></span>
                                            {color.name}
                                        </h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed font-medium grow">{color.meaning}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Visi & Misi Section */}
                <section className="relative">
                    <div className="text-center mb-24">
                        <span className="text-brand-red font-black tracking-widest uppercase text-xs mb-4 block">Our North Star</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tighter">
                            Visi & <span className="text-brand-yellow">Misi</span> Kami
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            Dalam menjalankan tugasnya, Himpunan Mahasiswa Rekayasa Perancangan Mekanik Universitas jember mempunyai visi dan misi.
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

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full text-xl md:text-3xl font-black uppercase tracking-[0.2em] mb-10 border border-white/20 shadow-xl">
                                        <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
                                        VISI
                                    </div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed tracking-tight max-w-4xl mx-auto opacity-100 italic">
                                        &quot;Menjadikan Himpunan Mahasiswa Rekayasa Perancangan Mekanik sebagai pusat pengembangan kreativitas dan inovasi berbasis teknologi untuk menciptakan mahasiswa yang unggul, kompetititf, dan berjiwa wirausaha di era industri 4.0.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Misi Section */}
                        <div className="max-w-6xl mx-auto">
                            <div className="flex justify-center mb-16">
                                <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-red/5 border border-brand-red/10 rounded-full text-xl md:text-3xl font-black uppercase tracking-[0.2em] text-brand-red shadow-sm">
                                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
                                    MISI
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {missionPoints.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative flex flex-col gap-4 p-8 bg-card hover:bg-muted/30 rounded-3xl border border-border/50 hover:border-brand-red/20 transition-all duration-300 shadow-md hover:shadow-xl"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-brand-red/5 flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                            <span className="font-black text-base">{index + 1}</span>
                                        </div>
                                        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-base md:text-lg leading-relaxed font-medium">
                                            {point}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </div>
    );
};

export default About;
