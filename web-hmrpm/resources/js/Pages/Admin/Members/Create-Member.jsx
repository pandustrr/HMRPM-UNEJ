import { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Save,
    Upload,
    User,
    Video,
    Instagram,
    Linkedin,
    Mail,
    ChevronDown
} from "lucide-react";

export default function Create({ periods, prefill }) {
    const { data, setData, post, processing, errors } = useForm({
        division_id: prefill?.division_id || '',
        period_id: prefill?.period_id || periods[0]?.id || '',
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

    const [availableDivisions, setAvailableDivisions] = useState([]);

    useEffect(() => {
        const period = periods.find(p => p.id === parseInt(data.period_id));
        if (period) {
            setAvailableDivisions(period.divisions || []);
        } else {
            setAvailableDivisions([]);
        }
    }, [data.period_id, periods]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/members');
    };

    return (
        <>
            <Head title="Tambah Pengurus" />

            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/members"
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Tambah Pengurus</h1>
                        {prefill?.period_year && prefill?.division_name ? (
                            <p className="text-brand-red font-bold mt-1">
                                {prefill.period_year} <span className="text-muted-foreground/30 mx-2">·</span> Divisi {prefill.division_name}
                            </p>
                        ) : (
                            <p className="text-muted-foreground mt-1">Tambahkan anggota pengurus baru ke divisi</p>
                        )}
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
                                        placeholder="Contoh: Budi Santoso"
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
                                        placeholder="Contoh: Ketua Divisi"
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
                                        placeholder="Contoh: Teknik Informatika"
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
                                        placeholder="Contoh: 2022"
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
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <Linkedin size={14} /> LinkedIn URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.linkedin}
                                        onChange={e => setData('linkedin', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                        placeholder="https://linkedin.com/in/..."
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
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Organization & Media */}
                    <div className="space-y-6">
                        {!prefill?.division_id && !prefill?.period_id && (
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
                        )}

                        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
                            <h2 className="font-bold text-foreground">Media</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <User size={14} /> Foto Profil (Max 2MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('photo', e.target.files[0])}
                                        className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-brand-red/10 file:text-brand-red hover:file:bg-brand-red/20 cursor-pointer"
                                    />
                                    {errors.photo && <p className="text-red-600 text-xs font-medium">{errors.photo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Video size={14} /> Video Hover (Max 10MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={e => setData('video', e.target.files[0])}
                                        className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-brand-red/10 file:text-brand-red hover:file:bg-brand-red/20 cursor-pointer"
                                    />
                                    {errors.video && <p className="text-red-600 text-xs font-medium">{errors.video}</p>}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-red text-white rounded-2xl font-black text-lg hover:bg-brand-red/90 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
                        >
                            <Save size={20} />
                            {processing ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
