
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <main className="grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
