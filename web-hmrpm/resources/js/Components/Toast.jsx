import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const colors = {
        success: "bg-emerald-500",
        error: "bg-brand-red",
        info: "bg-blue-500",
    };

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <AlertCircle size={20} />,
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={`fixed bottom-8 right-8 z-100 flex items-center gap-4 px-6 py-4 rounded-2xl text-white shadow-2xl ${colors[type]}`}
                >
                    <div className="flex items-center gap-3">
                        {icons[type]}
                        <span className="font-bold tracking-tight">{message}</span>
                    </div>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(onClose, 300);
                        }}
                        className="hover:scale-110 transition-transform opacity-70 hover:opacity-100"
                    >
                        <X size={18} />
                    </button>
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: duration / 1000, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-white/20"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
