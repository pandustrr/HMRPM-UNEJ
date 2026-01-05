import { useState, useEffect } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Save,
    Upload,
    User,
    Video,
    Instagram,
    Mail,
    ChevronDown,
    Trash2,
    Scissors
} from "lucide-react";
import ImageCropper from "@/Components/ImageCropper";

export default function Edit({ member, periods, filter_division_id }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        division_id: member.division_id || '',
        period_id: member.division?.period_id || periods[0]?.id || '',
        filter_division_id: filter_division_id || '',
        division_id_source: new URLSearchParams(window.location.search).get('division_id_source') || '',
        name: member.name || '',
        role: member.role || '',
        prodi: member.prodi || '',
        angkatan: member.angkatan || '',
        photo: null,
        video: null,
        instagram: member.instagram || '',
        email: member.email || '',
    });

    const [availableDivisions, setAvailableDivisions] = useState([]);
    const [showCropper, setShowCropper] = useState(false);
    const [masterBackgroundSource, setMasterBackgroundSource] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [cropperKey, setCropperKey] = useState(0);

    // Update previewUrl whenever data.photo changes
    useEffect(() => {
        if (!data.photo) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(data.photo);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [data.photo]);

    useEffect(() => {
        const period = periods.find(p => p.id === parseInt(data.period_id));
        if (period) {
            setAvailableDivisions(period.divisions || []);
        } else {
            setAvailableDivisions([]);
        }
    }, [data.period_id, periods]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onload = () => {
                setMasterBackgroundSource(reader.result);
                setCropperKey(prev => prev + 1);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedFile) => {
        setData('photo', croppedFile);
        setShowCropper(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/members/${member.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${member.name}`} />

            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={data.division_id_source ? `/admin/divisions/${data.division_id_source}/edit` : `/admin/divisions?period_id=${data.period_id}&show_all_members=1`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Edit Pengurus</h1>
                        <p className="text-muted-foreground mt-1">Perbarui data anggota pengurus</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-border p-6 ml-1 space-y-6 shadow-sm">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <User size={20} className="text-brand-red" />
                                Informasi Pribadi
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                    {errors.name && <p className="text-red-600 text-xs font-medium">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Role / Jabatan</label>
                                    <input
                                        type="text"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                    {errors.role && <p className="text-red-600 text-xs font-medium">{errors.role}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Program Studi</label>
                                    <input
                                        type="text"
                                        value={data.prodi}
                                        onChange={e => setData('prodi', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                    {errors.prodi && <p className="text-red-600 text-xs font-medium">{errors.prodi}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Angkatan</label>
                                    <input
                                        type="text"
                                        value={data.angkatan}
                                        onChange={e => setData('angkatan', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                    {errors.angkatan && <p className="text-red-600 text-xs font-medium">{errors.angkatan}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Mail size={20} className="text-brand-red" />
                                Hubungan & Media Sosial
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <Instagram size={14} /> Instagram URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.instagram}
                                        onChange={e => setData('instagram', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <Mail size={14} /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Organization & Media */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
                            <h2 className="font-bold text-foreground">Organisasi</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Periode</label>
                                    <div className="relative">
                                        <select
                                            value={data.period_id}
                                            onChange={e => setData('period_id', e.target.value)}
                                            className="w-full appearance-none bg-muted/30 border border-border rounded-xl px-4 py-2.5 pr-10 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                        >
                                            {periods.map(p => (
                                                <option key={p.id} value={p.id}>{p.year}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Divisi</label>
                                    <div className="relative">
                                        <select
                                            value={data.division_id}
                                            onChange={e => setData('division_id', e.target.value)}
                                            className="w-full appearance-none bg-muted/30 border border-border rounded-xl px-4 py-2.5 pr-10 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                        >
                                            <option value="">Pilih Divisi</option>
                                            {availableDivisions.map(d => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                                    </div>
                                    {errors.division_id && <p className="text-red-600 text-xs font-medium">{errors.division_id}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-border p-4 shadow-sm space-y-4">
                            <h2 className="font-bold text-foreground">Media</h2>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Unified Photo Management */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <User size={14} /> Foto Profil (Max 2MB)
                                    </label>

                                    {/* Card Preview Container matching Divisi style */}
                                    <div className="group relative h-64 w-full max-w-[160px] mx-auto bg-card rounded-3xl overflow-hidden border border-border shadow-md">
                                        {/* Priority: New Preview -> Existing Member Photo -> Placeholder */}
                                        {(previewUrl || member.photo) ? (
                                            <>
                                                <img
                                                    src={previewUrl || member.photo}
                                                    alt={member.name}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                                                    onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                />

                                                {/* Top Right Controls */}
                                                <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    {data.photo && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowCropper(true)}
                                                            className="p-2 bg-brand-red text-white backdrop-blur-md rounded-xl transition-all shadow-xl hover:bg-brand-red/90 hover:scale-110 active:scale-95 group/btn"
                                                            title="Potong Gambar"
                                                        >
                                                            <Scissors size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                        </button>
                                                    )}

                                                    <label
                                                        htmlFor="photo-upload"
                                                        className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-all cursor-pointer border border-white/20 shadow-xl group/upload"
                                                        title="Ganti Foto"
                                                    >
                                                        <Upload size={16} className="group-hover/upload:rotate-12 transition-transform" />
                                                    </label>
                                                </div>
                                            </>
                                        ) : (
                                            <label
                                                htmlFor="photo-upload"
                                                className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer hover:bg-muted/30 transition-colors group"
                                            >
                                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                                                    <Upload size={24} className="text-muted-foreground" />
                                                </div>
                                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Upload Foto</span>
                                            </label>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        id="photo-upload"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    {errors.photo && <p className="text-red-600 text-xs font-medium mt-2">{errors.photo}</p>}
                                </div>

                                {/* Video Preview & Drop Zone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Video size={14} /> Video Hover (Max 10MB)
                                    </label>

                                    <div className="group relative h-64 w-full max-w-[160px] mx-auto bg-card rounded-3xl overflow-hidden border border-border shadow-md">
                                        {(data.video || member.video) ? (
                                            <>
                                                <video
                                                    src={data.video ? (data.video instanceof File ? URL.createObjectURL(data.video) : data.video) : member.video}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />

                                                {/* Top Right Controls */}
                                                <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <label
                                                        htmlFor="video-upload"
                                                        className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-all cursor-pointer border border-white/20 shadow-xl group/upload"
                                                        title="Ganti Video"
                                                    >
                                                        <Upload size={16} className="group-hover/upload:rotate-12 transition-transform" />
                                                    </label>
                                                </div>
                                            </>
                                        ) : (
                                            <label
                                                htmlFor="video-upload"
                                                className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer hover:bg-muted/30 transition-colors group border-2 border-dashed border-border/50 hover:border-brand-red/50 bg-muted/5"
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    const files = e.dataTransfer.files;
                                                    if (files && files.length > 0 && files[0].type.startsWith('video/')) {
                                                        setData('video', files[0]);
                                                    }
                                                }}
                                            >
                                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                                                    <Video size={24} className="text-muted-foreground group-hover:text-brand-red transition-colors" />
                                                </div>
                                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-brand-red transition-colors">
                                                    Drag & Drop Video
                                                </span>
                                                <span className="text-[10px] text-muted-foreground/50 font-medium">
                                                    atau klik untuk memilih
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        id="video-upload"
                                        accept="video/*"
                                        onChange={e => setData('video', e.target.files[0])}
                                        className="hidden"
                                    />
                                    {errors.video && <p className="text-red-600 text-xs font-medium mt-2">{errors.video}</p>}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-red text-white rounded-xl font-bold text-sm hover:bg-brand-red/90 transition-all shadow-md shadow-red-200 disabled:opacity-50"
                        >
                            <Save size={18} />
                            {processing ? 'Menyimpan...' : 'Perbarui Data'}
                        </button>
                    </div>
                </form>

                {showCropper && (
                    <ImageCropper
                        key={`cropper-${cropperKey}`}
                        image={masterBackgroundSource}
                        aspectRatio={9 / 16}
                        onCropComplete={handleCropComplete}
                        onCancel={() => setShowCropper(false)}
                    />
                )}
            </div>
        </>
    );
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
