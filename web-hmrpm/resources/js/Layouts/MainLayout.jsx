
import Navbar from "../Components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <main className="grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
