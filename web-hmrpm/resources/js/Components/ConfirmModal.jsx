import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Hapus", cancelText = "Batal" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40"
                        onClick={onCancel}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl space-y-4"
                    >
                        <div className="flex items-center gap-3 text-red-600 mb-3">
                            <div className="p-1.5 bg-red-50 rounded-lg text-red-600">
                                <Trash2 size={20} />
                            </div>
                            <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {message}
                        </p>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={onCancel}
                                className="flex-1 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-sm transition-all"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-100"
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
