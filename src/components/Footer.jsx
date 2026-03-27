import '../styles/Footer.css';

const footerLinks = [
  { href: '#metodo', label: 'El Método' },
  { href: '#planes', label: 'Membresías' },
  { href: '#sedes', label: 'Horarios' },
  { href: '#galeria', label: 'Galería' },
];

const developers = [
  {
    name: 'Lautaro Leal',
    github: 'https://github.com/LautaroLeall',
    linkedin: 'https://www.linkedin.com/in/lauldp/',
  },
  {
    name: 'Nahuel Molina',
    github: 'https://github.com/Nahumolher',
    linkedin: 'https://www.linkedin.com/in/nahuel-molina-hernando-5b320b357/',
  },
];

export default function Footer() {
  return (
    <footer className="footer pt-10 pb-5">
      <div className="footer-container grid gap-5">
        {/* Logo + Descripción */}
        <div>
          <div className="footer-logo flex items-center mb-3">
            <span>Le </span>
            <img src="/logo-levels.png" alt="Levels Logo" className='img-footer relative' />
            <span>els</span>
          </div>
          <p className="footer-brand-desc mb-4">
            Entrenamiento de élite en Tucumán. Profesionalismo, ciencia y resultados.
          </p>
          <div className="footer-social flex gap-3">
            <a href="https://www.instagram.com/levels.ar/" target="_blank" rel="noopener noreferrer" className="glass">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/5493815191501" target="_blank" rel="noopener noreferrer" className="glass">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Links rápidos */}
        <div>
          <h5 className="footer-section-title mb-4">Explorar</h5>
          <ul className="footer-links m-0 p-0">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Consultas */}
        <div>
          <h5 className="footer-section-title mb-4">Consultas</h5>
          <p className="footer-consult-text mb-4">¿Listo para subir de nivel?</p>
          <a href="https://wa.me/5493815191501" target="_blank" rel="noopener noreferrer" className="footer-consult-btn inline-block">
            Contactar Coach
          </a>
        </div>
      </div>

      {/* Copyright + Devs */}
      <div className="footer-bottom">
        <div className="footer-copyright-row flex flex-col gap-3 mb-5">
          <p className='mb-5'>&copy; 2024 Levels Argentina.</p>
          <div className="footer-devs flex flex-col">
            <span className="footer-devs-label">Desarrollado por</span>
            <div className="footer-devs-list flex flex-col gap-3">
              {developers.map((dev) => (
                <div key={dev.name} className="footer-dev flex items-center gap-3 ">
                  <span className="footer-dev-name">{dev.name}</span>
                  <div className="footer-dev-links flex gap-2">
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${dev.name}`}>
                      <i className="fab fa-github"></i>
                    </a>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${dev.name}`}>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
