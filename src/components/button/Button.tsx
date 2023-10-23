import { ReactNode } from 'react'
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

const StyledButtonTransparent = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: transparent;
    color: var(--clr-text-secondary);
`

type ButtonProps = {
    variant?: "StyledButtonPill" | "StyledButtonTransparent",
    ariaLabel?: string, 
    onClick?: () => void,
    content: string | ReactNode
}

export const Button = ({variant, content, onClick, ariaLabel}:ButtonProps) =>{

    const variants = {
        StyledButtonPill,
        StyledButtonTransparent
    }

    const SelectedButton =  variant? variants[variant] : StyledButton

    return (
    onClick
    ? <SelectedButton aria-label={ariaLabel} onClick={onClick}>{content}</SelectedButton>
    : <SelectedButton aria-label={ariaLabel}>{content}</SelectedButton>
    )
    
}