const Proker = () => {
    const prokers = [
        {
            division: "PSDM",
            programs: [
                { name: "Latihan Dasar Kepemimpinan", status: "Terlaksana", date: "Januari 2025" },
                { name: "Upgrading Staff", status: "Akan Datang", date: "Februari 2025" },
            ]
        },
        {
            division: "Kominfo",
            programs: [
                { name: "Maintenance Website", status: "Berjalan", date: "Setiap Bulan" },
                { name: "Pelatihan Desain Grafis", status: "Akan Datang", date: "Maret 2025" },
            ]
        },
        {
            division: "Hubungan Luar",
            programs: [
                { name: "Studi Banding", status: "Perencanaan", date: "April 2025" }
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-4xl font-bold text-foreground mb-12">Program Kerja</h1>

            <div className="space-y-12">
                {prokers.map((section, idx) => (
                    <div key={idx} className="bg-card rounded-2xl p-8 border border-border">
                        <h2 className="text-2xl font-bold text-brand-yellow mb-6 border-b border-border pb-4">
                            Divisi {section.division}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-muted-foreground border-b border-border">
                                        <th className="pb-4 pl-4">Nama Program</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="text-foreground">
                                    {section.programs.map((prog, pIdx) => (
                                        <tr key={pIdx} className="hover:bg-muted/50 transition-colors">
                                            <td className="py-4 pl-4 font-medium">{prog.name}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                     ${prog.status === 'Terlaksana' ? 'bg-green-900 text-green-200' :
                                                        prog.status === 'Berjalan' ? 'bg-blue-900 text-blue-200' :
                                                            'bg-yellow-900 text-yellow-200'
                                                    }
                                  `}>
                                                    {prog.status}
                                                </span>
                                            </td>
                                            <td className="py-4">{prog.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Proker;
