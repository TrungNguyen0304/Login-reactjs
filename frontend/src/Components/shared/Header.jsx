import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className='container'>
            <div className='logo'>
                <Link to="/Home">
                    <img src="/img/premium-logo-black@3x.png" alt="Logo" />
                </Link>
            </div>

            <div className='right-section'>
                <div className='search'>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        style={{
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #CC9900',
                            outline: 'none',
                        }}
                    />
                    <button onClick={() => { /* Thêm chức năng tìm kiếm ở đây */ }}>
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
    )
}

export default Header