import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery) {
            // Only search by civilite
            window.location.href = `/search?civilite=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className='container'>
            <div className='logo'>
                <a href="/Home">
                    <img src="/img/premium-logo-black@3x.png" alt="Logo" />
                </a>
            </div>

            <div className='right-section'>
                <div className='search'>
                    <input
                        type="text"
                        placeholder="Tìm kiếm civilité..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #CC9900',
                            outline: 'none',
                        }}
                    />
                    <button onClick={handleSearch}>
                        <img src="/img/picto-rechercher.png" alt="" />
                    </button>
                </div>
                <div className='fr'>
                    <img src="/img/fr@2x.png" alt="" />
                    <p>Francais</p>
                </div>
                <div className='icon'>
                    <a href="/LoginForm" style={{ textDecoration: 'none' }}>
                        <FaUserCircle style={{ fontSize: '30px', marginLeft: '10px', color: '#CC9900' }} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
