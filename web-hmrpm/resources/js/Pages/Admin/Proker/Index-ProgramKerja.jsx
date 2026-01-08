import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Calendar, Eye, Filter, CheckCircle2, Clock, CircleDashed } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Index({ programKerjas, divisions, selectedDivisionId }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [filterDivision, setFilterDivision] = useState(selectedDivisionId || '');

    useEffect(() => {
        setFilterDivision(selectedDivisionId || '');
    }, [selectedDivisionId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Selesai': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'Progress': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'Perencanaan': return 'text-purple-600 bg-purple-50 border-purple-100';
            default: return 'text-muted-foreground bg-muted border-border';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Selesai': return <CheckCircle2 size={12} />;
            case 'Progress': return <Clock size={12} />;
            default: return <CircleDashed size={12} />;
        }
    };

    const handleDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            router.delete(`/admin/program-kerja/${itemToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                }
            });
        }
    };

    const handleFilterChange = (divisionId) => {
        setFilterDivision(divisionId);
        router.get('/admin/program-kerja', { division_id: divisionId }, { preserveState: true });
    };

    return (
        <>
            <Head title="Kelola Program Kerja" />

            <div className="p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Kelola Program Kerja</h1>
                        <p className="text-muted-foreground text-sm mt-1">Atur program kerja per divisi</p>
                    </div>

                    <Link
                        href="/admin/program-kerja/create"
                        className="flex items-center justify-center sm:justify-start gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors w-full sm:w-auto"
                    >
                        <Plus size={18} />
                        <span>Tambah Program Kerja</span>
                    </Link>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Filter size={18} className="text-muted-foreground" />
                        <select
                            value={filterDivision}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="flex-1 px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                        >
                            <option value="">Semua Divisi</option>
                            {divisions.map(division => (
                                <option key={division.id} value={division.id}>{division.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* List */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="text-left px-6 py-4 font-bold text-sm text-foreground">Judul</th>
                                    <th className="text-left px-6 py-4 font-bold text-sm text-foreground">Divisi</th>
                                    <th className="text-left px-6 py-4 font-bold text-sm text-foreground">Tanggal</th>
                                    <th className="text-left px-6 py-4 font-bold text-sm text-foreground">Status</th>
                                    <th className="text-right px-6 py-4 font-bold text-sm text-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {programKerjas.length > 0 ? (
                                    programKerjas.map(item => (
                                        <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-foreground">{item.title}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-muted-foreground">{item.division?.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar size={14} />
                                                    {new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={cn(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm",
                                                    getStatusColor(item.status)
                                                )}>
                                                    {getStatusIcon(item.status)}
                                                    {item.status || 'Progress'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/program-kerja/${item.id}/edit`}
                                                        className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground">
                                            Belum ada program kerja
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600 mb-3">
                            <div className="p-1.5 bg-red-50 rounded-lg">
                                <Trash2 size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Hapus Program Kerja?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            Apakah Anda yakin ingin menghapus <strong>{itemToDelete?.title}</strong>?
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl font-bold text-sm transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-100"
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
