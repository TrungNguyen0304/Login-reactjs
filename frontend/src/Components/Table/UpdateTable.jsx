import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sibader from '../inc/Sidebar';
import './CreateTable.css';

const UpdateTable = () => {
    const { id } = useParams(); // Get user ID from URL
    const [userData, setUserData] = useState({
        civilite: '',
        lastname: '',
        firstname: '',
        email: '',
        maison: '',
        droitGroupe: '',
        password: ''
    });

    const navigate = useNavigate();

    // Fetch user data when component mounts or id changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user); // Assume the response contains a user object
                } else {
                    console.error('Failed to fetch user data');
                    alert('Error fetching user data');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching user data.');
            }
        };

        fetchUserData();
    }, [id]); // Re-run effect if id changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                navigate('/User'); // Redirect after successful update
            } else {
                const data = await response.json();
                console.error(data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="home-container">
            <Sibader />
            <div className="content">
                <h2 style={{ color: "#CC9900" }}>METTRE À JOUR L'UTILISATEUR</h2>
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
                        <select
                            name="droitGroupe"
                            value={userData.droitGroupe}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Membre">Membre</option>
                            <option value="Administrateur">Administrateur</option>
                        </select>
                    </div>
                    <div>
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='Create-button' type="submit">Mettre à Jour Utilisateur</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTable;
