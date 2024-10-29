import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';

const TableSeach = ({ users, setUsers }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                method: 'DELETE',
                credentials: 'include', // Include credentials if needed
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            // Reload the page after deletion
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user._id}>
                            <td
                                className="clickable" // Use the clickable class
                                onClick={() => navigate(`/UpdateTable/${user._id}`)}
                            >
                                {user.civilite}
                            </td>
                            <td>{user.lastname}</td>
                            <td>{user.firstname}</td>
                            <td>{user.email}</td>
                            <td>{user.maison}</td>
                            <td>{user.droitGroupe}</td>
                            <td>{user.lastConnection ? new Date(user.lastConnection).toLocaleString() : 'Chưa bao giờ'}</td>
                            <td>
                                <div className='delete'><button className='deletebutton' onClick={() => deleteUser(user._id)}>Delete</button></div>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8">Không tìm thấy kết quả nào.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableSeach;
