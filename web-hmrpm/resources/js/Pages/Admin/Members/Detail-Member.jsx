import React from 'react';
import { X, Instagram, Linkedin, Mail } from 'lucide-react';
import Modal from '@/Components/Admin/Modal.jsx';

export default function Detail({ show, onClose, member }) {
    if (!member) return null;

    return (
        <Modal show={show} onClose={onClose} customHeader maxWidth="2xl">
            {/* Modal Header */}
            <div className="relative px-8 pt-8 pb-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-muted text-foreground rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border shadow-lg">
                            <img
                                src={member.photo || '/storage/logo/hmrpm.png'}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                            />
                        </div>
                    </div>
                    <div className="flex-1 pt-2">
                        <h2 className="text-2xl font-black text-foreground">{member.name}</h2>
                        <p className="text-brand-red font-bold text-base mt-1">{member.role}</p>
                        <p className="text-muted-foreground uppercase tracking-widest text-xs font-black mt-1">
                            {member.division?.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal Body */}
            <div className="px-8 pb-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase">Program Studi</p>
                            <p className="font-semibold">{member.prodi || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase">Angkatan</p>
                            <p className="font-semibold">{member.angkatan || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase">Email</p>
                            {member.email && <p className="font-semibold break-all">{member.email}</p>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase">Media Sosial</p>
                            <div className="flex gap-2">
                                {member.instagram && (
                                    <a href={member.instagram} target="_blank" className="p-2 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors">
                                        <Instagram size={18} />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                        <Linkedin size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {member.video && (
                        <div className="space-y-2">
                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">Video Hover</p>
                            <div className="rounded-2xl overflow-hidden border border-border bg-black aspect-video relative group">
                                <video
                                    src={member.video}
                                    className="w-full h-full object-cover"
                                    controls
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-8 py-4 bg-muted/30 border-t border-border flex justify-end">
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
