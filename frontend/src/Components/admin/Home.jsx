import React from 'react';
import Sidebar from '../shared/sidebar';
import { MdOutlineAddCircle } from "react-icons/md";
import Table from '../Table/TableForm';
import { FaUserTag } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1>RÉGLAGES ET UTILISATEURS</h1>
        <div className="flex-container">
          <div className="left-text">
            <span className="large-text">Accuell</span>
            <span> {'>'} </span>
            <span className="faded-text">Réglages</span>
          </div>
        </div>
        <div className="right-text">
          <div className='NOUVEL'><a href="CreateTable"><MdOutlineAddCircle />NOUVEL UTILISATEUR </a></div>
          <div className='GESTION'> <a href=""><FaUserTag />GESTION DES DROITS</a></div>
        </div>
        <Table />

      </div>
    </div>
  );
};

export default Home;
