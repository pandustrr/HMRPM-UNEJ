import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Calendar, Tag, ChevronRight, FileText, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Blog({ blogs, background }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.blog_type?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-background min-h-screen pb-20">
            <Head title="Blog & Berita | HMRPM" />

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
                            alt="Blog Background"
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
                            Blog & <span className="text-brand-yellow">Berita</span>
                        </h1>
                        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                            Ikuti perkembangan terbaru, artikel edukatif, dan pengumuman resmi seputar HMRPM.
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
                <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent"></div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                {/* Search & Filter Bar */}
                <div className="bg-card p-4 rounded-3xl border border-border shadow-2xl mb-12 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-red transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Cari artikel atau kategori..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-muted/50 rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Featured Blog Section */}
                {!searchTerm && blogs.length > 0 && (
                    <section className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                            {/* Main Featured Blog (Left) */}
                            {blogs[0] && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="lg:col-span-8 group"
                                >
                                    <Link href={`/blog/${blogs[0].slug}`} className="block relative h-[350px] lg:h-[400px] rounded-3xl overflow-hidden border border-border hover:border-brand-red/50 transition-all duration-500 shadow-xl">
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-red text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                                                Blog Terbaru
                                            </span>
                                        </div>

                                        <img
                                            src={blogs[0].image || "/storage/logo/hmrpm.png"}
                                            alt={blogs[0].title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"></div>

                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-red text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                                                    {blogs[0].blog_type?.name}
                                                </span>
                                            </div>
                                            <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter drop-shadow-lg group-hover:text-brand-yellow transition-colors">
                                                {blogs[0].title}
                                            </h2>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Side Featured Blogs (Right) */}
                            <div className="lg:col-span-4 flex flex-col gap-4">
                                {blogs.slice(1, 4).map((blog, index) => (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group h-[125px] lg:h-[128px]"
                                    >
                                        <Link href={`/blog/${blog.slug}`} className="block relative h-full rounded-2xl overflow-hidden border border-border hover:border-brand-red/50 transition-all duration-500 shadow-md">
                                            <img
                                                src={blog.image || "/storage/logo/hmrpm.png"}
                                                alt={blog.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

                                            <div className="absolute bottom-4 left-4 right-4 z-20">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[7px] font-bold text-white/70 uppercase tracking-widest">
                                                        {new Date(blog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <span className="px-1.5 py-0.5 bg-white/90 backdrop-blur-md text-brand-red text-[7px] font-black uppercase tracking-widest rounded-md shadow-sm">
                                                        {blog.blog_type?.name}
                                                    </span>
                                                </div>
                                                <h3 className="text-xs font-black text-white tracking-tight line-clamp-2 group-hover:text-brand-yellow transition-colors leading-snug">
                                                    {blog.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Grid Postings */}
                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog, idx) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                className="group h-full flex flex-col bg-card rounded-3xl overflow-hidden border border-border hover:border-brand-red/30 transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                            >
                                <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative aspect-video overflow-hidden">
                                        {blog.image ? (
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <FileText size={40} className="text-brand-red/20" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-red text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                                                {blog.blog_type?.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Detail */}
                                    <div className="p-5 flex flex-col flex-1 space-y-3">
                                        <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                            <Calendar size={12} className="text-brand-red" />
                                            {new Date(blog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>

                                        <h2 className="text-base font-black text-foreground tracking-tighter line-clamp-2 min-h-12 group-hover:text-brand-red transition-colors flex items-center">
                                            {blog.title}
                                        </h2>

                                        <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2 font-medium">
                                            {blog.excerpt}
                                        </p>

                                        <div className="pt-2 mt-auto flex items-center gap-2 text-brand-red font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Selengkapnya
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto text-muted-foreground/30">
                            <Search size={40} />
                        </div>
                        <h3 className="text-xl font-black tracking-tighter uppercase">Artikel Tidak Ditemukan</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto text-sm font-medium">Coba gunakan kata kunci lain atau cari di kategori yang berbeda.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="text-brand-red font-black uppercase text-xs underline underline-offset-4"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
