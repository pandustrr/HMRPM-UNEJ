import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, FileText, Calendar, Tag, ExternalLink, X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index({ blogs, blogTypes }) {
    const { url } = usePage();
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || (params.has('types') ? 'blogs' : 'types');
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [selectedBlogTypes, setSelectedBlogTypes] = useState([]);

    const updateUrl = (newParams) => {
        const search = newParams.toString();
        const newUrl = search ? `${window.location.pathname}?${search}` : window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        updateUrl(params);
    };

    // Initialize filter dari URL query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const typesParam = params.get('types');
        if (typesParam) {
            setSelectedBlogTypes(typesParam.split(',').map(Number));
        }
    }, []);

    // Update URL ketika filter berubah
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (selectedBlogTypes.length > 0) {
            params.set('types', selectedBlogTypes.join(','));
            // Auto switch to blogs tab if filtering
            if (activeTab !== 'blogs') {
                setActiveTab('blogs');
                params.set('tab', 'blogs');
            }
        } else {
            params.delete('types');
        }
        updateUrl(params);
    }, [selectedBlogTypes]);

    // Blog Type Logic
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [editTypeData, setEditTypeData] = useState(null);
    const [showTypeDeleteModal, setShowTypeDeleteModal] = useState(false);
    const [typeToDelete, setTypeToDelete] = useState(null);

    const { data: typeData, setData: setTypeData, post: postType, put: putType, processing: processingType, reset: resetType, errors: typeErrors } = useForm({
        name: '',
    });

    // Toggle filter blog type (single select)
    const toggleBlogTypeFilter = (typeId) => {
        setSelectedBlogTypes(prev =>
            prev.includes(typeId)
                ? [] // Jika sudah aktif, deselect
                : [typeId] // Jika belum aktif, set sebagai satu-satunya yang aktif
        );
    };

    // Filter blogs berdasarkan selected types
    const filteredBlogs = selectedBlogTypes.length > 0
        ? blogs.filter(blog => selectedBlogTypes.includes(blog.blog_type_id))
        : blogs;

    const handleOpenTypeModal = (type = null) => {
        if (type) {
            setEditTypeData(type);
            setTypeData('name', type.name);
        } else {
            setEditTypeData(null);
            resetType();
        }
        setShowTypeModal(true);
    };

    const handleTypeSubmit = (e) => {
        e.preventDefault();
        if (editTypeData) {
            putType(`/admin/blog-types/${editTypeData.id}`, {
                onSuccess: () => {
                    setShowTypeModal(false);
                    resetType();
                }
            });
        } else {
            postType('/admin/blog-types', {
                onSuccess: () => {
                    setShowTypeModal(false);
                    resetType();
                }
            });
        }
    };

    const handleTypeDelete = (type) => {
        setTypeToDelete(type);
        setShowTypeDeleteModal(true);
    };

    const confirmTypeDelete = () => {
        router.delete(`/admin/blog-types/${typeToDelete.id}`, {
            onSuccess: () => {
                setShowTypeDeleteModal(false);
                setTypeToDelete(null);
            }
        });
    };

    // Blog Logic
    const handleDelete = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteModal(true);
    };

    // Generate current URL Params from state
    const getCurrentParams = () => {
        const params = new URLSearchParams();
        if (selectedBlogTypes.length > 0) {
            params.set('types', selectedBlogTypes.join(','));
        }
        if (activeTab) {
            params.set('tab', activeTab);
        }
        return params.toString() ? `?${params.toString()}` : '';
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

            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-foreground uppercase tracking-tighter">KELOLA BLOG</h1>
                        <p className="text-muted-foreground text-xs font-medium">Manajemen kategori dan artikel blog HMRPM.</p>
                    </div>
                    {activeTab === 'types' ? (
                        <button
                            onClick={() => handleOpenTypeModal()}
                            className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20"
                        >
                            <Plus size={18} />
                            Tambah Tipe
                        </button>
                    ) : (
                        <Link
                            href={`/admin/blog/create${getCurrentParams()}`}
                            className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20"
                        >
                            <Plus size={18} />
                            Tambah Blog
                        </Link>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex p-1 gap-1 bg-muted/30 rounded-2xl w-fit border border-border mx-auto">
                    <button
                        onClick={() => handleTabChange('types')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            activeTab === 'types' ? "bg-white shadow-sm text-brand-red" : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        TIPE BLOG
                    </button>
                    <button
                        onClick={() => handleTabChange('blogs')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            activeTab === 'blogs' ? "bg-white shadow-sm text-brand-red" : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        DAFTAR BLOG
                    </button>
                </div>

                {activeTab === 'types' ? (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-border shadow-sm overflow-hidden animate-in fade-in duration-300">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border">
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Tipe Blog</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {blogTypes.length > 0 ? (
                                    blogTypes.map((type) => (
                                        <tr key={type.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-brand-red/10 rounded-lg text-brand-red group-hover:scale-110 transition-transform">
                                                        <Tag size={16} />
                                                    </div>
                                                    <span className="font-bold text-sm">{type.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 text-right">
                                                    <button
                                                        onClick={() => handleOpenTypeModal(type)}
                                                        className="p-2 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleTypeDelete(type)}
                                                        className="p-2 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-12 text-center text-muted-foreground italic">
                                            Belum ada tipe blog yang ditambahkan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                        {/* Filter Blog Type */}
                        <div className="px-6 py-5 border-b border-border bg-muted/30">
                            <div className="space-y-3">
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Filter Tipe Blog</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setSelectedBlogTypes([])}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                                            selectedBlogTypes.length === 0
                                                ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/30"
                                                : "bg-white text-foreground border-border hover:border-brand-red/50 hover:bg-muted/50"
                                        )}
                                    >
                                        Semua
                                    </button>
                                    {blogTypes.length > 0 ? (
                                        blogTypes.map(type => (
                                            <button
                                                key={type.id}
                                                onClick={() => toggleBlogTypeFilter(type.id)}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                                                    selectedBlogTypes.includes(type.id)
                                                        ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/30"
                                                        : "bg-white text-foreground border-border hover:border-brand-red/50 hover:bg-muted/50"
                                                )}
                                            >
                                                {type.name}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-[10px] text-muted-foreground italic">Belum ada tipe blog</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Blog Table */}
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
                                {filteredBlogs.length > 0 ? (
                                    filteredBlogs.map((blog) => (
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
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 text-right">
                                                    <a
                                                        href={`/blog/${blog.slug}`}
                                                        target="_blank"
                                                        className="p-2 flex items-center justify-center bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="Lihat Publik"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                    <Link
                                                        href={`/admin/blog/${blog.id}/edit${getCurrentParams()}`}
                                                        className="p-2 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(blog)}
                                                        className="p-2 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground italic">
                                            {selectedBlogTypes.length > 0
                                                ? 'Tidak ada postingan blog dengan tipe yang dipilih.'
                                                : 'Belum ada postingan blog.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Type Form Modal */}
            {showTypeModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black tracking-tighter uppercase">{editTypeData ? 'EDIT TIPE BLOG' : 'TAMBAH TIPE BLOG'}</h3>
                            <button onClick={() => setShowTypeModal(false)} className="text-muted-foreground hover:text-foreground p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleTypeSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Nama Tipe Blog</label>
                                <input
                                    type="text"
                                    value={typeData.name}
                                    onChange={e => setTypeData('name', e.target.value)}
                                    placeholder="Masukkan nama tipe..."
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-medium"
                                    autoFocus
                                />
                                {typeErrors.name && <p className="text-brand-red text-[10px] font-bold mt-1">{typeErrors.name}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processingType}
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-red text-white py-4 rounded-xl font-black transition-all shadow-xl hover:shadow-brand-red/20 uppercase tracking-widest"
                            >
                                <Save size={18} />
                                {processingType ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Blog Delete Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="HAPUS BLOG?"
                message={`Tindakan ini tidak dapat dibatalkan. Menghapus "${blogToDelete?.title}" akan menghilangkan data selamanya.`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
                confirmText="YA, HAPUS"
                cancelText="BATAL"
            />

            {/* Type Delete Modal */}
            <ConfirmModal
                isOpen={showTypeDeleteModal}
                title="HAPUS TIPE BLOG?"
                message={`Tindakan ini tidak dapat dibatalkan. Blog yang menggunakan tipe "${typeToDelete?.name}" mungkin terpengaruh.`}
                onConfirm={confirmTypeDelete}
                onCancel={() => setShowTypeDeleteModal(false)}
                confirmText="YA, HAPUS"
                cancelText="BATAL"
            />
        </>
    );
}

Index.layout = (page) => <AdminLayout children={page} />;
