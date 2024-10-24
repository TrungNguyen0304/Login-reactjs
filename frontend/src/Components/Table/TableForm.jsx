import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';

const Table = () => {
    const [users, setUsers] = useState([]); // State to store user list
    const [loading, setLoading] = useState(true); // State to track loading
    const navigate = useNavigate(); // useNavigate for navigation

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users', {
                    method: 'GET',
                    credentials: 'include', // Include credentials if needed
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data); // Set user data
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchUsers(); // Fetch users on component mount
    }, []);

    // Function to delete a user
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                method: 'DELETE',
                credentials: 'include', // Include credentials if needed
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            // Update user list after deletion
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Civilité</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Adresse mail</th>
                        <th>Maison</th>
                        <th>Groupe de droits</th>
                        <th>Dernière connexion</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="8">Loading...</td>
                        </tr>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td onClick={() => navigate(`/UpdateTable/${user._id}`)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                    {user.civilite}
                                </td>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>{user.email}</td>
                                <td>{user.maison}</td>
                                <td>{user.droitGroupe}</td>
                                <td>{user.lastConnection ? new Date(user.lastConnection).toLocaleString() : 'Chưa bao giờ'}</td>
                                <td>
                                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Aucun utilisateur à afficher</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
