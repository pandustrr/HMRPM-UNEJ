import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, FileText, Calendar, Tag, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Index({ blogs }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const handleDelete = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(`/admin/blog/${blogToDelete.id}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setBlogToDelete(null);
            }
        });
    };

    return (
        <>
            <Head title="Kelola Blog" />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-foreground uppercase tracking-tighter">KELOLA BLOG</h1>
                        <p className="text-muted-foreground text-xs font-medium">Manajemen artikel, berita, dan pengumuman HMRPM.</p>
                    </div>
                    <Link
                        href="/admin/blog/create"
                        className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20"
                    >
                        <Plus size={18} />
                        Tambah Blog
                    </Link>
                </div>

                <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Konten</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Tipe & Tanggal</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                                                    {blog.image ? (
                                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                            <FileText size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-brand-red transition-colors">{blog.title}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium line-clamp-1">{blog.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-red/10 text-brand-red rounded-md w-fit">
                                                    <Tag size={10} />
                                                    <span className="text-[10px] font-black uppercase tracking-wider">{blog.blog_type?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Calendar size={12} />
                                                    <span className="text-xs font-medium">{new Date(blog.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {blog.is_published ? (
                                                <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-wider">Terbit</span>
                                            ) : (
                                                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-wider">Draft</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <a
                                                href={`/blog/${blog.slug}`}
                                                target="_blank"
                                                className="p-2 inline-block bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Lihat Publik"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                            <Link
                                                href={`/admin/blog/${blog.id}/edit`}
                                                className="p-2 inline-block bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog)}
                                                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground italic">
                                        Belum ada postingan blog.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 mx-auto">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-black text-center tracking-tighter mb-2 uppercase">HAPUS BLOG?</h3>
                        <p className="text-center text-muted-foreground text-sm mb-8">
                            Tindakan ini tidak dapat dibatalkan. Menghapus "<strong>{blogToDelete?.title}</strong>" akan menghilangkan data selamanya.
                        </p>
                        <div className="flex gap-3 text-sm">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl font-black transition-all"
                            >
                                BATAL
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black transition-all shadow-lg shadow-red-100"
                            >
                                YA, HAPUS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = (page) => <AdminLayout children={page} />;
