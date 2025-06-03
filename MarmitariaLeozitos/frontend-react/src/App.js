import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import CadastrarMarmita from './Pages/CadastrarMarmita';
import Endereco from './Pages/Endereco';
import About from './Pages/About';
import PerfilUsuario from './Pages/PerfilUsuario'; // ✅

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignIn />} />

        {/* Página pública "Sobre" com layout */}
        <Route path="/about" element={<Layout />}>
          <Route index element={<About />} />
        </Route>

        {/* Página protegida do colaborador */}
        <Route path="/cadastrar-marmita" element={
          <AdminRoute>
            <Layout />
          </AdminRoute>
        }>
          <Route index element={<CadastrarMarmita />} />
        </Route>

        {/* Página protegida do cliente - endereço */}
        <Route path="/endereco" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<Endereco />} />
        </Route>

        {/* Página protegida do cliente - home */}
        <Route path="/home" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<MainPage />} />
        </Route>

        {/* ✅ Página protegida do cliente - perfil */}
        <Route path="/perfil" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<PerfilUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

