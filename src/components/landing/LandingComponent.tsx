import { useNavigate } from 'react-router-dom';
import { LogoComponent } from '../logo/LogoComponent'
import { Span } from '../span/Span'
import { LandingContainer } from './LandingContainer'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/authContext';
import { HOME } from '../../routes/paths';
import { Paragraph } from '../paragraph/Paragraph';
import { TermsContainer } from '../terms/TermsContainer';



export const LandingComponent = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext);
    const handleLogin = () => {

        login("SoundSphere");
        navigate(HOME);

    }
    return (
        <>
            <LandingContainer>
                <header>
                    <LogoComponent textTitle='SoundSphere' textSlogan='Be connected' />
                </header>
                <main>
                    <button onClick={handleLogin}>Registrarse</button>
                </main>
                <footer>
                    <TermsContainer>
                        <Paragraph text='Al crear la cuenta o iniciar sesión, aceptas los ' /><Span text='Términos y Condiciones legales' /><Paragraph text=' y la ' /><Span text='Política de Privacidad' />
                    </TermsContainer>
                </footer>
            </LandingContainer>
        </>


    )
}