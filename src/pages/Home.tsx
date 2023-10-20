import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext/authContext';
import { useContext } from 'react';
import './styles.css'
import songImage from '../assets/imgs/songimage.png'

import { USERPAGE } from '../routes/paths';

export const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const imageClick = () => {
    navigate(USERPAGE)

  }
  return (<>
    <div className="layout">
    <nav>
      <img src='https://img.icons8.com/ios/35/FFFFFF/user--v1.png' className='userIcon' onClick={imageClick}/>
      < p>Welcome back, {user && user?.name + " !" || 'Guest'}</p>
      <img src='https://img.icons8.com/ios/35/FFFFFF/remove-user-male.png' onClick={handleLogout} className="userIcon"/> 
      </nav>
      
      
      <div className='carousel'>
              <h1>Carousel</h1>
      <div className= 'carouselBody'>
        
        <div className='carouselObject'>
          <img src={songImage} className='carouselImage'/>
        <div className='carouselText'>
        <p className='songTitle'>Song Title</p>
        <p className='songDescription'>Song Description</p>
        </div>
        </div>
        
        </div>
    
      </div>
   
     

</div>
</>
  )
}
// Welcome back, {user && user?.name + " !" || 'Guest'}