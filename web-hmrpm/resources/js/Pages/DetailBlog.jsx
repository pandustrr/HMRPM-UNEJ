import { Head, Link } from "@inertiajs/react";
import { Calendar, Tag, User, ArrowLeft, Share2, Facebook, Instagram, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function DetailBlog({ blog, relatedBlogs }) {
    return (
        <div className="bg-background min-h-screen pb-20">
            <Head title={`${blog.title} | Blog HMRPM`} />

            {/* Hero Header */}
            <section className="relative h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                            <span className="text-white/10 font-black text-9xl uppercase tracking-tighter">HMRPM</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold hover:bg-brand-red transition-all group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Kembali ke Blog
                        </Link>

                        <div className="space-y-3">
                            <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                                {blog.blog_type?.name}
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter max-w-4xl text-white drop-shadow-2xl">
                                {blog.title}
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-medium border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-brand-yellow" />
                                {new Date(blog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-brand-yellow" />
                                Admin HMRPM
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative z-20 -mt-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl">
                            {/* Rich Text Content from CKEditor */}
                            <div
                                className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-img:rounded-2xl prose-a:text-brand-red prose-strong:text-foreground"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Share Buttons */}
                            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Share2 size={14} /> Bagikan
                                </span>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-muted hover:bg-brand-red hover:text-white rounded-lg transition-all text-muted-foreground border border-border">
                                        <Instagram size={18} />
                                    </button>
                                    <button className="p-2 bg-muted hover:bg-brand-red hover:text-white rounded-lg transition-all text-muted-foreground border border-border">
                                        <Facebook size={18} />
                                    </button>
                                    <button className="p-2 bg-muted hover:bg-brand-red hover:text-white rounded-lg transition-all text-muted-foreground border border-border">
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Related Posts */}
                            {relatedBlogs.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-red border-l-4 border-brand-yellow pl-4">
                                        Artikel Terkait
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedBlogs.map(item => (
                                            <Link
                                                key={item.id}
                                                href={`/blog/${item.slug}`}
                                                className="block p-4 bg-card rounded-2xl border border-border hover:border-brand-red/50 transition-all hover:shadow-lg group"
                                            >
                                                <h4 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-brand-red transition-colors mb-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[10px] text-muted-foreground font-medium">
                                                    {new Date(item.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Banner / Call to action */}
                            <div className="bg-slate-900 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                                <img src="/logo.png" alt="HMRPM" className="h-12 w-auto mx-auto brightness-200" />
                                <h3 className="text-white font-black text-xl tracking-tighter uppercase">Gabung Komunitas</h3>
                                <p className="text-white/60 text-xs font-medium">Jangan lewatkan update terbaru seputar HMRPM dan kegiatan mahasiswa.</p>
                                <a
                                    href="https://www.instagram.com/hmrpm.unej?igsh=MW5sOXF2dGU0d285eQ=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-brand-red text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-brand-red/20"
                                >
                                    Follow Instagram
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
