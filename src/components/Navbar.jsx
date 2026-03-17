import { useState } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#metodo', label: 'Método' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#planes', label: 'Planes', highlight: true },
    { href: '#sedes', label: 'Sedes & Horarios' },
    { href: '#galeria', label: 'Galería' },
  ];

  const openMenu = () => {
    setMenuOpen(true);
    setClosing(false);
  };

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 300);
  };

  return (
    <>
      <nav className="navbar fixed">
        <div className="navbar-container flex justify-between items-center">
          {/* Logo */}
          <a href="#inicio" className="navbar-logo flex items-center">
            <span>Le </span>
            <img src="/logo-levels.png" alt="Levels Logo" className='relative' />
            <span>els</span>
          </a>

          {/* Links Desktop */}
          <div className="navbar-links hidden items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={link.highlight ? 'highlight' : ''}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5493815191501"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Unirme
            </a>
          </div>

          {/* Hamburguesa */}
          <button onClick={openMenu} className="navbar-hamburger block" aria-label="Abrir menú">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Menú Móvil */}
      {menuOpen && (
        <div className={`mobile-menu fixed flex flex-col justify-center items-center gap-10 ${closing ? 'closing' : ''}`}>
          <button onClick={closeMenu} className="close-btn absolute" aria-label="Cerrar menú">
            &times;
          </button>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5493815191501"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-mobile"
            onClick={closeMenu}
          >
            Unirme Ahora
          </a>
        </div>
      )}
    </>
  );
}
