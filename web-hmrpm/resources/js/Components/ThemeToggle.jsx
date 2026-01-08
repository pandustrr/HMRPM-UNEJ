import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "dark";
        }
        return "dark";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun size={20} className="text-brand-yellow" />
            ) : (
                <Moon size={20} className="text-brand-red" />
            )}
        </button>
    );
};

export default ThemeToggle;
