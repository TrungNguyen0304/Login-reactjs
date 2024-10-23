import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng nhập thành công
        alert(data.message); // Có thể thay thế bằng thông báo khác
        navigate('/home'); // Sử dụng navigate để chuyển hướng
      } else {
        // Xử lý lỗi
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Lỗi kết nối đến máy chủ');
    }
  };

  return (
    <div className='wrapper'>
      <form className='formlogin' onSubmit={handleSubmit}>
        <h1>SE CONNECTER</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className='input-box'> 
          <p>E-mail</p>
          <input
            type='text'
            placeholder='Entrez l`email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-box'> 
          <p>Mot de passe</p>
          <input
            type='password'
            placeholder='Entrez le mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='b1'>
          <button type='submit'>SE CONNECTER</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
