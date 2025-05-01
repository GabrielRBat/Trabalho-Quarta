import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#F6F3EA' }} className="text-gray-800 py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-12 text-center md:text-left">
        {/* Logo + Nome */}
        <div className="flex items-center gap-3">
          <img
            src="/leozitos marmitaria.png"
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
          <div>
            <h2 className="text-lg font-bold">Marmitaria Leozitos</h2>
            <p className="text-sm text-gray-600">Comida caseira com amor desde 2023</p>
          </div>
        </div>

        {/* Links */}
        <ul className="flex gap-6 text-sm">
          <li><a href="/About" className="hover:text-red-500 transition">Sobre</a></li>
          <li><a href="#" className="hover:text-red-500 transition">Contato</a></li>
          <li><a href="#" className="hover:text-red-500 transition">Ajuda</a></li>
        </ul>

        {/* Redes sociais */}
        <div className="flex gap-4">
          <a href="#"><img src="/facebook.svg" alt="Facebook" className="h-6 w-6" /></a>
          <a href="#"><img src="/instagram.svg" alt="Instagram" className="h-6 w-6" /></a>
          <a href="#"><img src="/whatsapp.svg" alt="WhatsApp" className="h-6 w-6" /></a>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        © 2025 Marmitaria Leozitos. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
