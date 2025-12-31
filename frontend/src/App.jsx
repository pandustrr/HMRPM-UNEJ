import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Divisi from "./pages/Divisi";
import Proker from "./pages/Proker";
import Blog from "./pages/Blog";
import Akademisi from "./pages/Akademisi";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="divisi" element={<Divisi />} />
          <Route path="proker" element={<Proker />} />
          <Route path="blog" element={<Blog />} />
          <Route path="akademisi" element={<Akademisi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
