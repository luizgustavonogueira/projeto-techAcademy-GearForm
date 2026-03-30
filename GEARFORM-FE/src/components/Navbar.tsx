import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";



import { Link } from "react-router-dom";




const Navbar: React.FC = () => {
  const navigate = useNavigate(); // ✅ Hook fora do return

  return (
    <nav className="navbar">
      <div className="logo">
        GEAR<span>FORM</span>
      </div>

      <ul className="nav-links">
        <Link to="/">Home</Link>
        <li><a href="/pages/CoursesPage.tsx">Cursos</a></li>
        <li><a href="#">Trilhas</a></li>
        <li><a href="#">Instrutores</a></li>
        <li><a href="#">Blog</a></li>
      </ul>

      <button className="nav-btn" onClick={() => navigate("/login")}>
        ENTRAR
      </button>
    </nav>
  );
};

export default Navbar;