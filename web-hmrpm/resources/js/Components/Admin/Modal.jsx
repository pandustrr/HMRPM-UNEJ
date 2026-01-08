import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ show, onClose, title, subtitle, children, maxWidth = '2xl', customHeader = false }) {
    if (!show) return null;

    const maxWidthClass = {
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
    }[maxWidth];

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className={`bg-white rounded-3xl w-full ${maxWidthClass} max-h-[90vh] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 duration-200`}>
                {/* Header */}
                {!customHeader && (
                    <div className="p-6 border-b border-border flex items-center justify-between bg-white shrink-0">
                        <div>
                            {title && <h2 className="text-2xl font-black text-foreground">{title}</h2>}
                            {subtitle && <p className="text-sm text-brand-red font-bold">{subtitle}</p>}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="overflow-y-auto flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
