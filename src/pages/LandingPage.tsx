import { useContext, useState } from 'react';
import './styles.css'
import { AuthContext } from '../context/authContext/authContext';
import { useNavigate } from 'react-router-dom';



export function LandingPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    login(username);
    navigate("/home"); 

  };

  return (<>

    <div className="container green">
      <input className='form-input'
            type="text"
            placeholder="Chanchito Feliz"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

      <button onClick={handleLogin}>Ferran Mierda</button>
    </div>
  </>
  )
}
