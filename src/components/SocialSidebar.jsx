import '../styles/SocialSidebar.css';

export default function SocialSidebar() {
  return (
    <div className="social-sidebar fixed flex flex-col justify-center items-center gap-2">
      <a
        href="https://wa.me/5493815191501"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="social-sidebar-icon flex items-center justify-center"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      <span className="social-sidebar-divider"></span>
      <a
        href="https://www.instagram.com/levels.ar/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="social-sidebar-icon flex items-center justify-center"
      >
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  );
}
