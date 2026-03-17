import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero bg-levels-deep flex items-center pt-15">
      <div className="hero-grid grid gap-8 items-center">
        {/* Texto */}
        <div>
          <span className="hero-badge inline-block mb-5">
            High Performance Center
          </span>
          <h1 className="hero-title mb-3">
            TÚ <span className="blue-gradient-text">NIVEL</span>
            <br />
            SUPERIOR
          </h1>
          <p className="hero-subtitle mb-4">
            &ldquo;Más que un gimnasio, una filosofía de rendimiento integral en el corazón de Tucumán.&rdquo;
          </p>
          <div className="hero-cta-group flex flex-wrap gap-7">
            <a href="#planes" className="hero-cta-btn flex items-center gap-2">
              Ver Planes
              <i className="fas fa-arrow-right"></i>
            </a>
            <div className="hero-community flex items-center gap-2 pl-5">
              <div className="hero-avatars flex">
                <img src="https://i.pravatar.cc/100?u=1" alt="Usuario" />
                <img src="https://i.pravatar.cc/100?u=2" alt="Usuario" />
                <img src="https://i.pravatar.cc/100?u=3" alt="Usuario" />
              </div>
              <span className="hero-community-text">Comunidad Levels</span>
            </div>
          </div>
        </div>

        {/* Logo Animado */}
        <div className="hero-logo-container flex items-center justify-center">
          <div className="hero-logo-box float-logo flex items-center justify-center">
            <div className="hero-logo-overlay"></div>
            <img src="/logo-levels_hero.png" alt="Levels Logo" />
          </div>
          <div className="hero-logo-blur"></div>
        </div>
      </div>
    </section>
  );
}
