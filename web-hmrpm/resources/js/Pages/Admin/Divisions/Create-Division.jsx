import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Upload, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import ImageCropper from "@/Components/ImageCropper";

export default function Create({ periods, selectedPeriodId }) {
    const { data, setData, post, processing, errors } = useForm({
        period_id: selectedPeriodId || (periods.length > 0 ? periods[0].id : ''),
        name: '',
        short_desc: '',
        description: '',
        color: '#dc2626',
        icon_image: null,
        image: null,
    });

    const [showCropper, setShowCropper] = useState(false);
    const [masterBackgroundSource, setMasterBackgroundSource] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [cropperKey, setCropperKey] = useState(0);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMasterBackgroundSource(reader.result);
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
        post('/admin/divisions', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Divisi" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/admin/divisions?period_id=${data.period_id}`}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-foreground">Tambah Divisi</h1>
                            <p className="text-muted-foreground mt-1">Buat divisi baru untuk periode kepengurusan</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-border p-6 space-y-6 shadow-sm">
                            <h2 className="text-xl font-bold">Informasi Divisi</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Periode Kepengurusan</label>
                                    <div className="relative">
                                        <select
                                            value={data.period_id}
                                            onChange={e => setData('period_id', e.target.value)}
                                            className="w-full appearance-none px-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 pr-10"
                                        >
                                            <option value="">Pilih Periode</option>
                                            {periods.map(period => (
                                                <option key={period.id} value={period.id}>{period.year}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                                    </div>
                                    {errors.period_id && <p className="text-red-600 text-sm mt-1">{errors.period_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Nama Divisi</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                        placeholder="Contoh: Divisi PSDM"
                                    />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Nama Lengkap Departemen</label>
                                <input
                                    type="text"
                                    value={data.short_desc}
                                    onChange={e => setData('short_desc', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                    placeholder="Penjelasan singkat fokus divisi"
                                />
                                {errors.short_desc && <p className="text-red-600 text-sm mt-1">{errors.short_desc}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Deskripsi Lengkap</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                    placeholder="Tuliskan tujuan, program kerja, atau detail lain dari divisi ini..."
                                />
                                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Uploads */}
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
                                        {data.image ? (
                                            <>
                                                <img
                                                    src={previewUrl}
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
                                    <p className="text-[10px] text-muted-foreground font-medium italic">* Rasio ideal 16:9 untuk tampilan bg di website.</p>
                                    <p className="text-[10px] text-muted-foreground font-medium italic">Untuk crop ulang gambar yang sudah disimpan, silakan upload ulang background terlebih dahulu.</p>
                                    {errors.image && <p className="text-red-600 text-sm mt-1 font-bold">{errors.image}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black transition-all disabled:opacity-50 shadow-xl shadow-red-100 uppercase tracking-wider font-black"
                            >
                                <Save size={20} />
                                {processing ? 'Menyimpan...' : 'Tambah Divisi'}
                            </button>
                        </div>
                    </div>
                </form>

                {showCropper && (
                    <ImageCropper
                        key={`cropper-${cropperKey}`}
                        image={masterBackgroundSource}
                        aspectRatio={16 / 9}
                        onCropComplete={handleCropComplete}
                        onCancel={() => {
                            setShowCropper(false);
                        }}
                    />
                )}
            </div>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} />;
