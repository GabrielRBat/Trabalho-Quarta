import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../Context/MessageContext';
import { useError } from '../Context/ErrorContext';
import axios from 'axios';

function PerfilUsuario() {
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { showError } = useError();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  useEffect(() => {
    if (!userId) {
      showError("Usuário não autenticado.");
      return;
    }

    axios.get(`http://localhost:5294/api/buscar-usuario/${userId}`)
      .then(res => {
        setNome(res.data.nome);
        setEmail(res.data.email);
      })
      .catch(() => showError("Erro ao carregar dados do usuário."));
  }, [userId, showError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email) {
      showError("Nome e email são obrigatórios.");
      return;
    }

    if (senha && senha !== confirmarSenha) {
      showError("As senhas não coincidem.");
      return;
    }

    const payload = {
      nome,
      email,
      senha: senha.trim() === "" ? null : senha
    };

    try {
      const res = await axios.put(`http://localhost:5294/api/atualizar-usuario/${userId}`, payload);
      showMessage("Perfil atualizado com sucesso!");
      setSenha("");
      setConfirmarSenha("");
    } catch {
      showError("Erro ao salvar os dados.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-xl w-full max-w-xl">
        <h1 className="text-5xl font-bold mb-6 text-center pt-16 text-red-500">Meu Perfil</h1>

        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          className="w-full border rounded px-4 py-2 mb-4"
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">E-mail</label>
        <input
          className="w-full border rounded px-4 py-2 mb-4"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Nova senha</label>
        <div className="relative mb-4">
          <input
            className="w-full border rounded px-4 py-2"
            type={verSenha ? "text" : "password"}
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button type="button" onClick={() => setVerSenha(!verSenha)} className="absolute right-2 top-2 text-sm">
            {verSenha ? "👁️" : "🙈"}
          </button>
        </div>

        <label className="block text-sm font-medium mb-1">Confirmar nova senha</label>
        <div className="relative mb-6">
          <input
            className="w-full border rounded px-4 py-2"
            type={verConfirmar ? "text" : "password"}
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
          />
          <button type="button" onClick={() => setVerConfirmar(!verConfirmar)} className="absolute right-2 top-2 text-sm">
            {verConfirmar ? "👁️" : "🙈"}
          </button>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Salvar alterações
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-red-100"
          >
            Sair
          </button>
        </div>
      </form>
    </div>
  );
}

export default PerfilUsuario;
