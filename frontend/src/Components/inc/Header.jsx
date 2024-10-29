import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import './Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showLogout, setShowLogout] = useState(false);

    const handleSearch = () => {
        if (searchQuery) {
            window.location.href = `/search?firstname=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogout = () => {
        onLogout();
        setShowLogout(false);
    };

    const toggleLogoutVisibility = () => {
        setShowLogout(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showLogout && !event.target.closest('.icon')) {
                setShowLogout(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLogout]);

    return (
        <div className='container'>
            <div className='logo'>
                <a href="/home"> <img src="/img/premium-logo-black@3x.png" alt="Logo" /></a>

            </div>

            <div className='right-section'>
                <div className='search'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Nhập Prénom để tìm kiếm"
                        onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
                    />
                    <button onClick={handleSearch}>
                        <img src="/img/picto-rechercher.png" alt="Tìm kiếm" />
                    </button>
                </div>
                <div className='fr'>
                    <img src="/img/fr@2x.png" alt="" />
                    <p>Francais</p>
                </div>
                <div className='icon' style={{ position: 'relative' }}>
                    <a href="#" onClick={toggleLogoutVisibility} style={{ textDecoration: 'none' }}>
                        <FaUserCircle style={{ fontSize: '30px', marginLeft: '10px', color: '#CC9900' }} />
                    </a>
                    {showLogout && isAuthenticated && (
                        <div className="dropdown">
                            <button onClick={handleLogout} className="logout-button">
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
