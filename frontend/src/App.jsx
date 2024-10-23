import './App.css';
import { FaUserCircle } from "react-icons/fa";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Components/admin/Home';
import LoginForm from './Components/LoginForm/LoginForm';
import { useState } from 'react';
import CreateTable from './Components/Table/CreateTable';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Quản lý trạng thái xác thực

  const appRouter = createBrowserRouter([
    // {
    //   path: '/Home',
    //   element: isAuthenticated ? <Home /> : <Navigate to="/" />, // Chuyển hướng nếu chưa xác thực
    // },
    // {
    //   path: '/LoginForm',
    //   element: !isAuthenticated ? <LoginForm onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/Home" />, // Nếu đã xác thực, chuyển hướng đến Home
    // },
    // {
    //   path: '/',
    //   element: !isAuthenticated ? <LoginForm onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/Home" />, // Nếu đã xác thực, chuyển hướng đến Home
    // },
    // {
    //   path: '/CreateTable',
    //   element: <CreateTable />,
    // },
    {
      path: '/CreateTable',
      element: <CreateTable />,
    },
    {
      path: '/',
      element: <LoginForm />,
    },
    {
      path: '/Home',
      element: <Home />,
    },
    {
      path: '/LoginForm',
      element: <LoginForm />,
    },
  ]);

  return (
    <>
      <header>
        <div className='container'>
          <div className='logo'>
            <a href="/Home">
              <img src="/img/premium-logo-black@3x.png" alt="Logo" />
            </a>
          </div>

          <div className='right-section'>
            <div className='search'>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                style={{
                  padding: '5px',
                  borderRadius: '5px',
                  border: '1px solid #CC9900',
                  outline: 'none',
                }}
              />
              <button onClick={() => { /* Thêm chức năng tìm kiếm ở đây */ }}>
                <img src="/img/picto-rechercher.png" alt="" />
              </button>
            </div>
            <div className='fr'>
              <img src="/img/fr@2x.png" alt="" />
              <p>Francais</p>
            </div>
            <div className='icon'>
              <a href="/LoginForm" style={{ textDecoration: 'none' }}>
                <FaUserCircle style={{ fontSize: '30px', marginLeft: '10px', color: '#CC9900' }} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
