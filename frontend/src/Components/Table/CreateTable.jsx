import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sibader from '../shared/Sidebar';
import './CreateTable.css';

const CreateTable = () => {
    const [userData, setUserData] = useState({
        civilite: '',
        lastname: '',
        firstname: '',
        email: '',
        maison: '',
        droitGroupe: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                // User created successfully, redirect to Home
                navigate('/home'); // Update with your actual home route
            } else {
                const data = await response.json();
                console.error(data.message);
                alert(data.message); // Show an error message if needed
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.'); // Handle any other errors
        }
    };

    return (
        <div className="home-container">
            <Sibader />
            <div className="content">
                <h2 style={{ color: "#CC9900" }}>NOUVEL UTILISATEUR</h2>
                <form className='formtable' onSubmit={handleSubmit}>
                    <div>
                        <label>Civilité:</label>
                        <input
                            type="text"
                            name="civilite"
                            value={userData.civilite}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={userData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Prénom:</label>
                        <input
                            type="text"
                            name="firstname"
                            value={userData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Maison:</label>
                        <input
                            type="text"
                            name="maison"
                            value={userData.maison}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Droit Groupe:</label>
                        <input
                            type="text"
                            name="droitGroupe"
                            value={userData.droitGroupe}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Créer Utilisateur</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTable;
