import styled from 'styled-components'

const StyledButton = styled.button`
    border-radius: var(--radius-md);
    border: none;
    background: var(--clr-accent);
    padding-block: .5em;
    color: var(--clr-text-secondary);
    font-size: var(--fs-lg);
    width: var(--w-full);
    margin-bottom: 1em;
`
const StyledButtonPill = styled(StyledButton)`
    background-color: var(--clr-bg-tertiary);
    padding-inline: 1em;
    width: fit-content;

    &&:focus{
        background-color: var(--clr-accent);
    }
`

const StyledButtonPlay = styled.button`
    border-radius: var(--w-full);
    border: none;
    background: var(--clr-bg-primary);
    color: var(--clr-text-secondary);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

type ButtonProps = {
    variant?: "StyledButtonPill" | "StyledButtonPlay",
    text: string
}

export const Button = ({variant, text}:ButtonProps) =>{

    const variants = {
        StyledButtonPill,
        StyledButtonPlay
    }

    const SelectedButton =  variant? variants[variant] : StyledButton

    return <SelectedButton>{text}</SelectedButton>
    
}