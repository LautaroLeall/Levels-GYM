import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero bg-levels-deep">
      <div className="hero-grid">
        {/* Texto */}
        <div data-aos="fade-right" data-aos-duration="1000">
          <span className="hero-badge">
            Professional Training &amp; Recovery
          </span>
          <h1 className="hero-title">
            TÚ <span className="blue-gradient-text">NIVEL</span>
            <br />
            SUPERIOR
          </h1>
          <p className="hero-subtitle">
            &ldquo;Más que un gimnasio, una filosofía de rendimiento integral en el corazón de Tucumán.&rdquo;
          </p>
          <div className="hero-cta-group">
            <a href="#planes" className="hero-cta-btn">
              Ver Planes
              <i className="fas fa-arrow-right"></i>
            </a>
            <div className="hero-community">
              <div className="hero-avatars">
                <img src="https://i.pravatar.cc/100?u=1" alt="Usuario" />
                <img src="https://i.pravatar.cc/100?u=2" alt="Usuario" />
                <img src="https://i.pravatar.cc/100?u=3" alt="Usuario" />
              </div>
              <span className="hero-community-text">Comunidad Levels</span>
            </div>
          </div>
        </div>

        {/* Logo Animado */}
        <div className="hero-logo-container" data-aos="zoom-in" data-aos-duration="1200">
          <div className="hero-logo-box float-logo">
            <div className="hero-logo-overlay"></div>
            <img src="/logo-levels.png" alt="Levels Logo" />
          </div>
          <div className="hero-logo-blur"></div>
        </div>
      </div>
    </section>
  );
}
