import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metodo from './components/Metodo';
import Planes from './components/Planes';
import Horarios from './components/Horarios';
import Servicios from './components/Servicios';
import Inscripcion from './components/Inscripcion';
import Galeria from './components/Galeria';
import Sedes from './components/Sedes';
import Footer from './components/Footer';

import SocialSidebar from './components/SocialSidebar';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Metodo />
      <Servicios />
      <Horarios />
      <Planes />
      <Sedes />
      <Galeria />
      <Inscripcion />
      <Footer />

      <SocialSidebar />
    </div>
  );
}
