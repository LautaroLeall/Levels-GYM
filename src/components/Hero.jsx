import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero bg-levels-deep flex items-center pt-20">
      <div className="hero-grid grid gap-10 items-center">
        {/* Texto */}
        <div>
          <span className="hero-badge inline-block mb-8">
            Centro de alto rendimiento
          </span>
          <h1 className="hero-title mb-3">
            TÚ <span className="blue-gradient-text">NIVEL</span>
            <br />
            SUPERIOR
          </h1>
          <p className="hero-subtitle mb-5">
            &ldquo;No es solo un gimnasio. Es donde llevás tu rendimiento al siguiente nivel.&rdquo;
          </p>
          <div className="hero-cta-group flex flex-wrap gap-7">
            <a href="#planes" className="hero-cta-btn flex items-center gap-2">
              Ver Planes
              <i className="fas fa-arrow-right"></i>
            </a>
            <div className="hero-community flex items-center gap-2 pl-5">
              <div className="hero-avatars flex">
                <img src="/comunidad/comunidad_1.jpg" alt="Usuario" />
                <img src="/comunidad/comunidad_2.jpg" alt="Usuario" />
                <img src="/comunidad/comunidad_3.jpg" alt="Usuario" />
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
