import './App.css';
import { FaUserCircle } from "react-icons/fa";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Components/admin/Home';
import LoginForm from './Components/LoginForm/LoginForm';
import { useState } from 'react';
import CreateTable from './Components/Table/CreateTable';
import Header from './Components/shared/Header';
import SearchPage from './Components/admin/SearchPage';

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
    {
      path: '/search',
      element: <SearchPage  />,
    },
  ]);

  return (
    <>
     
    
      <div>
      <Header/>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
