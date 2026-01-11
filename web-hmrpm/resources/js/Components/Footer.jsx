import { Link } from "@inertiajs/react";
import { Instagram, Mail, MapPin, Globe, ArrowUpRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border pt-24 pb-12 relative overflow-hidden transition-colors duration-300">
            {/* Background Accents */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-4 group">
                            <div className="bg-brand-yellow p-2 rounded-xl shadow-lg shadow-brand-yellow/20 group-hover:rotate-12 transition-transform duration-500">
                                <img src="/logo.png" alt="HMRPM Logo" className="h-8 w-auto" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter leading-none">HMRPM</h3>
                                <p className="text-[10px] font-bold text-brand-red tracking-[0.3em] uppercase">Universitas Jember</p>
                            </div>
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                            Mewadahi aspirasi, kreativitas, dan inovasi mahasiswa Rekayasa Perancangan Mekanik untuk masa depan teknologi yang lebih baik.
                        </p>

                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "https://www.instagram.com/hmrpm.unej/", label: "Instagram" },
                                { icon: Globe, href: "#", label: "Website" },
                                { icon: Mail, href: "mailto:info@hmrpm.unej.ac.id", label: "Email" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-12 h-12 bg-muted hover:bg-brand-red hover:text-white flex items-center justify-center rounded-2xl transition-all duration-300 shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-foreground font-black text-sm uppercase tracking-widest">Organisasi</h4>
                            <div className="flex flex-col space-y-3">
                                {[
                                    { name: "Tentang Kami", href: "/about" },
                                    { name: "Visi & Misi", href: "/about#visi-misi" },
                                    { name: "Struktur Pengurus", href: "/divisi" },
                                    { name: "Sejarah HMRPM", href: "/about#history" }
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-brand-red text-sm font-medium transition-all group flex items-center gap-1"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-foreground font-black text-sm uppercase tracking-widest">Eksplorasi</h4>
                            <div className="flex flex-col space-y-3">
                                {[
                                    { name: "Program Kerja", href: "/proker" },
                                    { name: "Blog & Berita", href: "/blog" },
                                    { name: "Galeri Kegiatan", href: "/gallery" },
                                    { name: "Akademisi Prodi", href: "/akademisi" }
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-brand-red text-sm font-medium transition-all group flex items-center gap-1"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 col-span-2 md:col-span-1">
                            <h4 className="text-foreground font-black text-sm uppercase tracking-widest">Kontak</h4>
                            <div className="space-y-4 text-sm text-muted-foreground">
                                <div className="flex gap-3 items-start group cursor-crosshair">
                                    <MapPin size={18} className="text-brand-red shrink-0" />
                                    <p className="font-medium group-hover:text-foreground transition-colors leading-relaxed">
                                        Jubung Lor, Jubung, Kec. Sukorambi, Kabupaten Jember, Jawa Timur 68151. Kotak Pos 159 Jember 68121
                                    </p>
                                </div>
                                <div className="flex gap-3 items-center group">
                                    <Phone size={18} className="text-brand-red shrink-0" />
                                    <p className="font-medium group-hover:text-foreground transition-colors">085194184911</p>
                                </div>
                                <div className="flex gap-3 items-center group">
                                    <Mail size={18} className="text-brand-red shrink-0" />
                                    <p className="font-medium group-hover:text-foreground transition-colors">hmrpm.teknik@unej.ac.id</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-center items-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    <p className="text-center">
                        &copy; {currentYear} HMRPM Universitas Jember. <span className="text-brand-red/40 px-2">|</span> <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
