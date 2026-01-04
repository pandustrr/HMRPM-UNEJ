import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Calendar, Tag, ChevronRight, FileText, Search } from "lucide-react";
import { useState } from "react";

export default function Blog({ blogs }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.blog_type?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-background min-h-screen pb-20">
            <Head title="Blog & Berita | HMRPM" />

            {/* Header Section */}
            <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-brand-red rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-red font-black tracking-[0.3em] uppercase text-xs block"
                    >
                        Official Voice of HMRPM
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase"
                    >
                        Blog & <span className="text-brand-yellow">Berita</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium"
                    >
                        Ikuti perkembangan terbaru, artikel edukatif, dan pengumuman resmi seputar Prodi TRPM.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                {/* Search & Filter Bar */}
                <div className="bg-card p-4 rounded-3xl border border-border shadow-xl mb-12 flex flex-col md:flex-row gap-4 items-center">
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
                                className="group h-full flex flex-col bg-card rounded-4xl overflow-hidden border border-border hover:border-brand-red/30 transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
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
                                    <div className="p-8 flex flex-col flex-1 space-y-4">
                                        <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                            <Calendar size={12} className="text-brand-red" />
                                            {new Date(blog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>

                                        <h2 className="text-xl font-black text-foreground tracking-tighter line-clamp-2 min-h-14 group-hover:text-brand-red transition-colors">
                                            {blog.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-medium">
                                            {blog.excerpt}
                                        </p>

                                        <div className="pt-4 mt-auto flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Selengkapnya
                                            <ChevronRight size={16} />
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
