import '../styles/SocialSidebar.css';

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <a
        href="https://wa.me/5493815191501"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="social-sidebar-icon"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      <span className="social-sidebar-divider"></span>
      <a
        href="https://instagram.com/levels.gym.tuc"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="social-sidebar-icon"
      >
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  );
}
