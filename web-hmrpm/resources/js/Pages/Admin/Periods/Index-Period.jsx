import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Calendar, Check, Upload } from "lucide-react";

export default function Index({ periods }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [periodToDelete, setPeriodToDelete] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        year: '',
        is_active: false,
        hero_image: null,
        theme_color: 'bg-brand-red'
    });

    const openCreateModal = () => {
        reset();
        setEditingPeriod(null);
        setShowModal(true);
    };

    const openEditModal = (period) => {
        setData({
            year: period.year,
            is_active: period.is_active,
            hero_image: null,
            theme_color: period.theme_color || 'bg-brand-red'
        });
        setEditingPeriod(period);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('year', data.year);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('theme_color', data.theme_color);
        if (data.hero_image) {
            formData.append('hero_image', data.hero_image);
        }

        if (editingPeriod) {
            router.post(`/admin/periods/${editingPeriod.id}`, {
                _method: 'PUT',
                ...Object.fromEntries(formData)
            }, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        } else {
            router.post('/admin/periods', Object.fromEntries(formData), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (period) => {
        setPeriodToDelete(period);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (periodToDelete) {
            router.delete(`/admin/periods/${periodToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setPeriodToDelete(null);
                }
            });
        }
    };

    const setActive = (period) => {
        router.post(`/admin/periods/${period.id}/set-active`);
    };

    return (
        <>
            <Head title="Kelola Periode" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Kelola Periode</h1>
                        <p className="text-muted-foreground mt-1">Atur periode kepengurusan dan background hero</p>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors"
                    >
                        <Plus size={18} />
                        Tambah Periode
                    </button>
                </div>

                {/* Periods List */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="text-left px-6 py-4 font-bold text-sm">Periode</th>
                                <th className="text-left px-6 py-4 font-bold text-sm">Hero Image</th>
                                <th className="text-left px-6 py-4 font-bold text-sm">Status</th>
                                <th className="text-right px-6 py-4 font-bold text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {periods.map(period => (
                                <tr key={period.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={20} className="text-brand-red" />
                                            <span className="font-bold">{period.year}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {period.hero_image ? (
                                            <img src={period.hero_image} alt="Hero" className="h-12 w-20 object-cover rounded-lg" />
                                        ) : (
                                            <span className="text-muted-foreground text-sm">Tidak ada</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {period.is_active ? (
                                            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                <Check size={14} />
                                                Aktif
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setActive(period)}
                                                className="text-muted-foreground hover:text-brand-red text-sm font-medium transition-colors"
                                            >
                                                Aktifkan
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(period)}
                                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                            >
                                                <Edit size={18} className="text-muted-foreground" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(period)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} className="text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6">
                            {editingPeriod ? 'Edit Periode' : 'Tambah Periode'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tahun Periode</label>
                                <input
                                    type="text"
                                    value={data.year}
                                    onChange={e => setData('year', e.target.value)}
                                    placeholder="2024/2025"
                                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                />
                                {errors.year && <p className="text-red-600 text-sm mt-1">{errors.year}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Hero Background Image</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('hero_image', e.target.files[0])}
                                        className="hidden"
                                        id="hero-upload"
                                    />
                                    <label
                                        htmlFor="hero-upload"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors"
                                    >
                                        <Upload size={20} className="text-muted-foreground" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.hero_image ? data.hero_image.name : 'Upload gambar'}
                                        </span>
                                    </label>
                                </div>
                                {errors.hero_image && <p className="text-red-600 text-sm mt-1">{errors.hero_image}</p>}
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 text-brand-red rounded focus:ring-brand-red/20"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium">
                                    Jadikan periode aktif
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2.5 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-2">Hapus Periode?</h3>
                        <p className="text-muted-foreground mb-6">
                            Apakah Anda yakin ingin menghapus periode <strong>{periodToDelete?.year}</strong>?
                            Semua divisi dan anggota di periode ini juga akan terhapus.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />;
