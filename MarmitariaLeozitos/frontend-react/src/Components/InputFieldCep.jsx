import React from 'react';
import axios from 'axios';

function InputFieldCep({ label, id, type = "text", placeholder, setFormData, value, onChange }) {
  
  const alteracoesCep = async (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);

    // Formata o CEP com hífen
    const formattedCep = val.length >= 6 ? val.slice(0, 5) + '-' + val.slice(5) : val;

    onChange({ target: { value: formattedCep } });

    if (val.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${val}/json/`);
        const data = response.data;

        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro,
            cep: formattedCep,
            complemento: data.complemento || '',
          }));
        } else {
          console.warn("CEP não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      }
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder={placeholder}
        value={value}
        onChange={alteracoesCep}
      />
    </div>
  );
}

export default InputFieldCep;
