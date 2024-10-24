import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Components/admin/Home';
import LoginForm from './Components/LoginForm/LoginForm';
import { useEffect, useState } from 'react';
import CreateTable from './Components/Table/CreateTable';
import Header from './Components/shared/Header';
import SearchPage from './Components/admin/SearchPage';
import IndexUser from './Components/admin/user/IndexUser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Kiểm tra localStorage để lấy trạng thái xác thực
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Lưu trạng thái xác thực vào localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Xóa trạng thái xác thực từ localStorage
  };

  const appRouter = createBrowserRouter([
    {
      path: '/Home',
      element: !isAuthenticated ? <Navigate to="/" /> : <Home />,
    },
    {
      path: '/LoginForm',
      element: isAuthenticated ? <Navigate to="/Home" /> : <LoginForm onLogin={handleLogin} />,
    },
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/Home" /> : <LoginForm onLogin={handleLogin} />,
    },
    {
      path: '/CreateTable',
      element: !isAuthenticated ? <Navigate to="/" /> : <CreateTable />,
    },
    {
      path: '/search',
      element: !isAuthenticated ? <Navigate to="/" /> : <SearchPage />,
    },
    {
      path: '/User',
      element: !isAuthenticated ? <Navigate to="/" /> : <IndexUser />,
    },
  ]);

  return (
    <>
      <div>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
