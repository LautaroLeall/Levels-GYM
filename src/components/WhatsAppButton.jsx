import '../styles/WhatsAppButton.css';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493815191501"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn fixed flex justify-center items-center"
      aria-label="Chat por WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
