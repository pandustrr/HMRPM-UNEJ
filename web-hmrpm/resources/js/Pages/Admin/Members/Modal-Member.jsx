import React from 'react';
import { User, Instagram, Linkedin, Mail, Upload, Video } from 'lucide-react';
import ModalWrapper from '@/Components/Admin/Modal.jsx';

export default function Modal({ show, onClose, form, divisionName, periodYear }) {
    if (!show) return null;

    return (
        <ModalWrapper
            show={show}
            onClose={onClose}
            title="Tambah Pengurus"
            subtitle={`${periodYear} · Divisi ${divisionName}`}
            maxWidth="2xl"
        >
            <form onSubmit={form.handleSubmit} className="p-6 space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <User size={14} /> Informasi Pribadi
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground ml-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={e => form.setData('name', e.target.value)}
                                className="w-full px-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                                placeholder="Contoh: Budi Santoso"
                            />
                            {form.errors.name && <p className="text-red-500 text-[10px] font-bold mt-1">{form.errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground ml-1">Role / Jabatan</label>
                            <input
                                type="text"
                                value={form.data.role}
                                onChange={e => form.setData('role', e.target.value)}
                                className="w-full px-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                                placeholder="Contoh: Ketua Divisi"
                            />
                            {form.errors.role && <p className="text-red-500 text-[10px] font-bold mt-1">{form.errors.role}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground ml-1">Program Studi</label>
                            <input
                                type="text"
                                value={form.data.prodi}
                                onChange={e => form.setData('prodi', e.target.value)}
                                className="w-full px-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground ml-1">Angkatan</label>
                            <input
                                type="text"
                                value={form.data.angkatan}
                                onChange={e => form.setData('angkatan', e.target.value)}
                                className="w-full px-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Media Sosial */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Instagram size={14} /> Media Sosial & Kontak
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-foreground ml-1 uppercase">Instagram URL</label>
                            <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                <input
                                    type="url"
                                    value={form.data.instagram}
                                    onChange={e => form.setData('instagram', e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-foreground ml-1 uppercase">LinkedIn URL</label>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                <input
                                    type="url"
                                    value={form.data.linkedin}
                                    onChange={e => form.setData('linkedin', e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                                />
                            </div>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="text-[10px] font-bold text-foreground ml-1 uppercase">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                <input
                                    type="email"
                                    value={form.data.email}
                                    onChange={e => form.setData('email', e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Uploads */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Upload size={14} /> File Media
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground ml-1 flex items-center gap-1.5">
                                <Upload size={12} /> Foto Profil
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => form.setData('photo', e.target.files[0])}
                                className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-red/10 file:text-brand-red hover:file:bg-brand-red/20"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-foreground ml-1 flex items-center gap-1.5">
                                <Video size={12} /> Video Hover
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={e => form.setData('video', e.target.files[0])}
                                className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-red/10 file:text-brand-red hover:file:bg-brand-red/20"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="w-full py-3 bg-brand-red text-white rounded-2xl font-black text-lg hover:bg-brand-red/90 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
                >
                    {form.processing ? 'Menyimpan...' : 'Simpan Anggota'}
                </button>
            </form>
        </ModalWrapper>
    );
}
