import { useState } from 'react';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useCart } from '../Context/CartContext';
import { useMessage } from '../Context/MessageContext';
import SearchBar from './SearchBar';


function Header({ onSearch }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { showMessage } = useMessage();
  const total = cartItems.reduce((sum, item) => sum + item.valor * item.quantidade, 0);
  const userType = localStorage.getItem("userType");

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center font-sans">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/leozitos marmitaria.png" alt="Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Botão mobile */}
        <button
          className="cs:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Menu desktop */}
        <nav className="hidden cs:flex gap-8 text-black font-medium absolute left-1/2 transform -translate-x-1/2">
          <a href="/home" className="hover:text-red-500 transition">Marmitas</a>
          <a href="/About" className="hover:text-red-500 transition">Sobre nós</a>
          {userType == 1 && <a href="/cadastrar-marmita" className="hover:text-red-500 transition">Cadastrar Marmita</a>}
        </nav>

        {/* Ícones */}
        <div className="flex items-center gap-4">
          <SearchBar onSearch={onSearch} />
          <a href="/endereco"><MapPinIcon className="h-5 w-5 text-gray-700 cursor-pointer" /></a>
          <a href="/Perfil"><UserIcon className="h-5 w-5 text-gray-700 cursor-pointer" /></a>

          <button
            className="group flex items-center px-4 py-1.5 rounded-full 
              bg-red-600 text-white hover:bg-white hover:text-black 
              border border-red-600 transition hover:animate-bounce-soft"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition" />
            <span className="hidden md:inline">Seu carrinho</span>
          </button>
        </div>
      </header>

      {/* Menu mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="cs:hidden fixed top-20 left-0 w-full bg-white shadow-md z-40 py-4 px-6 space-y-4 text-black font-medium">
          <a href="/home" className="block hover:text-red-500 transition">Marmitas</a>
          <a href="/About" className="block hover:text-red-500 transition">Sobre nós</a>
          {userType == 1 && <a href="/cadastrar-marmita" className="block hover:text-red-500 transition">Cadastrar Marmita</a>}
        </div>
      )}

      {/* Painel lateral do carrinho */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
  <div className="p-4 flex justify-between items-center border-b">
    <h2 className="text-xl font-bold">Seu carrinho</h2>
    <button onClick={() => setCartOpen(false)}>
      <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-black" />
    </button>
  </div>

  <div className="p-4 flex flex-col h-[calc(100%-64px)] justify-between">
    {cartItems.length === 0 ? (
      <p className="text-gray-600">Você ainda não adicionou itens.</p>
    ) : (
      <>
        <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-start border-b pb-2">
              <div>
                <p className="font-medium">{item.descricao}</p>
                <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    –
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm bg-red-200 px-2 py-1 rounded hover:bg-red-300 text-red-800"
                  >
                    Remover
                  </button>
                </div>
              </div>
              <span className="text-red-600 font-semibold whitespace-nowrap mt-1">
                R$ {(item.valor * item.quantidade).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        {/* Total e botão finalizar */}
        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg font-bold mb-4">Total: R$ {total.toFixed(2)}</p>
          <button
            onClick={() => {
              clearCart();
              setCartOpen(false);
              showMessage("Compra finalizada com sucesso!");
            }}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Finalizar compra
          </button>
        </div>
      </>
    )}
  </div>
</div>

      {/* Fundo escurecido */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
