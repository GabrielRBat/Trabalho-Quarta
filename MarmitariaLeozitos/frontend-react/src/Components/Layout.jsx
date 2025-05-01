import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useMessage } from '../Context/MessageContext';
import Message from './Message';
import { useState } from 'react';

function Layout() {
  const { message, clearMessage } = useMessage();
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <div className="min-h-screen flex flex-col relative">
      {message && <Message msg={message} onClose={clearMessage} />}
      
      <Header onSearch={setSearchTerm} /> 
      <main className="flex-1 p-4">
        <Outlet context={{ searchTerm }} /> 
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
