import React, { useState, useEffect } from 'react'
import InputField from '../Components/InputField'
import InputFieldCep from '../Components/InputFieldCep'
import ErrorMessage from '../Components/ErrorMessage';
import Message from '../Components/Message';
import { useError } from '../Context/ErrorContext';
import { useMessage } from '../Context/MessageContext';
import axios from 'axios';


function Endereco() {
  const id = localStorage.getItem("user");
  const { showError, errorMsg, clearError } = useError();
  const { showMessage, message, clearMessage } = useMessage();
  const [formData, setFormData] = useState(
    {
      cep: '',
      rua: '',
      numero: '',
      complemento: ''
    }
  );

  useEffect(() => {
    const buscarLogradouro = async () => {
      try {
        const response = await axios.get(`http://localhost:5294/api/buscar-logradouro/${id}`);
        const dados = response.data;
        setFormData({
          cep: dados.cep,
          rua: dados.rua,
          numero: dados.numero,
          complemento: dados.complemento
        });

      } catch (error) {
        console.error("Erro ao buscar logradouro", error);
        showError("Erro ao buscar logradouro: " + (error.response?.data || error.message));
      }
    };

    buscarLogradouro();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(formData.cep == '' || formData.rua == '' || formData.numero == '' || formData.complemento == '') {
        showError("Um ou mais campos se encontra vazio.");
        return;
      }

    try {
      const response = await axios.put(`http://localhost:5294/api/alterar-usuario/${id}`, formData);
      console.log("Endereço registrado com sucesso:", response.data);
      showMessage("Endereço registrado com sucesso!");

    } catch (error) {
      showError("Erro ao cadastrar logradouro: " + JSON.stringify(error.response?.data || error.message));
      return;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
       {errorMsg && (
        <ErrorMessage msg={errorMsg} onClose={clearError} />
      )}
      {message && (
        <Message msg={message} onClose={clearMessage} />
      )}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col">
        <h1 className='text-red-500 text-2xl font-bold text-center mb-6'>Endereço</h1>
        <form onSubmit={handleSubmit}>
        <InputFieldCep
          label="CEP:"
          id="cep"
          type="cep"
          placeholder="Digite seu CEP apenas números!"
          setFormData={setFormData}
          value={formData.cep}
          onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
        />

        <div className="flex flex-col mb-4">
          <label htmlFor="rua" className="mb-1 font-medium text-gray-700">Rua:</label>
          <input
            id="rua"
            type="text"
            value={formData.rua}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder='Rua teste..'
            onChange={(e) => setFormData({ ...formData, rua: e.target.value })}  
          />
        </div>

        <InputField
            label="Nº:"
            id="numero"
            type="text"
            placeholder="112"
            value = {formData.numero}
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}  
          />

          <InputField
            label="Complemento:"
            id="complemento"
            type="text"
            placeholder="Apartamento 1.."
            value = {formData.complemento}
            onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}  
          />

          <div className="flex flex-col gap-2 mt-10">
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition active:animate-ping-once"
            >
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Endereco