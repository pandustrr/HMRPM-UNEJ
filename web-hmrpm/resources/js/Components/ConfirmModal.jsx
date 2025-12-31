import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, HelpCircle } from "lucide-react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Iya, Lanjutkan", cancelText = "Batal" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
                    {/* Minimal Backdrop - purely for click handling, virtually invisible if user wants "tanpa background" */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"
                        onClick={onCancel}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative bg-white border border-slate-200 rounded-4xl p-8 shadow-2xl max-w-sm w-full space-y-6"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                                <HelpCircle size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">{title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{message}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={onCancel}
                                className="px-6 py-3.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all uppercase text-xs tracking-widest"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-black hover:bg-brand-red transition-all shadow-lg shadow-black/10 hover:shadow-brand-red/20 uppercase text-xs tracking-widest"
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
