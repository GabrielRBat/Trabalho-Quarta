import axios from "axios";
import { useEffect, useState } from "react";
import MarmitaItemCard from "./MarmitaItemCard.jsx";
import { useMessage } from '../Context/MessageContext';
import Message from "./Message.jsx";


function MarmitaCard({ searchTerm }) {
  const [marmitas, setMarmitas] = useState([]);
  const [marmitaAdded, setMarmitaAdd] = useState("");
  const { showMessage, message, clearMessage } = useMessage();


  useEffect(() => {
    const buscarMarmitas = async () => {
      try {
        const response = await axios.get("http://localhost:5294/api/buscar-todas-marmitas");
        let lista = response.data;

        if (searchTerm?.trim()) {
          lista = lista.filter((m) =>
            m.descricao.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
        } else {
          lista = lista.sort(() => 0.5 - Math.random()).slice(0, 6);
        }

        setMarmitas(lista);
      } catch (error) {
        console.error("Erro ao buscar as marmitas", error);
      }
    };

    buscarMarmitas();
  }, [searchTerm]); 

  useEffect(() => {
    if (marmitaAdded) {
      showMessage(`Item ${marmitaAdded} adicionado ao carrinho!`);
    }
  }, [marmitaAdded]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {message && <Message msg = {message} onClose={clearMessage}/>}
      {marmitas.map((marmita) => (
        <MarmitaItemCard key={marmita.id} marmita={marmita} setMarmitaAdd={setMarmitaAdd} />
      ))}
    </div>
  );
}

export default MarmitaCard;
