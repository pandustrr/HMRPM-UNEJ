import { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Plus, Trash2, Upload, Users, Edit as EditIcon } from "lucide-react";
import MemberModal from "../Members/Modal-Member";

export default function Edit({ division }) {
    const { data, setData, post, processing, errors } = useForm({
        name: division.name || '',
        short_desc: division.short_desc || '',
        description: division.description || '',
        color: '#dc2626', // Standardize to Brand Red
        icon_image: null,
        image: null,
    });

    // Member Creation Modal State & Form
    const [showMemberModal, setShowMemberModal] = useState(false);
    const memberForm = useForm({
        division_id: division.id,
        period_id: division.period_id,
        name: '',
        role: '',
        prodi: '',
        angkatan: '',
        photo: null,
        video: null,
        instagram: '',
        linkedin: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('short_desc', data.short_desc);
        formData.append('description', data.description);
        formData.append('color', data.color);

        if (data.icon_image) {
            formData.append('icon_image', data.icon_image);
        }
        if (data.image) {
            formData.append('image', data.image);
        }

        post(`/admin/divisions/${division.id}`, {
            data: formData,
            forceFormData: true,
        });
    };

    const handleDeleteMember = (member) => {
        if (confirm(`Hapus anggota ${member.name}?`)) {
            router.delete(`/admin/members/${member.id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        memberForm.post('/admin/members', {
            onSuccess: () => {
                setShowMemberModal(false);
                memberForm.reset();
            },
        });
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Divisi */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 space-y-6 shadow-sm">
                            <h2 className="text-xl font-bold">Informasi Divisi</h2>

                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Divisi</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    value={data.short_desc}
                                    onChange={e => setData('short_desc', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                />
                                {errors.short_desc && <p className="text-red-600 text-sm mt-1">{errors.short_desc}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Deskripsi Lengkap</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                />
                                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Icon Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('icon_image', e.target.files[0])}
                                        className="hidden"
                                        id="icon-upload"
                                    />
                                    <label
                                        htmlFor="icon-upload"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors"
                                    >
                                        <Upload size={20} className="text-muted-foreground" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.icon_image ? data.icon_image.name : 'Upload icon'}
                                        </span>
                                    </label>
                                    {division.icon_image && !data.icon_image && (
                                        <img src={division.icon_image} alt="Current icon" className="mt-2 h-16 w-16 object-cover rounded-lg shadow-sm border border-border" />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Background Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors"
                                    >
                                        <Upload size={20} className="text-muted-foreground" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.image ? data.image.name : 'Upload background'}
                                        </span>
                                    </label>
                                    {division.image && !data.image && (
                                        <img src={division.image} alt="Current bg" className="mt-2 h-16 w-auto object-cover rounded-lg shadow-sm border border-border" />
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Link
                                    href={`/admin/divisions?period_id=${division.period_id}`}
                                    className="flex-1 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl font-medium text-center transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 shadow-lg shadow-red-100"
                                >
                                    <Save size={18} />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Anggota Divisi */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Users size={24} className="text-brand-red" />
                                    Anggota Divisi
                                </h2>
                                <button
                                    onClick={() => setShowMemberModal(true)}
                                    className="p-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-red-100"
                                    title="Tambah Anggota"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {division.members && division.members.length > 0 ? (
                                    division.members.map(member => (
                                        <div key={member.id} className="group flex items-center justify-between p-3 bg-muted/40 hover:bg-muted/70 border border-border/50 rounded-2xl transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-border/50">
                                                    <img
                                                        src={member.photo || '/storage/logo/hmrpm.png'}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-foreground leading-tight">{member.name}</p>
                                                    <p className="text-[10px] font-bold text-brand-red uppercase tracking-wider mt-0.5">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/members/${member.id}/edit`}
                                                    className="p-2 hover:bg-white/80 rounded-xl transition-colors text-muted-foreground hover:text-foreground"
                                                    title="Edit Anggota"
                                                >
                                                    <EditIcon size={16} />
                                                </Link>
                                                <button
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
                                    <div className="text-center py-10 px-4">
                                        <Users size={40} className="mx-auto text-muted-foreground opacity-20 mb-3" />
                                        <p className="text-sm text-muted-foreground font-medium underline underline-offset-4 decoration-muted/30">Belum ada anggota</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Anggota */}
            <MemberModal
                show={showMemberModal}
                onClose={() => setShowMemberModal(false)}
                form={{
                    data: memberForm.data,
                    setData: memberForm.setData,
                    errors: memberForm.errors,
                    processing: memberForm.processing,
                    handleSubmit: handleAddMember
                }}
                divisionName={division.name}
                periodYear={division.period?.year}
            />
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} />;
