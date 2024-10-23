import React, { useEffect, useState } from 'react';
import './Table.css';

const Table = () => {
    const [users, setUsers] = useState([]); // Khởi tạo state để lưu danh sách người dùng
    const [loading, setLoading] = useState(true); // Khởi tạo state để theo dõi trạng thái tải

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users', {
                    method: 'GET',
                    credentials: 'include', // Nếu bạn cần gửi cookie
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        fetchUsers(); // Gọi hàm lấy dữ liệu
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {loading ? ( // Kiểm tra trạng thái tải
                        <tr>
                            <td colSpan="7">Loading...</td>
                        </tr>
                    ) : users.length > 0 ? ( // Kiểm tra nếu có người dùng
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
                            <td colSpan="7">Aucun utilisateur à afficher</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
