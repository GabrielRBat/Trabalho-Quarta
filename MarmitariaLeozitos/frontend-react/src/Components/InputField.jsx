import React, { useState } from 'react';

function InputField({ label, id, type = "text", placeholder, value, onChange}) {

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type === "cep" ? "text" : type}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
