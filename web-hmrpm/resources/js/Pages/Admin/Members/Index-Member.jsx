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

            <div className="p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-foreground">Daftar Pengurus</h1>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">Kelola data seluruh anggota pengurus HMRPM</p>
                    </div>

                    <Link
                        href={`/admin/members/create?period_id=${selectedPeriodId}&filter_division_id=${selectedDivisionId || ''}`}
                        className="flex items-center justify-center sm:justify-start gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-colors w-full sm:w-auto"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Tambah Pengurus</span>
                        <span className="sm:hidden">Tambah</span>
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <form onSubmit={handleSearch} className="sm:col-span-2 lg:col-span-2 relative">
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

                {/* Members Table/Cards */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                                    <th className="px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Pengurus</th>
                                    <th className="px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Role & Divisi</th>
                                    <th className="px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Prodi & Angkatan</th>
                                    <th className="px-4 sm:px-6 py-4 font-bold text-sm text-foreground">Media Sosial</th>
                                    <th className="px-4 sm:px-6 py-4 font-bold text-sm text-foreground text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gradient-to-r hover:from-brand-red/5 hover:to-transparent transition-colors duration-200">
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted border-2 border-brand-red/20 shadow-sm flex-shrink-0">
                                                        <img
                                                            src={member.photo || '/storage/logo/hmrpm.png'}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-foreground line-clamp-1">{member.name}</p>
                                                        {member.email && <p className="text-xs text-muted-foreground line-clamp-1">{member.email}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="space-y-1.5">
                                                    <p className="inline-flex items-center gap-1.5 bg-brand-red/10 text-brand-red px-2.5 py-1 rounded-full font-bold text-xs">
                                                        {member.role}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                                                        {member.division?.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-medium text-foreground">{member.prodi || '-'}</p>
                                                    <p className="text-xs text-muted-foreground">Angkatan {member.angkatan || '-'}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    {member.instagram && (
                                                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors duration-200 shadow-sm hover:shadow-md" title="Instagram">
                                                            <Instagram size={16} />
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md" title="LinkedIn">
                                                            <Linkedin size={16} />
                                                        </a>
                                                    )}
                                                    {member.email && (
                                                        <a href={`mailto:${member.email}`} className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:shadow-md" title="Email">
                                                            <Mail size={16} />
                                                        </a>
                                                    )}
                                                    {!member.instagram && !member.linkedin && !member.email && (
                                                        <span className="text-xs text-muted-foreground">Tidak ada</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => handleShowDetail(member)}
                                                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                                        title="Detail"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <Link
                                                        href={`/admin/members/${member.id}/edit?period_id=${selectedPeriodId}&filter_division_id=${selectedDivisionId || ''}`}
                                                        className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-200"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(member)}
                                                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
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
                                        <td colSpan="5" className="px-4 sm:px-6 py-12 text-center text-muted-foreground">
                                            <Users size={48} className="mx-auto opacity-20 mb-4" />
                                            <p className="font-medium">Tidak ada data pengurus ditemukan</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View - Card Layout */}
                    <div className="lg:hidden divide-y divide-border">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <div key={member.id} className="p-4 space-y-4 hover:bg-brand-red/5 transition-colors duration-200">
                                    {/* Name & Photo */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border-2 border-brand-red/20 shadow-sm flex-shrink-0">
                                            <img
                                                src={member.photo || '/storage/logo/hmrpm.png'}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-foreground line-clamp-1">{member.name}</p>
                                            {member.email && <p className="text-xs text-muted-foreground line-clamp-1">{member.email}</p>}
                                        </div>
                                    </div>

                                    {/* Role & Division */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Role</p>
                                            <p className="inline-flex items-center gap-1 bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-full font-bold text-xs">
                                                {member.role}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Divisi</p>
                                            <p className="text-xs text-foreground font-medium truncate">{member.division?.name}</p>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Prodi</p>
                                            <p className="text-xs text-foreground font-medium truncate">{member.prodi || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Angkatan</p>
                                            <p className="text-xs text-foreground font-medium">{member.angkatan || '-'}</p>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Media Sosial</p>
                                        <div className="flex items-center gap-1.5">
                                            {member.instagram && (
                                                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors duration-200 shadow-sm hover:shadow-md" title="Instagram">
                                                    <Instagram size={16} />
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md" title="LinkedIn">
                                                    <Linkedin size={16} />
                                                </a>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:shadow-md" title="Email">
                                                    <Mail size={16} />
                                                </a>
                                            )}
                                            {!member.instagram && !member.linkedin && !member.email && (
                                                <span className="text-xs text-muted-foreground">Tidak ada</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1.5 pt-2 border-t border-border">
                                        <button
                                            onClick={() => handleShowDetail(member)}
                                            className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200 font-medium text-sm"
                                            title="Detail"
                                        >
                                            <Eye size={16} />
                                            Detail
                                        </button>
                                        <Link
                                            href={`/admin/members/${member.id}/edit?period_id=${selectedPeriodId}&filter_division_id=${selectedDivisionId || ''}`}
                                            className="flex-1 flex items-center justify-center gap-2 p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-200 font-medium text-sm"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member)}
                                            className="flex-1 flex items-center justify-center gap-2 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200 font-medium text-sm"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-muted-foreground">
                                <Users size={48} className="mx-auto opacity-20 mb-4" />
                                <p className="font-medium">Tidak ada data pengurus ditemukan</p>
                            </div>
                        )}
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
