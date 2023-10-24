
import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    cursor: pointer;
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
    }`

const StyledButtonPlay = styled.button`
    border-radius: var(--w-full);
    border: none;
    background: var(--clr-bg-primary);
    color: var(--clr-text-secondary);
    width: 17px;
    height: 17px;`
   
// Create positioned variant
const StyledInvisibleButton = styled(StyledButton)`   
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: var(--clr-text-secondary);
    border: none;
    padding: 1rem;
    width: fit-content;
    color: var(--clr-text-primary);
`

const StyledButtonNav = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--w-full);
    height: 60px;
    background: transparent;
    color: var(--clr-text-secondary);
    border: none;

    &:before{
        content: '';
        display: none;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 40%;
        background-color: var(--clr-accent);
        z-index: 1;
    }
`
const StyledButtonDisplayPlay = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 45px;
    width: 150px;
    height: 60px;
    background-color: var(--clr-accent);
    color: var(--clr-text-secondary);
    border: none;
    border-radius: var(--radius-full);
`

const StyledButtonDisplay = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    width: var(--w-full);
    height: 60px;
    background: transparent;
    color: var(--clr-text-secondary);
    border: none;
`


type ButtonProps = {
    variant?: "StyledButtonPill" | "StyledButtonNav" | "StyledButtonPlay" | "StyledInvisibleButton" | "StyledButtonDisplay" | "StyledButtonDisplayPlay",
    ariaLabel?: string, 
    onClick?: () => void,
    content?: string | ReactNode
}

export const Button = ({variant, content, onClick, ariaLabel}:ButtonProps) =>{
    const variants = {
        StyledButtonPill,
        StyledButtonNav,
        StyledButtonPlay,
        StyledInvisibleButton,
        StyledButtonDisplay,
        StyledButtonDisplayPlay
    }

    const SelectedButton =  variant? variants[variant] : StyledButton

    return (
    onClick
    ? <SelectedButton aria-label={ariaLabel} onClick={onClick}>{content}</SelectedButton>
    : <SelectedButton aria-label={ariaLabel}>{content}</SelectedButton>
    ) 
}