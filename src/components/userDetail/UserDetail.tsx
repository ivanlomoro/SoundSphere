import {FiEdit} from 'react-icons/fi'
import styled from 'styled-components'
import { Button } from '../button/Button'

type UserDetailPropsType = {
    label: string,
    info: string
}

const StyledUserDetailContainer = styled.div`
    position: relative;
`

const StyledDetailLabel = styled.p`
    font-weight: var(--weight-semibold);
`

const StyledDetailInfo = styled.p`
    font-weight: var(--weight-bold);
    color: var(--clr-text-secondary);
`


export const UserDetail = ({ label, info }:UserDetailPropsType) => {
    return (
    <StyledUserDetailContainer>
        <StyledDetailLabel>{label}</StyledDetailLabel>
        <StyledDetailInfo>{info}</StyledDetailInfo>
        <Button 
            content={<FiEdit />}
            variant='StyledInvisibleButton'
            />
    </StyledUserDetailContainer>
    )
}