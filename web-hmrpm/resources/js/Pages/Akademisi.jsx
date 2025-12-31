const Akademisi = () => {
    const lecturers = [
        { name: "Dr. Budi Santoso, M.Kom", role: "Kaprodi", nip: "19800101..." },
        { name: "Siti Aminah, S.T., M.T.", role: "Dosen Pembimbing", nip: "19850202..." },
        { name: "Rudi Hartono, M.Cs.", role: "Dosen", nip: "19900303..." },
    ];

    const technicians = [
        { name: "Ahmad Junaedi", role: "Teknisi Lab RPL" },
        { name: "Dewi Sartika", role: "Laboran" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
                Akademisi <span className="text-brand-red">Prodi</span>
            </h1>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                Daftar Dosen dan Teknisi yang mendukung kegiatan akademik di lingkungan Program Studi.
            </p>

            <div className="mb-20">
                <h2 className="text-2xl font-bold text-brand-yellow mb-8 border-b border-border pb-2">Dosen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lecturers.map((dosen, idx) => (
                        <div key={idx} className="bg-card p-6 rounded-lg flex items-center space-x-4 hover:bg-card/80 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-brand-maroon flex items-center justify-center text-xl font-bold text-white">
                                {dosen.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">{dosen.name}</h3>
                                <p className="text-sm text-brand-yellow">{dosen.role}</p>
                                <p className="text-xs text-muted-foreground">{dosen.nip}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-brand-yellow mb-8 border-b border-border pb-2">Teknisi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technicians.map((tek, idx) => (
                        <div key={idx} className="bg-card p-6 rounded-lg flex items-center space-x-4 hover:bg-card/80 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-xl font-bold text-foreground">
                                {tek.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">{tek.name}</h3>
                                <p className="text-sm text-muted-foreground">{tek.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Akademisi;
