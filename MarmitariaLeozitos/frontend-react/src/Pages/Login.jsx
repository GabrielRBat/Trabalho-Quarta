import React, { useState } from 'react';
import Carousel from '../Components/Carousel';
import axios from 'axios';
import InputField from '../Components/InputField';
import ErrorMessage from '../Components/ErrorMessage';
import Message from '../Components/Message';
import { useNavigate } from 'react-router-dom';
import { useError } from '../Context/ErrorContext';
import { useMessage } from '../Context/MessageContext';

function Login() {
  const { showError, errorMsg, clearError } = useError();
  const { showMessage, message, clearMessage } = useMessage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === '' || formData.senha === '') {
      showError("Um ou mais campos se encontra vazio.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5294/api/validar-login", formData);
      const user = response.data;

      if (user) {
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("logado", true);
        localStorage.setItem("userType", user.tipo);
        localStorage.setItem("user", user.id);

        setFormData({ email: '', senha: '' });

        if (user.tipo === 1) {
          navigate('/cadastrar-marmita');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      showError("Erro ao tentar efetuar login: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className='min-h-screen flex justify-end bg-orange-500'>
      {errorMsg && (
        <ErrorMessage msg={errorMsg} onClose={clearError} />
      )}
      {message && (
        <Message msg={message} onClose={clearMessage} />
      )}

      <div className="w-2/3 flex items-center justify-center bg-orange-500">
        <Carousel />
      </div>

      <div className="min-h-screen w-1/3 flex justify-center items-center bg-white p-8 shadow-lg">
        <form className="w-full max-w-sm flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            <img src="/leozitos marmitaria.png" alt="Logo" className="h-50 w-auto object-contain" />
            <h3 className='text-red-500 font-bold mb-4'>Peça já sua marmita!</h3>
          </div>

          <h2 className="text-4xl font-bold text-center text-black-500 mb-4">Seja bem vindo!</h2>

          <InputField
            label="Email:"
            id="email"
            type="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <InputField
            label="Senha:"
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          />

          <div className="flex flex-col gap-2 mt-10">
            <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition">
              Entrar
            </button>
            <a href="/cadastro" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition text-center">
              Cadastrar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
