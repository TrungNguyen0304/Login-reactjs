import React from 'react';
import { MdOutlineAddCircle } from "react-icons/md";
import { FaUserTag } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // Import Link if using React Router
import Table from '@/Components/Table/TableForm';
import Sibader from '@/Components/inc/Sidebar';

const IndexUser = () => {
    return (
        <div className="home-container">
            <Sibader />
            <div className="content">
                <h1>RÉGLAGES ET UTILISATEURS</h1>
                <div className="flex-container">
                    <div className="left-text">
                        <span className="large-text">Accueil</span>
                        <span> {'>'} </span>
                        <span className="faded-text">Réglages</span>
                    </div>
                </div>
                <div className="right-text">
                    <div className='nouvel'>
                        <Link to="/CreateTable">
                            <MdOutlineAddCircle /> NOUVEL UTILISATEUR 
                        </Link>
                    </div>
                    <div className='gestion'>
                        <Link to="/gestion-droits">
                            <FaUserTag /> GESTION DES DROITS
                        </Link>
                    </div>
                </div>
                <Table />
            </div>
        </div>
    );
}

export default IndexUser;
