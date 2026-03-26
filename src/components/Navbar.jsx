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
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <a href="#inicio" className="navbar-logo">
            <span>Le </span>
            <img src="/logo-levels.png" alt="Levels Logo" />
            <span>els</span>
          </a>

          {/* Links Desktop */}
          <div className="navbar-links">
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
          <button onClick={openMenu} className="navbar-hamburger" aria-label="Abrir menú">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className={`mobile-overlay ${closing ? 'closing' : ''}`}
          onClick={closeMenu}
        />
      )}

      {/* Menú Móvil */}
      {menuOpen && (
        <div className={`mobile-menu ${closing ? 'closing' : ''}`}>
          <button onClick={closeMenu} className="close-btn" aria-label="Cerrar menú">
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
