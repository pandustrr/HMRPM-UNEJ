import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Upload, Image as ImageIcon, Film, Save, AlertCircle, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";

const AboutIndex = ({ settings }) => {
    const { data, setData, post, processing, errors } = useForm({
        type: settings?.type || 'image',
        file: null,
    });

    const [preview, setPreview] = useState(settings?.value || null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/about', {
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        setIsConfirmOpen(false);
        router.delete('/admin/about', {
            onSuccess: () => {
                setPreview(null);
                setData('file', null);
            }
        });
    };

    return (
        <>
            <Head title="Pengaturan About | HMRPM Admin" />
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">PENGATURAN ABOUT</h1>
                    <p className="text-slate-500 font-medium">Kelola tampilan hero background halaman About (Video/Gambar/GIF).</p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Type Selection */}
                        <div className="space-y-4">
                            <label className="block text-slate-700 text-sm font-black uppercase tracking-widest">Tipe Background</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: 'image', label: 'Gambar', icon: ImageIcon },
                                    { id: 'video', label: 'Video (MP4/GIF)', icon: Film },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setData('type', type.id)}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${data.type === type.id
                                            ? 'border-brand-red bg-brand-red/5 text-brand-red shadow-lg shadow-brand-red/10'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                            }`}
                                    >
                                        <type.icon size={20} />
                                        <span className="font-bold">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-4">
                            <label className="block text-slate-700 text-sm font-black uppercase tracking-widest">Unggah File Baru</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept={data.type === 'video' ? 'video/mp4' : 'image/*'}
                                />
                                <div className="border-2 border-dashed border-slate-200 group-hover:border-brand-red/50 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 transition-all bg-slate-50 group-hover:bg-brand-red/5">
                                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-brand-red transition-all shadow-sm">
                                        <Upload size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-slate-900 font-bold">Pilih file atau tarik kesini</p>
                                        <p className="text-slate-500 text-sm">MP4, JPG, PNG, atau GIF (Maks. 20MB)</p>
                                    </div>
                                </div>
                            </div>
                            {errors.file && <p className="text-brand-red text-sm font-bold flex items-center gap-2 mt-2"><AlertCircle size={14} /> {errors.file}</p>}
                        </div>

                        {/* Preview */}
                        {preview && (
                            <div className="space-y-4">
                                <label className="block text-slate-700 text-sm font-black uppercase tracking-widest">Preview Saat Ini</label>
                                <div className="relative rounded-3xl overflow-hidden aspect-video border border-slate-200 shadow-inner bg-slate-100">
                                    {data.type === 'video' ? (
                                        <video src={preview} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                                    ) : (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute top-4 left-4 py-1 px-3 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                        Tampilan Aktif
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                            {settings && (
                                <button
                                    type="button"
                                    onClick={() => setIsConfirmOpen(true)}
                                    className="flex items-center gap-2 px-6 py-4 text-slate-500 hover:text-brand-red font-bold transition-all group"
                                >
                                    <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                    Hapus Background
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-brand-red text-white rounded-2xl font-black transition-all shadow-xl hover:shadow-brand-red/20 disabled:opacity-50 group ml-auto"
                            >
                                <Save size={20} className="group-hover:scale-110 transition-transform" />
                                {processing ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
                            </button>
                        </div>
                    </form>
                </div>

                <ConfirmModal
                    isOpen={isConfirmOpen}
                    title="Hapus Background?"
                    message="Apakah Anda yakin ingin menghapus background custom dan kembali ke default sistem?"
                    onConfirm={handleDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            </div>
        </>
    );
};

AboutIndex.layout = (page) => <AdminLayout children={page} />;

export default AboutIndex;
