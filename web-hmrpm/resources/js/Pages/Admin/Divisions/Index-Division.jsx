import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Users, ChevronDown, Eye, X } from "lucide-react";
import Detail from "./Detail-Division";

export default function Index({ periods, selectedPeriodId, divisions }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [divisionToDelete, setDivisionToDelete] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);

    const handlePeriodChange = (e) => {
        router.get('/admin/divisions', { period_id: e.target.value }, { preserveState: true });
    };

    const handleShowDetail = (division) => {
        setSelectedDivision(division);
        setShowDetailModal(true);
    };

    const handleDelete = (division) => {
        setDivisionToDelete(division);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (divisionToDelete) {
            router.delete(`/admin/divisions/${divisionToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDivisionToDelete(null);
                }
            });
        }
    };

    return (
        <>
            <Head title="Kelola Divisi & Pengurus" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Divisi & Pengurus</h1>
                        <p className="text-muted-foreground mt-1">Kelola divisi dan anggota pengurus per periode</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Period Filter */}
                        <div className="relative">
                            <select
                                value={selectedPeriodId || ''}
                                onChange={handlePeriodChange}
                                className="appearance-none bg-white border border-border rounded-xl px-4 py-2.5 pr-10 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                            >
                                {periods.map(period => (
                                    <option key={period.id} value={period.id}>{period.year}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                        </div>

                        <Link
                            href={`/admin/divisions/create?period_id=${selectedPeriodId}`}
                            className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors"
                        >
                            <Plus size={18} />
                            Tambah Divisi
                        </Link>
                    </div>
                </div>

                {/* Divisions Grid */}
                {divisions.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-border p-12 text-center">
                        <Users size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-bold text-foreground mb-2">Belum Ada Divisi</h3>
                        <p className="text-muted-foreground mb-6">Mulai tambahkan divisi untuk periode ini</p>
                        <Link
                            href={`/admin/divisions/create?period_id=${selectedPeriodId}`}
                            className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-red/90 transition-colors"
                        >
                            <Plus size={18} />
                            Tambah Divisi Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {divisions.map(division => (
                            <div key={division.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Division Image */}
                                <div className="h-40 bg-slate-100 relative overflow-hidden">
                                    {division.image && (
                                        <img src={division.image} alt={division.name} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                    <h3 className="absolute bottom-4 left-4 text-white font-black text-xl drop-shadow-lg">{division.name}</h3>
                                </div>

                                {/* Division Info */}
                                <div className="p-4 space-y-3">
                                    <p className="text-sm text-muted-foreground line-clamp-2">{division.short_desc}</p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-2">
                                        <button
                                            onClick={() => handleShowDetail(division)}
                                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                            title="Detail"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <Link
                                            href={`/admin/divisions/${division.id}/edit`}
                                            className="flex-1 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(division)}
                                            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <Detail
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                division={selectedDivision}
                periodYear={periods.find(p => p.id === parseInt(selectedPeriodId))?.year}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <div className="p-2 bg-red-50 rounded-lg">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Hapus Divisi?</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Apakah Anda yakin ingin menghapus divisi <strong>{divisionToDelete?.name}</strong>?
                            Semua anggota di divisi ini juga akan terhapus.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl font-bold transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-200"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />;
