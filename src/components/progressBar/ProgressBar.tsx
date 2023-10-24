import styled from "styled-components"

type ProgressBarPropsType = {
    progress: {
        currentSeconds: number
        currentPercentage: number
        currentFormattedTime: string
    },
    duration: {
        duration: number
        formattedDuration: string
    }
}

const StyledProgressBar = styled.div`
    display: flex;
    flex-direction: column;
    width: var(--w-full);
`
const StyledProgress = styled.progress`
    margin-inline: auto;
    width: 80%;
    height: 2px;
    -webkit-appearance: none;
   appearance: none;

    &::-webkit-progress-bar {
        background-color: #888888; 
    }
    &::-webkit-progress-value {
        height: 5px;
        background-color: #fff; 
    }
`
const StyledAlignedItems = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-inline: auto;
`

export const ProgressBar = ({progress, duration}:ProgressBarPropsType) => {
    return (
            <StyledProgressBar>
            <StyledProgress value={progress.currentPercentage}/>
            <StyledAlignedItems>
                <p>{progress.currentFormattedTime}</p>
                <p>{duration.formattedDuration}</p>
            </StyledAlignedItems>
            </StyledProgressBar>
    )
}