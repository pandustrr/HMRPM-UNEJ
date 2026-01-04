import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Edit, Trash2, Users, ChevronDown, Eye, X, Search, Instagram, Linkedin, Mail } from "lucide-react";
import Detail from "./Detail-Division";
import DetailMember from "@/Pages/Admin/Members/Detail-Member";

export default function Index({ periods, selectedPeriodId, divisions }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [divisionToDelete, setDivisionToDelete] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [showAllMembers, setShowAllMembers] = useState(new URLSearchParams(window.location.search).get('show_all_members') === '1');
    const [selectedMemberDivisionId, setSelectedMemberDivisionId] = useState('');
    const [memberSearchTerm, setMemberSearchTerm] = useState('');
    const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const handlePeriodChange = (e) => {
        router.get('/admin/divisions', { period_id: e.target.value }, { preserveState: true });
    };

    const handleShowDetail = (division) => {
        setSelectedDivision(division);
        setShowDetailModal(true);
    };

    const handleShowMemberDetail = (member) => {
        setSelectedMember(member);
        setShowMemberDetailModal(true);
    };

    const handleDeleteMember = (member) => {
        setMemberToDelete(member);
        setShowDeleteMemberModal(true);
    };

    const confirmDeleteMember = () => {
        if (memberToDelete) {
            router.delete(`/admin/members/${memberToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteMemberModal(false);
                    setMemberToDelete(null);
                },
                preserveScroll: true,
            });
        }
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

    // Get all members with filtering
    const getAllMembers = () => {
        let members = [];
        divisions.forEach(div => {
            if (div.members && div.members.length > 0) {
                members = members.concat(div.members);
            }
        });
        return members;
    };

    const allMembers = getAllMembers();
    const filteredMembers = allMembers.filter(member => {
        const matchesDivision = !selectedMemberDivisionId || member.division_id === parseInt(selectedMemberDivisionId);
        const matchesSearch = !memberSearchTerm || member.name.toLowerCase().includes(memberSearchTerm.toLowerCase());
        return matchesDivision && matchesSearch;
    });

    return (
        <>
            <Head title="Kelola Divisi & Pengurus" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Kelola Divisi & Pengurus</h1>
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
                                <div className="h-32 bg-slate-100 relative overflow-hidden">
                                    {division.image && (
                                        <img src={division.image} alt={division.name} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                    <h3 className="absolute bottom-3 left-3 text-white font-bold text-base drop-shadow-lg">{division.name}</h3>
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
                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* All Members Section */}
            {divisions.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowAllMembers(!showAllMembers)}
                            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${showAllMembers
                                ? 'bg-brand-red text-white hover:bg-brand-red/90'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                                }`}
                        >
                            {showAllMembers ? 'Tutup Semua Pengurus' : 'Lihat Semua Pengurus'}
                        </button>
                        <Link
                            href={`/admin/members/create?period_id=${selectedPeriodId}`}
                            className="flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-red/90 transition-colors"
                        >
                            <Plus size={18} />
                            Tambah Pengurus
                        </Link>
                    </div>

                    {showAllMembers && (
                        <div className="bg-white rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground">Semua Pengurus</h2>

                            {/* Filters & Search */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Division Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedMemberDivisionId}
                                        onChange={(e) => setSelectedMemberDivisionId(e.target.value)}
                                        className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-2.5 pr-10 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    >
                                        <option value="">Semua Divisi</option>
                                        {divisions.map(division => (
                                            <option key={division.id} value={division.id}>{division.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari nama pengurus..."
                                        value={memberSearchTerm}
                                        onChange={(e) => setMemberSearchTerm(e.target.value)}
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                </div>
                            </div>

                            {/* Members Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                                            <th className="px-3 sm:px-4 py-3 font-bold text-xs text-foreground">Pengurus</th>
                                            <th className="px-3 sm:px-4 py-3 font-bold text-xs text-foreground">Role & Divisi</th>
                                            <th className="px-3 sm:px-4 py-3 font-bold text-xs text-foreground">Prodi & Angkatan</th>
                                            <th className="px-3 sm:px-4 py-3 font-bold text-xs text-foreground">Media Sosial</th>
                                            <th className="px-3 sm:px-4 py-3 font-bold text-xs text-foreground text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {filteredMembers.length > 0 ? (
                                            filteredMembers.map((member) => (
                                                <tr key={member.id} className="hover:bg-gradient-to-r hover:from-brand-red/5 hover:to-transparent transition-colors duration-200">
                                                    <td className="px-3 sm:px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted border-2 border-brand-red/20 shadow-sm flex-shrink-0">
                                                                <img
                                                                    src={member.photo || '/storage/logo/hmrpm.png'}
                                                                    alt={member.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => e.target.src = '/storage/logo/hmrpm.png'}
                                                                />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-bold text-sm text-foreground line-clamp-1">{member.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 sm:px-6 py-4">
                                                        <div className="space-y-1.5">
                                                            <p className="inline-flex items-center gap-1.5 bg-brand-red/10 text-brand-red px-2.5 py-1 rounded-full font-bold text-xs">
                                                                {member.role}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground font-medium">
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
                                                                onClick={() => handleShowMemberDetail(member)}
                                                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                                                title="Detail"
                                                            >
                                                                <Eye size={16} />
                                                            </button>
                                                            <Link
                                                                href={`/admin/members/${member.id}/edit`}
                                                                className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-200"
                                                                title="Edit"
                                                            >
                                                                <Edit size={16} />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDeleteMember(member)}
                                                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-4 sm:px-6 py-12 text-center text-muted-foreground">
                                                    <Users size={48} className="mx-auto opacity-20 mb-4" />
                                                    <p className="font-medium">Tidak ada pengurus ditemukan</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}


            {/* Member Detail Modal */}
            <DetailMember
                show={showMemberDetailModal}
                onClose={() => setShowMemberDetailModal(false)}
                member={selectedMember}
            />

            {/* Detail Modal */}
            <Detail
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                division={selectedDivision}
                periodYear={periods.find(p => p.id === parseInt(selectedPeriodId))?.year}
            />

            {/* Delete Member Confirmation Modal */}
            {showDeleteMemberModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600 mb-3">
                            <div className="p-1.5 bg-red-50 rounded-lg">
                                <Trash2 size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Hapus Pengurus?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                            Apakah Anda yakin ingin menghapus pengurus <strong>{memberToDelete?.name}</strong>?
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowDeleteMemberModal(false)}
                                className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl font-bold text-sm transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteMember}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-100"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600 mb-3">
                            <div className="p-1.5 bg-red-50 rounded-lg">
                                <Trash2 size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Hapus Divisi?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            Apakah Anda yakin ingin menghapus divisi <strong>{divisionToDelete?.name}</strong>?
                            Semua anggota di dalamnya juga akan terhapus.
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
