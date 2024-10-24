// Sibader.js
import React from 'react';
import './sidebar.css';
import { MdHome } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { Link } from 'react-router-dom';


const Sibader = () => {
    return (
        <div className='container1'>
            <div className='menu'>
                <ul>
                    <li>
                        <a href="#"><img src="/img/mask-group-8@2x.png" alt="" /></a>
                    </li>
                    <li>
                        <Link to="/Home"><MdHome style={{ fontSize: '30px' }} /></Link>
                    </li>
                    <li>
                        <Link to="/User"><img src="/img/mask-group-8-2@2x.png" alt="" /></Link>
                    </li>
                    <li>
                        <a href="#settings"><IoMdSettings style={{ fontSize: '30px' }} /></a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sibader;
