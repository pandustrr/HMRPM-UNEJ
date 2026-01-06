import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, Briefcase, Info } from "lucide-react";
import { useEffect } from "react";

const DetailAcademicModal = ({ isOpen, onClose, academic }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!academic) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 dark:bg-black/80"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-[#121212] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-border/50 dark:border-white/5"
                    >
                        <div className="relative">
                            {/* Close Button Only */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 rounded-full transition-all z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="px-6 pb-8 pt-10 relative">
                                <div className="flex flex-col sm:flex-row gap-5 items-start mb-8">
                                    {/* Profile Image */}
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-[#121212] shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-800 transition-colors shrink-0">
                                        <img
                                            src={academic.image || "/storage/logo/hmrpm.png"}
                                            alt={academic.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = "/storage/logo/hmrpm.png"}
                                        />
                                    </div>

                                    {/* Header Content */}
                                    <div className="pt-2">
                                        <div className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-widest mb-2">
                                            {academic.type}
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">{academic.name}</h2>
                                        {academic.position && (
                                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base mt-1">{academic.position}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Identitas */}
                                    {(academic.nip_nik || academic.nidn || academic.gender || academic.religion || (academic.birth_place && academic.birth_date)) && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
                                                <User size={16} className="text-brand-red" />
                                                <h3 className="text-xs font-black text-slate-900 dark:text-slate-200 uppercase tracking-widest">Identitas</h3>
                                            </div>

                                            <div className="space-y-3">
                                                <InfoItem label="NIP / NIK" value={academic.nip_nik} />
                                                <InfoItem label="NIDN" value={academic.nidn} />
                                                <InfoItem label="Jenis Kelamin" value={academic.gender} />
                                                <InfoItem label="Agama" value={academic.religion} />
                                                <InfoItem label="Tempat, Tgl Lahir" value={academic.birth_place && academic.birth_date ? `${academic.birth_place}, ${new Date(academic.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : null} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Jabatan & Kontak */}
                                    <div className="space-y-6">
                                        {/* Jabatan */}
                                        {(academic.rank || academic.university) && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
                                                    <Briefcase size={16} className="text-brand-yellow" />
                                                    <h3 className="text-xs font-black text-slate-900 dark:text-slate-200 uppercase tracking-widest">Jabatan & Pangkat</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <InfoItem label="Pangkat / Gol." value={academic.rank} />
                                                    <InfoItem label="Institusi" value={academic.university} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Kontak */}
                                        {(academic.email || academic.address || academic.phone_office) && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
                                                    <Phone size={16} className="text-slate-700 dark:text-slate-300" />
                                                    <h3 className="text-xs font-black text-slate-900 dark:text-slate-200 uppercase tracking-widest">Kontak</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <InfoItem label="Email" value={academic.email} isEmail />
                                                    <InfoItem label="Alamat Kantor" value={academic.address} />
                                                    <InfoItem label="Telp Kantor" value={academic.phone_office} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const InfoItem = ({ label, value, isEmail }) => {
    if (!value) return null;

    return (
        <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-0.5">{label}</p>
            {isEmail ? (
                <a href={`mailto:${value}`} className="text-sm font-bold text-brand-red hover:underline block truncate">{value}</a>
            ) : (
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 block">{value}</p>
            )}
        </div>
    );
};

export default DetailAcademicModal;
