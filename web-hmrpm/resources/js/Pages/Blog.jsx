import { Link } from "@inertiajs/react";

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Recap: Workshop Web Development 2025",
            excerpt: "Keseruan kegiatan belajar bersama membuat website modern dengan React.",
            date: "31 Des 2024",
            category: "Event",
            image: "bg-blue-900"
        },
        {
            id: 2,
            title: "Tips Sukses Magang di Tech Company",
            excerpt: "Sharing pengalaman dari alumni yang berhasil tembus perusahaan unicorn.",
            date: "25 Des 2024",
            category: "Artikel",
            image: "bg-brand-red"
        },
        {
            id: 3,
            title: "Pentingnya Soft Skill untuk Programmer",
            excerpt: "Teknis jago saja tidak cukup, simak skill apa saja yang dibutuhkan.",
            date: "20 Des 2024",
            category: "Opini",
            image: "bg-brand-yellow text-brand-black"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-4xl font-bold text-foreground mb-12 border-l-4 border-brand-red pl-4">
                Blog & <span className="text-brand-yellow">Berita</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-brand-yellow/50 transition-all hover:-translate-y-1">
                        <div className={`h-48 w-full ${post.image} flex items-center justify-center`}>
                            <span className="opacity-25 font-bold text-4xl">IMG</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                <span className="uppercase tracking-wider font-semibold text-brand-yellow">{post.category}</span>
                                <span>{post.date}</span>
                            </div>
                            <h2 className="text-xl font-bold text-foreground mb-3 hover:text-brand-red transition-colors">
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                            <Link href={`/blog/${post.id}`} className="inline-block mt-4 text-sm font-semibold text-brand-red hover:text-foreground transition-colors">
                                Baca Selengkapnya
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
