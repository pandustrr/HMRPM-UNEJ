import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Edit, Trash2, User, UserCheck } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

const AdvisorIndex = ({ advisors }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);

    const handleDelete = () => {
        if (selectedAdvisor) {
            router.delete(`/admin/advisors/${selectedAdvisor.id}`, {
                onSuccess: () => setIsConfirmOpen(false)
            });
        }
    };

    const confirmDelete = (advisor) => {
        setSelectedAdvisor(advisor);
        setIsConfirmOpen(true);
    };

    return (
        <>
            <Head title="Manajemen Pembina & Pendamping | HMRPM Admin" />
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-1">Pembina & Pendamping</h1>
                        <p className="text-muted-foreground text-sm font-medium">Kelola data Pembina dan Pendamping untuk halaman About.</p>
                    </div>
                    <Link
                        href="/admin/advisors/create"
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-brand-red text-white rounded-xl font-black transition-all shadow-xl hover:shadow-brand-red/20 group w-full md:w-auto text-sm"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        TAMBAH DATA
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Pembina Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                                <UserCheck size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-foreground tracking-tight">Pembina</h2>
                        </div>
                        <div className="space-y-3">
                            {advisors.filter(a => a.type === 'pembina').map((advisor) => (
                                <AdvisorCard key={advisor.id} advisor={advisor} onConfirmDelete={confirmDelete} />
                            ))}
                            {advisors.filter(a => a.type === 'pembina').length === 0 && (
                                <EmptyState type="Pembina" />
                            )}
                        </div>
                    </div>

                    {/* Pendamping Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                <User size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-foreground tracking-tight">Pendamping</h2>
                        </div>
                        <div className="space-y-3">
                            {advisors.filter(a => a.type === 'pendamping').map((advisor) => (
                                <AdvisorCard key={advisor.id} advisor={advisor} onConfirmDelete={confirmDelete} />
                            ))}
                            {advisors.filter(a => a.type === 'pendamping').length === 0 && (
                                <EmptyState type="Pendamping" />
                            )}
                        </div>
                    </div>
                </div>

                <ConfirmModal
                    isOpen={isConfirmOpen}
                    title="Hapus Data?"
                    message={`Apakah Anda yakin ingin menghapus data ${selectedAdvisor?.name}? Tindakan ini tidak dapat dibatalkan.`}
                    onConfirm={handleDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            </div>
        </>
    );
};

const AdvisorCard = ({ advisor, onConfirmDelete }) => (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                {advisor.image ? (
                    <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <User size={24} />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate tracking-tight">{advisor.name}</h3>
                <p className="text-xs font-medium text-muted-foreground">{advisor.position || 'Jabatan Belum Diatur'}</p>
                <div className="mt-2 flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer group/toggle">
                        <input
                            type="checkbox"
                            checked={advisor.is_active}
                            onChange={() => router.patch(`/admin/advisors/${advisor.id}/toggle-active`, {}, { preserveScroll: true })}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-red"></div>
                        <span className="ms-2 text-[10px] font-bold text-muted-foreground group-hover/toggle:text-foreground transition-colors">
                            {advisor.is_active ? 'Ditampilkan' : 'Disembunyikan'}
                        </span>
                    </label>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <Link
                    href={`/admin/advisors/${advisor.id}/edit`}
                    className="p-2.5 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg transition-all"
                >
                    <Edit size={16} />
                </Link>
                <button
                    onClick={() => onConfirmDelete(advisor)}
                    className="p-2.5 bg-slate-50 hover:bg-brand-red text-slate-400 hover:text-white rounded-lg transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    </div>
);

const EmptyState = ({ type }) => (
    <div className="bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 p-6 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Belum ada data {type}</p>
    </div>
);

AdvisorIndex.layout = (page) => <AdminLayout children={page} />;

export default AdvisorIndex;
