import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Users,
    Filter,
    ChevronDown,
    Mail,
    Instagram,
    Linkedin,
    Eye,
    X
} from "lucide-react";
import Detail from "./Detail-Member";

export default function Index({
    periods,
    divisions,
    members,
    selectedPeriodId,
    selectedDivisionId,
    search
}) {
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/members', {
            period_id: selectedPeriodId,
            division_id: selectedDivisionId,
            search: searchTerm
        }, { preserveState: true });
    };

    const handleFilterChange = (type, value) => {
        const params = {
            period_id: selectedPeriodId,
            division_id: selectedDivisionId,
            search: searchTerm
        };
        params[type] = value;

        // Reset division if period changes
        if (type === 'period_id') {
            params.division_id = null;
        }

        router.get('/admin/members', params, { preserveState: true });
    };

    const handleDelete = (member) => {
        setMemberToDelete(member);
        setShowDeleteModal(true);
    };

    const handleShowDetail = (member) => {
        setSelectedMember(member);
        setShowDetailModal(true);
    };

    const confirmDelete = () => {
        if (memberToDelete) {
            router.delete(`/admin/members/${memberToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setMemberToDelete(null);
                }
            });
        }
    };

    return (
        <>
            <Head title="Kelola Pengurus" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Daftar Pengurus</h1>
                        <p className="text-muted-foreground mt-1">Kelola data seluruh anggota pengurus HMRPM</p>
                    </div>

                    <Link
                        href={`/admin/members/create`}
                        className="flex items-center justify-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors"
                    >
                        <Plus size={18} />
                        Tambah Pengurus
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Period Filter */}
                    <div className="relative">
                        <select
                            value={selectedPeriodId || ''}
                            onChange={(e) => handleFilterChange('period_id', e.target.value)}
                            className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-2.5 pr-10 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                        >
                            {periods.map(period => (
                                <option key={period.id} value={period.id}>{period.year}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                    </div>

                    {/* Division Filter */}
                    <div className="relative">
                        <select
                            value={selectedDivisionId || ''}
                            onChange={(e) => handleFilterChange('division_id', e.target.value)}
                            className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-2.5 pr-10 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                        >
                            <option value="">Semua Divisi</option>
                            {divisions.map(division => (
                                <option key={division.id} value={division.id}>{division.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                    </div>

                    {/* Search Search */}
                    <form onSubmit={handleSearch} className="lg:col-span-2 relative">
                        <input
                            type="text"
                            placeholder="Cari nama pengurus..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <button type="submit" className="sr-only">Cari</button>
                    </form>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border">
                                    <th className="px-6 py-4 font-bold text-sm text-foreground">Pengurus</th>
                                    <th className="px-6 py-4 font-bold text-sm text-foreground">Role & Divisi</th>
                                    <th className="px-6 py-4 font-bold text-sm text-foreground">Prodi & Angkatan</th>
                                    <th className="px-6 py-4 font-bold text-sm text-foreground">Media Sosial</th>
                                    <th className="px-6 py-4 font-bold text-sm text-foreground text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted border border-border">
                                                        <img
                                                            src={member.photo || '/storage/logo/hmrpm.png'}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground line-clamp-1">{member.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="font-semibold text-sm text-brand-red">{member.role}</p>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                                                        {member.division?.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-medium">{member.prodi || '-'}</p>
                                                    <p className="text-xs text-muted-foreground">Angkatan {member.angkatan || '-'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {member.instagram && (
                                                        <a href={member.instagram} target="_blank" className="p-1.5 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors">
                                                            <Instagram size={16} />
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a href={member.linkedin} target="_blank" className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                                            <Linkedin size={16} />
                                                        </a>
                                                    )}
                                                    {member.email && (
                                                        <a href={`mailto:${member.email}`} className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                                                            <Mail size={16} />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleShowDetail(member)}
                                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-muted-foreground hover:text-blue-600"
                                                        title="Detail"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <Link
                                                        href={`/admin/members/${member.id}/edit`}
                                                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(member)}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-muted-foreground hover:text-red-600"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                                            <Users size={48} className="mx-auto opacity-20 mb-4" />
                                            <p className="font-medium">Tidak ada data pengurus ditemukan</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <Detail
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                member={selectedMember}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <div className="p-2 bg-red-50 rounded-lg">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Hapus Pengurus?</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Apakah Anda yakin ingin menghapus data pengurus <strong>{memberToDelete?.name}</strong>?
                            Tindakan ini tidak dapat dibatalkan.
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

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
