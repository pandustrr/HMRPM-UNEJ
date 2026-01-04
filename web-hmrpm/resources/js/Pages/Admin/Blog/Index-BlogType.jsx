import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Tag, X, Save } from "lucide-react";

export default function Index({ blogTypes }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [typeToDelete, setTypeToDelete] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
    });

    const handleOpenModal = (type = null) => {
        if (type) {
            setEditData(type);
            setData('name', type.name);
        } else {
            setEditData(null);
            reset();
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            put(`/admin/blog-types/${editData.id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        } else {
            post('/admin/blog-types', {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (type) => {
        setTypeToDelete(type);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(`/admin/blog-types/${typeToDelete.id}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setTypeToDelete(null);
            }
        });
    };

    return (
        <>
            <Head title="Kelola Tipe Blog" />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-foreground uppercase tracking-tighter">KELOLA TIPE BLOG</h1>
                        <p className="text-muted-foreground text-xs font-medium">Kategori atau label untuk mengelompokkan konten blog HMRPM.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20"
                    >
                        <Plus size={18} />
                        Tambah Tipe
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Tipe Blog</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Slug</th>
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
                                        <td className="px-6 py-4 text-xs text-muted-foreground font-mono">{type.slug}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(type)}
                                                className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(type)}
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
                                    <td colSpan="3" className="px-6 py-12 text-center text-muted-foreground italic">
                                        Belum ada tipe blog yang ditambahkan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black tracking-tighter uppercase">{editData ? 'EDIT TIPE BLOG' : 'TAMBAH TIPE BLOG'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Nama Tipe Blog</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Masukkan nama tipe..."
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-medium"
                                    autoFocus
                                />
                                {errors.name && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.name}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-red text-white py-4 rounded-xl font-black transition-all shadow-xl hover:shadow-brand-red/20 uppercase tracking-widest"
                            >
                                <Save size={18} />
                                {processing ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 mx-auto">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-black text-center tracking-tighter mb-2 uppercase">HAPUS TIPE BLOG?</h3>
                        <p className="text-center text-muted-foreground text-sm mb-8">
                            Tindakan ini tidak dapat dibatalkan. Blog yang menggunakan tipe "<strong>{typeToDelete?.name}</strong>" mungkin terpengaruh.
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
