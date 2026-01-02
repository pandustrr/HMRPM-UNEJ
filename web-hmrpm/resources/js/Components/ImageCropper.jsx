import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCcw } from 'lucide-react';

const ImageCropper = ({ image, onCropComplete, onCancel, aspectRatio = 16 / 9 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteInternal = useCallback((_croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    return;
                }
                const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
                resolve(file);
            }, 'image/jpeg', 0.9);
        });
    };

    const handleConfirm = async () => {
        try {
            const croppedImageFile = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedImageFile);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center">
                        <Check size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Sesuaikan Gambar</h3>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Crop & Zoom area yang ingin ditampilkan</p>
                    </div>
                </div>
                <button
                    onClick={onCancel}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="relative flex-1 bg-zinc-950 overflow-hidden">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={onCropChange}
                    onCropComplete={onCropCompleteInternal}
                    onZoomChange={onZoomChange}
                    classes={{
                        containerClassName: "bg-zinc-950",
                        mediaClassName: "opacity-80 transition-opacity hover:opacity-100",
                        cropAreaClassName: "border-2 border-brand-red shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]"
                    }}
                />
            </div>

            <div className="p-6 bg-zinc-900/80 border-t border-white/10 space-y-6">
                {/* Controls */}
                <div className="max-w-md mx-auto space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-red"
                        />
                        <button
                            onClick={() => setZoom(1)}
                            className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-brand-red transition-all"
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 max-w-md mx-auto">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-3 px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-black text-sm transition-all shadow-lg shadow-brand-red/20 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        <Check size={18} />
                        Simpan Area Crop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
