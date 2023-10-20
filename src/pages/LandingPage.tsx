import { useContext, useState } from 'react'
import './styles.css'
import { AuthContext } from '../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import { HOME } from '../routes/paths';



export const LandingPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    
    login(username);
    navigate(HOME); 

  };

  return (<>
<div className='layout'>
    <div >
      <img/>
      <h1>SoundSphere</h1>
      <h2>Bienvenido a SoundSphere</h2>
      <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
      

      <button onClick={handleLogin}>Ferran Mierda</button>
    </div>
    </div>
  </>
  )
}
