import styled from "styled-components"
import jason from "../../assets/imgs/jason_mamoa.gif"

const StyledUserAvatar = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-full);
`


export const UserAvatar = () => {
    {/* Upload image in webp and replace url  */}
    return (<StyledUserAvatar src={jason} alt="User avatar" />)
}