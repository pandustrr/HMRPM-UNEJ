import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-red to-brand-yellow bg-clip-text text-transparent mb-4">
                            HMRPM
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Himpunan Mahasiswa - Mewadahi aspirasi dan kreativitas mahasiswa untuk masa depan yang lebih baik.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4 text-lg">Menu</h4>
                        <div className="flex flex-col space-y-2">
                            <Link to="/about" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">About Us</Link>
                            <Link to="/divisi" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">Struktur Organisasi</Link>
                            <Link to="/proker" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">Program Kerja</Link>
                            <Link to="/blog" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">Blog & Berita</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4 text-lg">Hubungi Kami</h4>
                        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <p>Email: info@hmrpm.org</p>
                            <p>Instagram: @hmrpm_official</p>
                            <p>Kampus Tegalboto, Jember</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} HMRPM. All rights reserved.</p>
                    <p>Designed for Excellence</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
