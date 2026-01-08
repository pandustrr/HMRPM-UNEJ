import { useForm, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Login() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        // Force Light Mode for Admin
        document.documentElement.classList.remove("dark");
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-brand-red selection:text-white overflow-hidden relative">
            <Head title="Admin Login | HMRPM" />

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-red/20 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-yellow/10 blur-[120px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-white backdrop-blur-2xl border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">

                    {/* Glassmorphism Shine */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="text-center mb-10" data-aos="fade-down">
                        <img src="/logo.png" alt="HMRPM Logo" className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl" />
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">ADMIN LOGIN</h1>
                        <p className="text-slate-500 text-sm font-medium">Himpunan Mahasiswa Rekayasa Perancangan Mekanik</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div data-aos="fade-up" data-aos-delay="100">
                            <label className="block text-slate-600 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData("username", e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
                                    placeholder="Masukkan username Anda"
                                    autoFocus
                                />
                            </div>
                            {errors.username && <p className="mt-2 text-brand-red text-xs font-bold italic">{errors.username}</p>}
                        </div>

                        <div data-aos="fade-up" data-aos-delay="200">
                            <label className="block text-slate-600 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="mt-2 text-brand-red text-xs font-bold italic">{errors.password}</p>}
                        </div>

                        <div className="pt-4" data-aos="fade-up" data-aos-delay="300">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-linear-to-r from-brand-red to-brand-maroon hover:from-brand-maroon hover:to-brand-red text-white font-black rounded-2xl shadow-xl shadow-brand-red/20 transform hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {processing ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Masuk
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center" data-aos="fade-up" data-aos-delay="400">
                        <a href="/" className="text-muted-foreground/50 hover:text-foreground text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

Login.layout = (page) => page;
