import styled from "styled-components"
import {IoIosArrowBack} from 'react-icons/io'
import { useNavigate } from "react-router-dom"

const StyledArrowBackSection = styled.div `
    display: flex;
    align-items: center;
    with: 100%;
    margin-right: 2em;
`

export const ArrowBackSection = () => {
    const navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1);
    }
    return (
        <StyledArrowBackSection>
            <button onClick={navigateBack}>
                <IoIosArrowBack />
            </button>
            
        </StyledArrowBackSection>
    )
}