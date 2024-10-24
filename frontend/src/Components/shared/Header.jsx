import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import './Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showLogout, setShowLogout] = useState(false);

    const handleSearch = () => {
        if (searchQuery) {
            window.location.href = `/search?civilite=${encodeURIComponent(searchQuery)}`;
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
                <img src="/img/premium-logo-black@3x.png" alt="Logo" />
            </div>

            <div className='right-section'>
                <div className='search'>
                    <input
                        type="text"
                        placeholder="Tìm kiếm civilité..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <img src="/img/picto-rechercher.png" alt="" />
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
