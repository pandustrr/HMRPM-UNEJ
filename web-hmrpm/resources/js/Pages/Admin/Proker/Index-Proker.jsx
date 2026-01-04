import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Upload, Image as ImageIcon, Film, Save, AlertCircle, Trash2, Scissors } from "lucide-react";
import { router } from "@inertiajs/react";
import ConfirmModal from "@/Components/ConfirmModal";
import ImageCropper from "@/Components/ImageCropper";
import { useState } from "react";

const ProkerIndex = ({ settings }) => {
    const { data, setData, post, processing, errors } = useForm({
        type: settings?.type || 'image',
        file: null,
    });

    const [preview, setPreview] = useState(settings?.value || null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [masterSource, setMasterSource] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (data.type === 'image') {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreview(reader.result);
                    setMasterSource(reader.result);
                    setData('file', file);
                };
                reader.readAsDataURL(file);
            } else {
                setData('file', file);
                setPreview(URL.createObjectURL(file));
                setMasterSource(null);
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/proker', {
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        setIsConfirmOpen(false);
        router.delete('/admin/proker', {
            onSuccess: () => {
                setPreview(null);
                setData('file', null);
            }
        });
    };

    return (
        <>
            <Head title="Pengaturan Proker | HMRPM Admin" />
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter mb-1 uppercase">PENGATURAN PROKER</h1>
                    <p className="text-slate-500 text-xs font-medium">Kelola tampilan hero background halaman Proker (Video/Gambar/GIF).</p>
                </div>

                <div className="bg-white rounded-4xl border border-slate-200 p-6 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Type Selection */}
                        <div className="space-y-3">
                            <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">Tipe Background</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: 'image', label: 'Gambar', icon: ImageIcon },
                                    { id: 'video', label: 'Video (MP4/GIF)', icon: Film },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setData('type', type.id)}
                                        className={`flex items-center justify-center gap-3 p-3 rounded-xl border-2 transition-all ${data.type === type.id
                                            ? 'border-brand-red bg-brand-red/5 text-brand-red shadow-lg shadow-brand-red/10'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                            }`}
                                    >
                                        <type.icon size={18} />
                                        <span className="font-bold text-sm">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-3">
                            <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">Unggah File Baru</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept={data.type === 'video' ? 'video/mp4' : 'image/*'}
                                />
                                <div className="border-2 border-dashed border-slate-200 group-hover:border-brand-red/50 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 transition-all bg-slate-50 group-hover:bg-brand-red/5">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-brand-red transition-all shadow-sm">
                                        <Upload size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-slate-900 font-bold text-sm">Pilih file atau tarik kesini</p>
                                        <p className="text-slate-500 text-[10px]">MP4, JPG, PNG, atau GIF (Maks. 20MB)</p>
                                    </div>
                                </div>
                            </div>
                            {errors.file && <p className="text-brand-red text-[10px] font-bold flex items-center gap-2 mt-2 px-1"><AlertCircle size={12} /> {errors.file}</p>}
                        </div>

                        {data.type === 'image' && showCropper && masterSource && (
                            <ImageCropper
                                image={masterSource}
                                aspectRatio={20 / 9}
                                onCropComplete={(file) => {
                                    setData('file', file);
                                    setPreview(URL.createObjectURL(file));
                                    setShowCropper(false);
                                }}
                                onCancel={() => {
                                    setShowCropper(false);
                                }}
                            />
                        )}

                        {/* Preview */}
                        {preview && (
                            <div className="space-y-3">
                                <label className="block text-slate-700 text-[10px] font-black uppercase tracking-widest px-1">Preview Saat Ini</label>
                                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 shadow-inner bg-slate-100 max-w-lg mx-auto">
                                    {data.type === 'video' ? (
                                        <video src={preview} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                                    ) : (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute top-3 left-3 py-0.5 px-2.5 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                        Tampilan Aktif
                                    </div>
                                    {data.file && data.type === 'image' && (
                                        <button
                                            type="button"
                                            onClick={() => setShowCropper(true)}
                                            className="absolute top-3 right-3 p-2 bg-brand-red text-white rounded-xl shadow-xl hover:bg-brand-red/90 transition-all hover:scale-110 active:scale-95 group/crop"
                                            title="Potong Gambar"
                                        >
                                            <Scissors size={16} className="group-hover/crop:rotate-12 transition-transform" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="pt-5 border-t border-slate-100 flex justify-between items-center text-xs">
                            {settings && (
                                <button
                                    type="button"
                                    onClick={() => setIsConfirmOpen(true)}
                                    className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-brand-red font-bold transition-all group"
                                >
                                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                    Hapus Background
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-brand-red text-white rounded-xl font-black transition-all shadow-xl hover:shadow-brand-red/20 disabled:opacity-50 group ml-auto uppercase tracking-widest"
                            >
                                <Save size={18} className="group-hover:scale-110 transition-transform" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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

ProkerIndex.layout = (page) => <AdminLayout children={page} />;

export default ProkerIndex;
