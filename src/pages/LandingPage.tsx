import { useContext, useState } from 'react'
import './styles.css'
import { AuthContext } from '../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import { HOME } from '../routes/paths';



export function LandingPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    
    login(username);
    navigate(HOME); 

  };

  return (<>

    <div className="container green">
      <input className='form-input'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

      <button onClick={handleLogin}>Ferran Mierda</button>
    </div>
  </>
  )
}
