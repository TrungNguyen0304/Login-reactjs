    import React, { useEffect, useState } from 'react';
    import Sidebar from '../shared/sidebar';
    import { MdOutlineAddCircle } from "react-icons/md";
    import TableSeach from '../Table/TableSeach';
    import { FaUserTag } from "react-icons/fa6";
    import { Link } from 'react-router-dom';

    const SearchPage = () => {
        const [users, setUsers] = useState([]);
        const [query, setQuery] = useState('');
        const [loading, setLoading] = useState(true); // Thêm trạng thái tải

        useEffect(() => {
            const params = new URLSearchParams(window.location.search);
            const civilite = params.get('civilite');

            if (civilite) {
                setQuery(civilite);
                fetchUsers(civilite);
            }
        }, []);

        const fetchUsers = async (civilite) => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/search?civilite=${encodeURIComponent(civilite)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        return (
            <div className="home-container">
                <Sidebar />
                <div className="content">
                    <h1>Chercher des résultats pour: "{query}"</h1>
                    <div className="flex-container">
                        <div className="left-text">
                            <span className="large-text">Recherche</span>
                            <span> {'>'} </span>
                            <span className="faded-text">
                            Résultat</span>
                        </div>
                    </div>
                    <div className="right-text">
                        <div className='NOUVEL'>
                            <Link to="/CreateTable"><MdOutlineAddCircle />NOUVEL UTILISATEUR</Link>
                        </div>
                        <div className='GESTION'>
                            <Link to=""><FaUserTag />GESTION DES DROITS</Link>
                        </div>
                    </div>

                    {/* Sử dụng Table để hiển thị người dùng */}
                    {loading ? ( // Kiểm tra trạng thái tải
                        <p>Đang tải...</p>
                    ) : (
                        <TableSeach users={users} /> // Truyền danh sách người dùng vào Table
                    )}
                </div>
            </div>
        );
    };

    export default SearchPage;
