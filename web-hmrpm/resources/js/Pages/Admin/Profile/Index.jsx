import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Save, User as UserIcon, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ProfileIndex = ({ user }) => {
    // Form for Profile Info
    const profileForm = useForm({
        name: user.name || "",
        username: user.username || "",
    });

    // Form for Password Update
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updateProfile = (e) => {
        e.preventDefault();
        profileForm.put(route("admin.profile.update"), {
            preserveScroll: true,
            onSuccess: () => profileForm.reset("password"),
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();
        passwordForm.put(route("admin.profile.password.update"), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <>
            <Head title="Pengaturan Profil | HMRPM Admin" />
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-1 uppercase">PENGATURAN PROFIL</h1>
                    <p className="text-slate-500 text-sm font-medium">Kelola informasi akun dan keamanan kata sandi Anda.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* General Profile Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <UserIcon size={120} strokeWidth={4} />
                            </div>

                            <form onSubmit={updateProfile} className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                                        <UserIcon size={20} />
                                    </div>
                                    <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">Informasi Dasar</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Nama Administrator</label>
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData("name", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {profileForm.errors.name && <p className="text-brand-red text-[10px] font-bold flex items-center gap-2 mt-1 px-1"><AlertCircle size={10} /> {profileForm.errors.name}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Username Akun</label>
                                        <input
                                            type="text"
                                            value={profileForm.data.username}
                                            onChange={(e) => profileForm.setData("username", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                                            placeholder="Masukkan username"
                                        />
                                        {profileForm.errors.username && <p className="text-brand-red text-[10px] font-bold flex items-center gap-2 mt-1 px-1"><AlertCircle size={10} /> {profileForm.errors.username}</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-brand-red text-white rounded-2xl font-black text-xs transition-all shadow-xl hover:shadow-brand-red/20 disabled:opacity-50 group uppercase tracking-widest"
                                >
                                    <Save size={18} className="group-hover:scale-110 transition-transform" />
                                    {profileForm.processing ? "Menyimpan..." : "Simpan Profil"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <Lock size={120} strokeWidth={4} />
                            </div>

                            <form onSubmit={updatePassword} className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">Ubah Password</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Password Saat Ini</label>
                                        <input
                                            type="password"
                                            value={passwordForm.data.current_password}
                                            onChange={(e) => passwordForm.setData("current_password", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                        {passwordForm.errors.current_password && <p className="text-brand-red text-[10px] font-bold flex items-center gap-2 mt-1 px-1"><AlertCircle size={10} /> {passwordForm.errors.current_password}</p>}
                                    </div>

                                    <div className="h-px bg-slate-100 my-2"></div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Password Baru</label>
                                        <input
                                            type="password"
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData("password", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                        {passwordForm.errors.password && <p className="text-brand-red text-[10px] font-bold flex items-center gap-2 mt-1 px-1"><AlertCircle size={10} /> {passwordForm.errors.password}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Konfirmasi Password Baru</label>
                                        <input
                                            type="password"
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) => passwordForm.setData("password_confirmation", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-brand-red text-white rounded-2xl font-black text-xs transition-all shadow-xl hover:shadow-brand-red/20 disabled:opacity-50 group uppercase tracking-widest"
                                >
                                    <Lock size={18} className="group-hover:scale-110 transition-transform" />
                                    {passwordForm.processing ? "Memproses..." : "Update Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Layout specification
ProfileIndex.layout = (page) => <AdminLayout children={page} />;

export default ProfileIndex;
