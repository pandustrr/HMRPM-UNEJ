import React from 'react';
import { X, Users } from 'lucide-react';
import Modal from '@/Components/Admin/Modal.jsx';

export default function Detail({ show, onClose, division, periodYear }) {
    if (!division) return null;

    return (
        <Modal show={show} onClose={onClose} customHeader maxWidth="2xl">
            {/* Custom Header with Image/Gradient */}
            <div className="relative h-48 bg-linear-to-br from-brand-red to-brand-maroon shrink-0">
                {division.image && (
                    <img src={division.image} alt={division.name} className="w-full h-full object-cover opacity-50" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>
                <div className="absolute bottom-6 left-8 flex items-end gap-4">
                    {division.icon_image && (
                        <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-xl border border-border">
                            <img src={division.icon_image} alt="icon" className="w-full h-full object-contain" />
                        </div>
                    )}
                    <div>
                        <h2 className="text-3xl font-black text-white">{division.name}</h2>
                        <p className="text-white/80 text-sm font-medium">Periode {periodYear}</p>
                    </div>
                </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Tentang Divisi</h3>
                        <p className="font-bold text-lg text-foreground leading-snug">{division.short_desc}</p>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{division.description}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Users size={14} /> Anggota Divisi
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {division.members && division.members.length > 0 ? (
                                division.members.map(member => (
                                    <div key={member.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-white">
                                            <img
                                                src={member.photo || '/storage/logo/hmrpm.png'}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-foreground line-clamp-1">{member.name}</p>
                                            <p className="text-[10px] font-bold text-brand-red uppercase tracking-wider">{member.role}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-2 text-center py-8 text-muted-foreground text-sm italic">Belum ada anggota yang terdaftar</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-muted/20 border-t border-border flex justify-end shrink-0">
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-white border border-border rounded-xl font-bold hover:bg-muted transition-colors"
                >
                    Tutup
                </button>
            </div>
        </Modal>
    );
}
