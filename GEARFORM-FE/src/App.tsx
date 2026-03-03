import { useState } from 'react'
import bgVideo from "./assets/fundo.mp4";
import reactLogo from './assets/react.svg'
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
    <>
      <div className="app">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <Navbar />

        <div className="content">
          <section className="hero">
            <div className="hero-grid-bg"></div>
            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>

            <div
              className="glow-line"
              style={{ width: "60%", top: "30%", left: "20%" }}
            ></div>

            <div
              className="glow-line"
              style={{
                width: "40%",
                top: "70%",
                left: "40%",
                animationDelay: "1.5s",
              }}
            ></div>

            <div className="hero-content">
              <div className="hero-tag">★ PLATAFORMA EDUCACIONAL DO FUTURO</div>

              <h1>
                <span className="line1">SEJA</span>
                <span className="line2">MELHOR</span>
                <span className="line3">Em tudo</span>
              </h1>

              <p>
                Cursos intensivos com instrutores de elite. Aprenda na velocidade do
                mercado. Construa o portfólio que vai mudar sua carreira.
              </p>

              <div className="hero-btns">
                <button className="btn-primary">EXPLORAR CURSOS</button>

                <button className="btn-ghost">
                  <div className="play-icon">▶</div>
                  <span>Ver Demo</span>
                </button>
              </div>
            </div>
          </section>
          
        </div>
 <Marquee />  
        
      </div>
      



    </>
  );
}

export default App
