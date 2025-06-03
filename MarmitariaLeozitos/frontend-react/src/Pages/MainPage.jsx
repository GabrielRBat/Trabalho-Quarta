import { useOutletContext } from 'react-router-dom';
import MarmitaCard from "../Components/MarmitaCard";

function MainPage() {
  const { searchTerm } = useOutletContext(); 

  return (
    <main className="flex flex-col items-center gap-8 p-8 mt-20">
      <MarmitaCard searchTerm={searchTerm} />
    </main>
  );
}

export default MainPage;
