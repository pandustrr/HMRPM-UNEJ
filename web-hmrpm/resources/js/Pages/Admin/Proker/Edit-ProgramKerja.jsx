import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Upload, X, Scissors } from "lucide-react";
import { useState } from "react";
import ImageCropper from "@/Components/ImageCropper";

export default function Edit({ programKerja, divisions }) {
    const { data, setData, post, processing, errors } = useForm({
        division_id: programKerja.division_id,
        title: programKerja.title,
        event_date: programKerja.event_date,
        description: programKerja.description,
        status: programKerja.status || 'Progress',
        documentation: [],
        existing_documentation: programKerja.documentation || [],
    });

    const [previewFiles, setPreviewFiles] = useState([]);
    const [croppingIndex, setCroppingIndex] = useState(null);
    const [croppingImage, setCroppingImage] = useState(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData('documentation', files);

        const previews = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
            isNew: true
        }));
        setPreviewFiles(previews);
    };

    const removeNewFile = (index) => {
        const newFiles = data.documentation.filter((_, i) => i !== index);
        setData('documentation', newFiles);

        const newPreviews = previewFiles.filter((_, i) => i !== index);
        setPreviewFiles(newPreviews);
    };

    const handleCropClick = (index) => {
        const file = data.documentation[index];
        const reader = new FileReader();
        reader.onload = () => {
            setCroppingImage(reader.result);
            setCroppingIndex(index);
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = (croppedFile) => {
        const newFiles = [...data.documentation];
        newFiles[croppingIndex] = croppedFile;
        setData('documentation', newFiles);

        const newPreviews = [...previewFiles];
        newPreviews[croppingIndex] = {
            ...newPreviews[croppingIndex],
            url: URL.createObjectURL(croppedFile)
        };
        setPreviewFiles(newPreviews);
        setCroppingImage(null);
        setCroppingIndex(null);
    };



    const removeExistingFile = (index) => {
        const newExisting = data.existing_documentation.filter((_, i) => i !== index);
        setData('existing_documentation', newExisting);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('division_id', data.division_id);
        formData.append('title', data.title);
        formData.append('event_date', data.event_date);
        formData.append('description', data.description);
        formData.append('status', data.status);

        data.existing_documentation.forEach((path, index) => {
            formData.append(`existing_documentation[${index}]`, path);
        });

        data.documentation.forEach((file, index) => {
            formData.append(`documentation[${index}]`, file);
        });

        router.post(`/admin/program-kerja/${programKerja.id}`, formData, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${programKerja.title}`} />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/program-kerja"
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Edit Program Kerja</h1>
                        <p className="text-muted-foreground mt-1">Perbarui informasi program kerja</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="bg-white rounded-2xl border border-border p-6 space-y-6 shadow-sm">
                        <h2 className="text-xl font-bold">Informasi Program Kerja</h2>

                        {/* Division */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Divisi</label>
                            <select
                                value={data.division_id}
                                onChange={e => setData('division_id', e.target.value)}
                                className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                            >
                                <option value="">Pilih Divisi</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.id}>{division.name}</option>
                                ))}
                            </select>
                            {errors.division_id && <p className="text-red-600 text-sm">{errors.division_id}</p>}
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Judul Program</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                            />
                            {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tanggal Kegiatan</label>
                            <input
                                type="date"
                                value={data.event_date}
                                onChange={e => setData('event_date', e.target.value)}
                                className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                            />
                            {errors.event_date && <p className="text-red-600 text-sm">{errors.event_date}</p>}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Status Program</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                            >
                                <option value="Perencanaan">Perencanaan</option>
                                <option value="Progress">Progress</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                            {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Deskripsi Kegiatan</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={5}
                                className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                            />
                            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                        </div>

                        {/* Existing Documentation */}
                        {data.existing_documentation.length > 0 && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Dokumentasi Saat Ini</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {data.existing_documentation.map((path, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-video rounded-lg overflow-hidden border border-border">
                                                {path.includes('.mp4') || path.includes('.webm') ? (
                                                    <video src={path} className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={path} className="w-full h-full object-cover" alt="Documentation" />
                                                )}
                                            </div>
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingFile(index)}
                                                    className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Documentation */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tambah Dokumentasi Baru</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="documentation-upload"
                            />
                            <label
                                htmlFor="documentation-upload"
                                className="flex flex-col items-center justify-center gap-2 w-full p-8 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/30 transition-colors"
                            >
                                <Upload size={24} className="text-muted-foreground" />
                                <span className="text-sm font-bold text-muted-foreground">Pilih file atau tarik kesini</span>
                                <span className="text-xs text-muted-foreground">JPG, PNG, MP4 (Maks. 20MB per file)</span>
                            </label>

                            {previewFiles.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                    {previewFiles.map((file, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-video rounded-lg overflow-hidden border border-border">
                                                {file.type.startsWith('video/') ? (
                                                    <video src={file.url} className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={file.url} className="w-full h-full object-cover" alt={file.name} />
                                                )}
                                            </div>
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                {!file.type.startsWith('video/') && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCropClick(index)}
                                                        className="p-1.5 bg-brand-red text-white rounded-full hover:bg-brand-red/90 transition-colors shadow-lg"
                                                    >
                                                        <Scissors size={12} />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewFile(index)}
                                                    className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex gap-3 pt-4">
                            <Link
                                href="/admin/program-kerja"
                                className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl font-bold text-center transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-bold shadow-lg shadow-brand-red/20 transition-all disabled:opacity-50"
                            >
                                <Save size={20} />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {croppingImage && (
                <ImageCropper
                    image={croppingImage}
                    onCropComplete={handleCropComplete}
                    onCancel={() => {
                        setCroppingImage(null);
                        setCroppingIndex(null);
                    }}
                />
            )}
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} />;
