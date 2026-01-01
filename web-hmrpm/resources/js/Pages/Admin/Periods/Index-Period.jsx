import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Calendar, Check, Upload, Eye } from "lucide-react";

export default function Index({ periods }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [periodToDelete, setPeriodToDelete] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        year: '',
        is_active: false,
        is_archived: false,
        hero_image: null,
        hero_type: 'image',
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
            is_archived: period.is_archived,
            hero_image: null,
            hero_type: period.hero_type || 'image',
            theme_color: period.theme_color || 'bg-brand-red'
        });
        setEditingPeriod(period);
        setShowModal(true);
    };

    const toggleArchive = (period) => {
        router.put(`/admin/periods/${period.id}`, {
            year: period.year,
            is_archived: !period.is_archived,
            is_active: !period.is_archived ? false : period.is_active, // Deactivate if archiving
            theme_color: period.theme_color,
            hero_type: period.hero_type
        });
    };

    const toggleActive = (period) => {
        router.post(`/admin/periods/${period.id}/toggle-active`, {}, {
            preserveScroll: true
        });
    };

    const setAsActive = (period) => {
        // Now it's just a toggle or activation, doesn't deactivate others
        router.put(`/admin/periods/${period.id}`, {
            year: period.year,
            is_active: !period.is_active,
            is_archived: false,
            theme_color: period.theme_color,
            hero_type: period.hero_type
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('year', data.year);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('is_archived', data.is_archived ? '1' : '0');
        formData.append('hero_type', data.hero_type);
        formData.append('theme_color', data.theme_color);

        if (data.hero_image instanceof File) {
            formData.append('hero_image', data.hero_image);
        }

        if (editingPeriod) {
            formData.append('_method', 'PUT');
            router.post(`/admin/periods/${editingPeriod.id}`, formData, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        } else {
            router.post('/admin/periods', formData, {
                preserveScroll: true,
                forceFormData: true,
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

    const handleShowDetail = (period) => {
        setSelectedPeriod(period);
        setShowDetailModal(true);
    };

    return (
        <>
            <Head title="Kelola Periode" />

            <div className="p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-foreground">Kelola Periode</h1>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">Atur periode kepengurusan dan background hero</p>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="flex items-center justify-center sm:justify-start gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors w-full sm:w-auto"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Tambah Periode</span>
                        <span className="sm:hidden">Tambah</span>
                    </button>
                </div>

                {/* Periods List - Responsive Table/Cards */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                                <tr>
                                    <th className="text-left px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Periode</th>
                                    <th className="text-left px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Hero Image</th>
                                    <th className="text-center px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Status</th>
                                    <th className="text-right px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {periods.map(period => (
                                    <tr key={period.id} className="hover:bg-linear-to-r hover:from-brand-red/5 hover:to-transparent transition-colors duration-200">
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-brand-red/10 rounded-lg">
                                                    <Calendar size={18} className="text-brand-red" />
                                                </div>
                                                <span className="font-bold text-foreground">{period.year}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            {period.hero_image ? (
                                                <div className="h-12 w-20 rounded-lg overflow-hidden border border-border shadow-sm">
                                                    {period.hero_type === 'video' ? (
                                                        <video src={period.hero_image} className="w-full h-full object-cover" muted />
                                                    ) : (
                                                        <img
                                                            src={period.hero_image}
                                                            alt="Hero"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="h-12 w-20 rounded-lg bg-muted/50 flex items-center justify-center border border-dashed border-border">
                                                    <span className="text-xs text-muted-foreground font-medium">Kosong</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex flex-col items-center gap-1">
                                                {period.is_active ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase tracking-widest border border-emerald-200 shadow-sm">
                                                        AKTIF
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-brand-red/10 text-brand-red uppercase tracking-widest border border-brand-red/20 shadow-sm">
                                                        DIARSIPKAN
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleActive(period)}
                                                    className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest shadow-lg active:scale-95 ${period.is_active
                                                        ? 'border-brand-red bg-brand-red text-white shadow-brand-red/20'
                                                        : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
                                                        }`}
                                                    title={period.is_active ? "Arsipkan periode" : "Aktifkan periode"}
                                                >
                                                    {period.is_active ? 'ARSIPKAN' : 'AKTIFKAN'}
                                                </button>
                                                <div className="w-px h-6 bg-border mx-1" />
                                                <button
                                                    onClick={() => handleShowDetail(period)}
                                                    className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                                    title="Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(period)}
                                                    className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(period)}
                                                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View - Card Layout */}
                    <div className="md:hidden divide-y divide-border">
                        {periods.map(period => (
                            <div key={period.id} className="p-4 space-y-4 hover:bg-brand-red/5 transition-colors duration-200">
                                {/* Periode */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-brand-red/10 rounded-lg">
                                            <Calendar size={16} className="text-brand-red" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Periode</p>
                                            <p className="font-bold text-foreground">{period.year}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Hero Image</p>
                                    {period.hero_image ? (
                                        <img
                                            src={period.hero_image}
                                            alt="Hero"
                                            className="w-full h-32 object-cover rounded-lg border border-border shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-full h-32 rounded-lg bg-muted/50 flex items-center justify-center border border-dashed border-border">
                                            <span className="text-xs text-muted-foreground font-medium">Tidak ada gambar</span>
                                        </div>
                                    )}
                                </div>

                                {/* Status & Actions */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Status & Aksi</p>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => toggleActive(period)}
                                                className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-md ${period.is_active
                                                    ? 'bg-brand-red text-white'
                                                    : 'bg-emerald-500 text-white'
                                                    }`}
                                            >
                                                {period.is_active ? 'ARSIPKAN' : 'AKTIFKAN'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleShowDetail(period)}
                                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                            title="Detail"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => openEditModal(period)}
                                            className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(period)}
                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Tipe Background</label>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {[
                                        { id: 'image', label: 'Gambar' },
                                        { id: 'video', label: 'Video (MP4/GIF)' },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setData('hero_type', type.id)}
                                            className={`py-2 px-4 rounded-xl border-2 font-bold text-sm transition-all ${data.hero_type === type.id
                                                ? 'border-brand-red bg-brand-red/5 text-brand-red'
                                                : 'border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground/30'
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>

                                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">File Background</label>

                                {/* Preview gambar yang sudah ada saat edit */}
                                {editingPeriod && editingPeriod.hero_image && !data.hero_image && (
                                    <div className="space-y-2 mb-4">
                                        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-border shadow-md aspect-video bg-muted/30">
                                            {editingPeriod.hero_type === 'video' ? (
                                                <video
                                                    src={editingPeriod.hero_image}
                                                    className="w-full h-full object-cover"
                                                    autoPlay muted loop playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={editingPeriod.hero_image}
                                                    alt="Hero Current"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-brand-red/90 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                Aktif
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* File Preview for new selection */}
                                {data.hero_image && (
                                    <div className="space-y-2 mb-4">
                                        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-brand-red/30 shadow-md aspect-video bg-muted/30">
                                            {data.hero_type === 'video' ? (
                                                <video
                                                    src={URL.createObjectURL(data.hero_image)}
                                                    className="w-full h-full object-cover"
                                                    autoPlay muted loop playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={URL.createObjectURL(data.hero_image)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500/90 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                Baru
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="relative">
                                    <input
                                        type="file"
                                        accept={data.hero_type === 'video' ? 'video/mp4' : 'image/*'}
                                        onChange={e => setData('hero_image', e.target.files[0])}
                                        className="hidden"
                                        id="hero-upload"
                                    />
                                    <label
                                        htmlFor="hero-upload"
                                        className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-brand-red/5 hover:border-brand-red/30 transition-all group"
                                    >
                                        <Upload size={20} className="text-muted-foreground group-hover:text-brand-red" />
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-foreground group-hover:text-brand-red">
                                                {data.hero_image ? 'Ganti file terpilih' : 'Unggah file baru'}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground font-medium">
                                                Maksimal 20MB (.mp4, .jpg, .png, .gif)
                                            </p>
                                        </div>
                                    </label>
                                </div>
                                {errors.hero_image && <p className="text-red-600 text-sm mt-2 font-bold italic">{errors.hero_image}</p>}
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 text-brand-red rounded focus:ring-brand-red/20"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-foreground">
                                        Aktifkan Periode <span className="text-xs text-muted-foreground font-medium">(Muncul di dropdown publik)</span>
                                    </label>
                                </div>
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

            {/* Detail Modal */}
            {showDetailModal && selectedPeriod && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-brand-red/10 rounded-lg">
                                <Calendar size={24} className="text-brand-red" />
                            </div>
                            <h3 className="text-2xl font-bold">Detail Periode</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Periode Info */}
                            <div>
                                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Tahun Periode</label>
                                <p className="text-lg font-bold text-foreground">{selectedPeriod.year}</p>
                            </div>

                            {/* Hero Image */}
                            <div>
                                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Hero Background ({selectedPeriod.hero_type})</label>
                                {selectedPeriod.hero_image ? (
                                    <div className="space-y-2">
                                        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-md bg-muted/30">
                                            {selectedPeriod.hero_type === 'video' ? (
                                                <video
                                                    src={selectedPeriod.hero_image}
                                                    className="w-full h-full object-cover"
                                                    autoPlay muted loop playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={selectedPeriod.hero_image}
                                                    alt="Hero"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-48 rounded-xl bg-muted/50 border border-dashed border-border flex items-center justify-center">
                                        <p className="text-muted-foreground font-medium">Tidak ada gambar</p>
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            {/* <div>
                                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Status</label>
                                <div className="flex flex-col gap-1">
                                    {selectedPeriod.is_active ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 uppercase tracking-widest border border-emerald-200">
                                            AKTIF
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black bg-brand-red/10 text-brand-red uppercase tracking-widest border border-brand-red/20">
                                            DIARSIPKAN
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => toggleActive(selectedPeriod)}
                                    className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest shadow-md active:scale-95 ${selectedPeriod.is_active
                                        ? 'bg-brand-red text-white'
                                        : 'bg-emerald-500 text-white'
                                        }`}
                                >
                                    {selectedPeriod.is_active ? 'ARSIPKAN' : 'AKTIFKAN'}
                                </button>
                            </div> */}

                            {/* Created At */}
                            <div>
                                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Dibuat Pada</label>
                                <p className="text-sm text-foreground">{new Date(selectedPeriod.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            {/* Close Button */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-bold transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />;
