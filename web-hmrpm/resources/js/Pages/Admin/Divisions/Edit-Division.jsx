import { useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Plus, Trash2, Upload, Users, Edit as EditIcon, Eye } from "lucide-react";
import ImageCropper from "@/Components/ImageCropper";
import Detail from "@/Pages/Admin/Members/Detail-Member";

export default function Edit({ division }) {
    const { data, setData, post, processing, errors } = useForm({
        name: division.name || '',
        short_desc: division.short_desc || '',
        description: division.description || '',
        color: division.color || '#dc2626',
        icon_image: null,
        image: null,
    });

    const [showCropper, setShowCropper] = useState(false);
    const [masterBackgroundSource, setMasterBackgroundSource] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [cropperKey, setCropperKey] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    // Update previewUrl whenever data.image changes (to show result in form)
    useEffect(() => {
        if (!data.image) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(data.image);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [data.image]);

    // Initialize originalImageSource from division.image on mount
    useEffect(() => {
        // Cleanup if needed
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                setMasterBackgroundSource(result);
                setCropperKey(prev => prev + 1);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedFile) => {
        setData('image', croppedFile);
        setShowCropper(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('short_desc', data.short_desc);
        formData.append('description', data.description);
        formData.append('color', data.color);

        if (data.icon_image instanceof File) {
            formData.append('icon_image', data.icon_image);
        }

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        // Use router.post directly with proper headers
        router.post(`/admin/divisions/${division.id}`, formData, {
            preserveScroll: true,
            forceFormData: true,
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleDeleteMember = (member) => {
        setMemberToDelete(member);
        setShowDeleteModal(true);
    };

    const handleShowDetail = (member) => {
        setSelectedMember(member);
        setShowDetailModal(true);
    };

    const confirmDeleteMember = () => {
        if (memberToDelete) {
            router.delete(`/admin/members/${memberToDelete.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setMemberToDelete(null);
                }
            });
        }
    };

    return (
        <>
            <Head title={`Edit ${division.name}`} />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/admin/divisions?period_id=${division.period_id}`}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-foreground">Edit Divisi</h1>
                            <p className="text-muted-foreground mt-1">Perbarui informasi divisi dan kelola anggota</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informasi Divisi */}
                        <div className="bg-white rounded-2xl border border-border p-6 space-y-6 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground">Informasi Divisi</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">Nama Divisi</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-foreground"
                                        placeholder="Nama divisi"
                                    />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">Nama Lengkap Departemen</label>
                                    <input
                                        type="text"
                                        value={data.short_desc}
                                        onChange={e => setData('short_desc', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-foreground"
                                        placeholder="Penjelasan singkat fokus divisi"
                                    />
                                    {errors.short_desc && <p className="text-red-600 text-sm mt-1">{errors.short_desc}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">Deskripsi Lengkap</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-foreground"
                                        placeholder="Tuliskan tujuan, program kerja, atau detail lain dari divisi ini..."
                                    />
                                    {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Anggota Divisi */}
                        <div className="bg-white rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                                    <Users size={24} className="text-brand-red" />
                                    Anggota Divisi
                                </h2>
                                <Link
                                    href={`/admin/members/create?period_id=${division.period_id}&division_id=${division.id}&division_id_source=${division.id}`}
                                    className="p-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-red-100"
                                    title="Tambah Anggota"
                                >
                                    <Plus size={20} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {division.members && division.members.length > 0 ? (
                                    division.members.map(member => (
                                        <div key={member.id} className="group flex items-center justify-between p-3 bg-muted/20 hover:bg-muted/40 border border-border/50 rounded-2xl transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full overflow-hidden border border-border bg-white shrink-0">
                                                    <img
                                                        src={member.photo || '/storage/logo/hmrpm.png'}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm text-foreground leading-tight truncate">{member.name}</p>
                                                    <p className="text-[10px] font-bold text-brand-red uppercase tracking-wider mt-0.5">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleShowDetail(member)}
                                                    className="p-2 hover:bg-blue-50 rounded-xl transition-colors text-muted-foreground hover:text-blue-600"
                                                    title="Detail"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <Link
                                                    href={`/admin/members/${member.id}/edit?division_id_source=${division.id}`}
                                                    className="p-2 hover:bg-white rounded-xl transition-colors text-muted-foreground hover:text-foreground"
                                                    title="Edit Anggota"
                                                >
                                                    <EditIcon size={16} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteMember(member)}
                                                    className="p-2 hover:bg-red-50 rounded-xl transition-colors text-muted-foreground hover:text-red-600"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-10 px-4">
                                        <Users size={40} className="mx-auto text-muted-foreground opacity-20 mb-3" />
                                        <p className="text-sm text-muted-foreground font-medium underline underline-offset-4 decoration-muted/30">Belum ada anggota</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Uploads (Right) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-border p-6 space-y-6 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground">Media & Gaya</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">Icon Divisi (Transparent PNG)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('icon_image', e.target.files[0])}
                                        className="hidden"
                                        id="icon-upload"
                                    />
                                    <label
                                        htmlFor="icon-upload"
                                        className="flex flex-col items-center justify-center gap-2 w-full aspect-square border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/30 transition-colors group overflow-hidden"
                                    >
                                        {data.icon_image ? (
                                            <img
                                                src={URL.createObjectURL(data.icon_image)}
                                                className="w-full h-full object-contain p-4"
                                                alt="Preview"
                                            />
                                        ) : division.icon_image ? (
                                            <img
                                                src={division.icon_image}
                                                className="w-full h-full object-contain p-4"
                                                alt="Current"
                                            />
                                        ) : (
                                            <>
                                                <Upload size={24} className="text-muted-foreground group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-bold text-muted-foreground">Upload Icon</span>
                                            </>
                                        )}
                                    </label>
                                    {errors.icon_image && <p className="text-red-600 text-sm mt-1">{errors.icon_image}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">Background Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-border aspect-video bg-muted/5">
                                        {(data.image || division.image) ? (
                                            <>
                                                <img
                                                    src={previewUrl || division.image}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    alt="Preview"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-brand-red backdrop-blur-md rounded-xl text-white transition-all cursor-pointer border border-white/20 shadow-xl group/btn"
                                                    title="Ganti Gambar"
                                                >
                                                    <Upload size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                </label>
                                            </>
                                        ) : (
                                            <label
                                                htmlFor="image-upload"
                                                className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer hover:bg-muted/30 transition-colors group"
                                            >
                                                <Upload size={24} className="text-muted-foreground group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-black">Upload Background</span>
                                            </label>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground font-medium italic">* Rasio ideal 16:8 untuk tampilan bg di website.</p>
                                    <p className="text-[10px] text-muted-foreground font-medium italic">Untuk crop ulang gambar yang sudah disimpan, silakan upload ulang background terlebih dahulu.</p>
                                    {errors.image && <p className="text-red-600 text-sm mt-1 font-bold">{errors.image}</p>}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black transition-all disabled:opacity-50 shadow-xl shadow-red-100 uppercase tracking-wider"
                                >
                                    <Save size={20} />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                                <Link
                                    href={`/admin/divisions?period_id=${division.period_id}`}
                                    className="w-full block px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-2xl font-bold text-center transition-all"
                                >
                                    Batal
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>

                {showCropper && (
                    <ImageCropper
                        key={`cropper-${cropperKey}`}
                        image={masterBackgroundSource}
                        aspectRatio={16 / 8}
                        onCropComplete={handleCropComplete}
                        onCancel={() => {
                            setShowCropper(false);
                        }}
                    />
                )}
            </div>

            {/* Detail Modal */}
            <Detail
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                member={selectedMember}
            />

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <div className="p-2 bg-red-50 rounded-lg">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Hapus Anggota?</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Apakah Anda yakin ingin menghapus anggota <strong>{memberToDelete?.name}</strong>?
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setMemberToDelete(null);
                                }}
                                className="flex-1 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl font-bold transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteMember}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-200"
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

Edit.layout = page => <AdminLayout children={page} />;
