import React from 'react';
import './Table.css';

const TableSeach = ({ users }) => {
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
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user._id}>
                            <td>{user.civilite}</td>
                            <td>{user.lastname}</td>
                            <td>{user.firstname}</td>
                            <td>{user.email}</td>
                            <td>{user.maison}</td>
                            <td>{user.droitGroupe}</td>
                            <td>{user.lastConnection ? new Date(user.lastConnection).toLocaleString() : 'Chưa bao giờ'}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">Không tìm thấy kết quả nào.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableSeach;
