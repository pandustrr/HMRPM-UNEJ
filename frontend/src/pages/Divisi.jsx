const Divisi = () => {
    const divisions = [
        {
            name: "Pengurus Harian",
            members: ["Ketua Umum", "Wakil Ketua", "Sekretaris", "Bendahara"],
            color: "bg-brand-red text-white",
        },
        {
            name: "Divisi PSDM",
            members: ["Koordinator", "Staf Pengembangan", "Staf Kaderisasi"],
            color: "bg-brand-maroon text-white",
        },
        {
            name: "Divisi Kominfo",
            members: ["Koordinator", "Staf Media", "Staf Publikasi"],
            color: "bg-card border border-border text-foreground",
        },
        {
            name: "Divisi Hubungan Luar",
            members: ["Koordinator", "Staf Humas", "Staf Kerjasama"],
            color: "bg-card border border-border text-foreground",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-4xl font-bold text-foreground mb-12 text-center">
                Struktur <span className="text-brand-yellow">Organisasi</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {divisions.map((div, idx) => (
                    <div key={idx} className={`p-8 rounded-xl ${div.color} relative overflow-hidden group`}>
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-foreground">
                            {idx + 1}
                        </div>

                        <h2 className="text-2xl font-bold mb-6 relative z-10">{div.name}</h2>
                        <ul className="space-y-3 relative z-10">
                            {div.members.map((member, mIdx) => (
                                <li key={mIdx} className="flex items-center opacity-90">
                                    <span className="w-2 h-2 rounded-full bg-brand-yellow mr-3"></span>
                                    {member}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Divisi;
