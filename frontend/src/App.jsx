
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import { FaUserCircle } from "react-icons/fa";
function App() {


  return (
    <>
      <header >
        <div className='container'>
          <h2>PREMIUM</h2>
          <a href="/profile" style={{ textDecoration: 'none' }}>
            <FaUserCircle style={{ fontSize: '25px', marginLeft: '10px', color: '#CC9900' }} />
          </a>
        </div>

      </header>
      <LoginForm />
    </>
  )
}

export default App
