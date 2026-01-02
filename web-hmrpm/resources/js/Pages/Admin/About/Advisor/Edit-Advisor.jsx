import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Save, ChevronLeft, Upload, AlertCircle, User, Info, MapPin, Phone, Mail, Video } from "lucide-react";
import { useState } from "react";

const EditAdvisor = ({ advisor }) => {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        type: advisor.type || 'pembina',
        name: advisor.name || '',
        nidn: advisor.nidn || '',
        nip_nik: advisor.nip_nik || '',
        birth_place: advisor.birth_place || '',
        birth_date: advisor.birth_date ? advisor.birth_date.split('T')[0] : '',
        gender: advisor.gender || 'Laki-laki',
        religion: advisor.religion || '',
        rank: advisor.rank || '',
        position: advisor.position || '',
        university: advisor.university || 'Universitas Jember',
        address: advisor.address || '',
        phone_office: advisor.phone_office || '',
        address_home: advisor.address_home || '',
        phone_home: advisor.phone_home || '',
        email: advisor.email || '',
        image: null,
        video: null,
        is_active: !!advisor.is_active,
        _method: 'PUT'
    });

    const [preview, setPreview] = useState(advisor.image || null);
    const [videoPreview, setVideoPreview] = useState(advisor.video || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('video', file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/advisors/${advisor.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${advisor.name} | HMRPM Admin`} />
            <div className="max-w-4xl mx-auto space-y-6 pb-12 text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/advisors"
                            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-red transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase truncate max-w-md">Edit: {advisor.name}</h1>
                            <p className="text-slate-500 text-xs font-medium">Perbarui informasi Pembina atau Pendamping.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Photo & Type */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-4xl border border-slate-200 p-6 shadow-sm space-y-5">
                            <div className="space-y-4">
                                <label className="block text-slate-700 text-xs font-black uppercase tracking-widest">Tipe & Status</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setData('type', 'pembina')}
                                        className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${data.type === 'pembina' ? 'border-brand-red bg-brand-red/5 text-brand-red' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                                    >
                                        Pembina
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('type', 'pendamping')}
                                        className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${data.type === 'pendamping' ? 'border-brand-yellow bg-brand-yellow/5 text-brand-yellow' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                                    >
                                        Pendamping
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="font-bold text-slate-600 text-sm">Status Aktif</span>
                                    <button
                                        type="button"
                                        onClick={() => setData('is_active', !data.is_active)}
                                        className={`w-12 h-6 rounded-full relative transition-colors ${data.is_active ? 'bg-green-500' : 'bg-slate-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${data.is_active ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest text-center">Foto Profil</label>
                                <div className="relative group mx-auto w-36 h-48">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />
                                    <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 group-hover:border-brand-red/50 bg-slate-50 group-hover:bg-brand-red/5 transition-all overflow-hidden flex flex-col items-center justify-center gap-3">
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload size={24} className="text-slate-300 group-hover:text-brand-red" />
                                                <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-brand-red text-center px-4 tracking-tighter">Pilih Foto</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl pointer-events-none text-center p-4">
                                        <span className="text-white font-black text-[10px] uppercase tracking-widest">Ganti Foto Baru</span>
                                    </div>
                                </div>
                                {errors.image && <p className="text-brand-red text-[10px] font-bold text-center">{errors.image}</p>}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                    <Video size={12} /> Video Hover (MP4)
                                </label>
                                <div className="relative group mx-auto w-36 h-48">
                                    <input
                                        type="file"
                                        onChange={handleVideoChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="video/mp4"
                                    />
                                    <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 group-hover:border-brand-red/50 bg-slate-50 group-hover:bg-brand-red/5 transition-all flex flex-col items-center justify-center gap-3 overflow-hidden">
                                        {videoPreview ? (
                                            <video src={videoPreview} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                                        ) : (
                                            <>
                                                <Upload size={24} className="text-slate-300 group-hover:text-brand-red" />
                                                <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-brand-red tracking-tighter text-center px-4">Pilih Video</span>
                                            </>
                                        )}
                                    </div>
                                    {videoPreview && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl pointer-events-none">
                                            <span className="text-white font-black text-[10px] uppercase tracking-widest">Ganti Video</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[9px] text-slate-400 text-center font-medium uppercase tracking-tight">Ganti video? Pilih file baru (Maks. 10MB)</p>
                                {errors.video && <p className="text-brand-red text-[10px] font-bold text-center">{errors.video}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-brand-red text-white rounded-2xl font-black transition-all shadow-xl hover:shadow-brand-red/20 disabled:opacity-50 group tracking-widest text-sm"
                        >
                            <Save size={18} className="group-hover:scale-110 transition-transform" />
                            {processing ? 'MENYIMPAN...' : 'PERBARUI DATA'}
                        </button>
                    </div>

                    {/* Right Column: Detailed Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Section 1: Identitas Dasar */}
                        <div className="bg-white rounded-4xl border border-slate-200 p-6 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-brand-red/5 flex items-center justify-center text-brand-red">
                                    <Info size={16} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 tracking-widest uppercase">Identitas & Jabatan</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Nama Lengkap & Gelar"
                                    value={data.name}
                                    onChange={(val) => setData('name', val)}
                                    error={errors.name}
                                    placeholder="Contoh: Ir. Robertus Sidartawan, S.T., M.T., IPM"
                                    fullWidth
                                />
                                <InputField
                                    label="NIDN"
                                    value={data.nidn}
                                    onChange={(val) => setData('nidn', val)}
                                    error={errors.nidn}
                                    placeholder="Nomor Induk Dosen Nasional"
                                />
                                <InputField
                                    label="NIP / NIK"
                                    value={data.nip_nik}
                                    onChange={(val) => setData('nip_nik', val)}
                                    error={errors.nip_nik}
                                    placeholder="NIP atau NIK"
                                />
                                <InputField
                                    label="Jabatan"
                                    value={data.position}
                                    onChange={(val) => setData('position', val)}
                                    error={errors.position}
                                    placeholder="Contoh: Kaprodi / Dosen"
                                />
                                <InputField
                                    label="Pangkat / Golongan"
                                    value={data.rank}
                                    onChange={(val) => setData('rank', val)}
                                    error={errors.rank}
                                    placeholder="Contoh: Penata / IIId"
                                />
                                <InputField
                                    label="Institusi / PT"
                                    value={data.university}
                                    onChange={(val) => setData('university', val)}
                                    error={errors.university}
                                    placeholder="Contoh: Universitas Jember"
                                />
                                <div className="space-y-2">
                                    <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">Jenis Kelamin</label>
                                    <select
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="w-full h-10 bg-slate-50 border border-slate-100 rounded-xl px-4 font-bold text-slate-700 focus:border-brand-red outline-hidden transition-all text-xs"
                                    >
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <InputField
                                    label="Agama"
                                    value={data.religion}
                                    onChange={(val) => setData('religion', val)}
                                    error={errors.religion}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                                <InputField
                                    label="Tempat Lahir"
                                    value={data.birth_place}
                                    onChange={(val) => setData('birth_place', val)}
                                    error={errors.birth_place}
                                />
                                <InputField
                                    label="Tanggal Lahir"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(val) => setData('birth_date', val)}
                                    error={errors.birth_date}
                                />
                            </div>
                        </div>

                        {/* Section 2: Kontak & Alamat */}
                        <div className="bg-white rounded-4xl border border-slate-200 p-6 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-brand-yellow/5 flex items-center justify-center text-brand-yellow">
                                    <MapPin size={16} />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 tracking-widest uppercase">Kontak & Alamat</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField
                                        label="E-mail"
                                        type="email"
                                        value={data.email}
                                        onChange={(val) => setData('email', val)}
                                        error={errors.email}
                                        placeholder="Alamat E-mail Aktif"
                                    />
                                    <InputField
                                        label="Telp. / HP (Pribadi)"
                                        value={data.phone_home}
                                        onChange={(val) => setData('phone_home', val)}
                                        error={errors.phone_home}
                                        placeholder="Nomor Telepon Pribadi"
                                    />
                                    <InputField
                                        label="Telp. / Faks (Kantor)"
                                        value={data.phone_office}
                                        onChange={(val) => setData('phone_office', val)}
                                        error={errors.phone_office}
                                        placeholder="Nomor Telepon Kantor"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">Alamat Kantor / PT</label>
                                        <textarea
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows="2"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-4xl p-3 font-medium text-slate-700 focus:border-brand-red outline-hidden transition-all text-xs"
                                            placeholder="Alamat kantor lengkap..."
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">Alamat Rumah</label>
                                        <textarea
                                            value={data.address_home}
                                            onChange={(e) => setData('address_home', e.target.value)}
                                            rows="2"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-4xl p-3 font-medium text-slate-700 focus:border-brand-yellow outline-hidden transition-all text-xs"
                                            placeholder="Alamat rumah lengkap (bisa beberapa baris)..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

const InputField = ({ label, value, onChange, error, type = "text", placeholder = "", fullWidth = false }) => (
    <div className={`space-y-2 ${fullWidth ? 'md:col-span-2' : ''}`}>
        <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 bg-slate-50 border border-slate-100 rounded-xl px-4 font-bold text-slate-900 placeholder:text-slate-300 focus:border-brand-red outline-hidden transition-all text-xs"
        />
        {error && <p className="text-brand-red text-[10px] font-bold px-1 flex items-center gap-1"><AlertCircle size={10} /> {error}</p>}
    </div>
);

EditAdvisor.layout = (page) => <AdminLayout children={page} />;

export default EditAdvisor;
