import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save, Upload, X, FileText, Calendar, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Edit({ blog, blogTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        blog_type_id: blog.blog_type_id,
        title: blog.title,
        date: blog.date,
        image: null,
        content: blog.content,
        excerpt: blog.excerpt ?? '',
        is_published: !!blog.is_published,
    });

    const [preview, setPreview] = useState(blog.image);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we are using file upload, we use POST with _method PUT to emulate PUT
        post(`/admin/blog/${blog.id}`);
    };

    return (
        <>
            <Head title={`Edit Blog: ${blog.title}`} />

            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/blog"
                            className="p-2 bg-white border border-border rounded-xl hover:bg-muted transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-foreground uppercase tracking-tighter">EDIT BLOG</h1>
                            <p className="text-muted-foreground text-xs font-medium">Perbarui konten artikel "{blog.title}"</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Judul Artikel</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Masukkan judul blog..."
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-bold text-lg"
                                />
                                {errors.title && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.title}</p>}
                            </div>

                            {/* CKEditor Content */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Isi Konten</label>
                                <div className="prose-sm ck-content">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.content}
                                        onChange={(event, editor) => {
                                            const content = editor.getData();
                                            setData('content', content);
                                        }}
                                        config={{
                                            placeholder: 'Tunjukkan kreativitasmu di sini...',
                                            toolbar: [
                                                'heading', '|',
                                                'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                                                'undo', 'redo'
                                            ]
                                        }}
                                    />
                                </div>
                                {errors.content && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.content}</p>}
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2 pt-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Ringkasan (Opsional)</label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
                                    placeholder="Ringkasan singkat yang muncul di daftar blog..."
                                    rows="3"
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-medium text-sm resize-none"
                                />
                                {errors.excerpt && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.excerpt}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Side Panel */}
                    <div className="space-y-6">
                        {/* Status & Options */}
                        <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
                            {/* Blog Type */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1 flex items-center gap-2">
                                    <Tag size={12} /> Tipe Blog
                                </label>
                                <select
                                    value={data.blog_type_id}
                                    onChange={e => setData('blog_type_id', e.target.value)}
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-bold text-sm"
                                >
                                    <option value="">Pilih Tipe</option>
                                    {blogTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                                {errors.blog_type_id && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.blog_type_id}</p>}
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1 flex items-center gap-2">
                                    <Calendar size={12} /> Tanggal Terbit
                                </label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all font-bold text-sm"
                                />
                                {errors.date && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.date}</p>}
                            </div>

                            {/* Publish Status */}
                            <div className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-border">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-600">Terbitkan Langsung?</span>
                                <button
                                    type="button"
                                    onClick={() => setData('is_published', !data.is_published)}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                                        data.is_published ? "bg-brand-red" : "bg-slate-300"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                            data.is_published ? "translate-x-6" : "translate-x-1"
                                        )}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1 flex items-center gap-2">
                                <Upload size={12} /> Gambar Sampul
                            </label>

                            <div className="relative group">
                                {preview ? (
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-brand-red/20 shadow-xl group">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setData('image', null);
                                                }}
                                                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-red transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="aspect-video bg-muted border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-brand-red/50 transition-colors">
                                            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                                <Upload className="text-brand-red" size={24} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Gambar Sampul</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.image && <p className="text-brand-red text-[10px] font-bold mt-1">{errors.image}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-brand-red text-white py-5 rounded-3xl font-black transition-all shadow-xl hover:shadow-brand-red/30 uppercase tracking-widest overflow-hidden group relative"
                        >
                            <span className="relative z-10 flex items-center gap-2 leading-none">
                                <Save size={20} />
                                {processing ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}



Edit.layout = (page) => <AdminLayout children={page} />;
