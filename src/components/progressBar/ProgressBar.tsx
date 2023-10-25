import styled from "styled-components";
import { CustomEventType } from "../playerDisplay/PlayerDisplay";

type ProgressBarPropsType = {
  progress: {
    currentSeconds: number;
    currentPercentage: number;
    currentFormattedTime: string;
  };
  duration: {
    duration: number;
    formattedDuration: string;
  };
  onClick: (event: CustomEventType) => void;
};

const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--space-xl);
  width: var(--w-full);
`;
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
`;
const StyledAlignedItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-inline: auto;
`;

type ProgressPropsType = {
  onClick: any;
  value: number;
};

const Progress = ({ onClick, value }: ProgressPropsType) => (
  <StyledProgress value={value} onClick={onClick} />
);

export const ProgressBar = ({
  progress,
  duration,
  onClick,
}: ProgressBarPropsType) => {
  return (
    <StyledProgressBar>
      <Progress value={progress.currentPercentage} onClick={onClick} />
      <StyledAlignedItems>
        <p>{progress.currentFormattedTime}</p>
        <p>{duration.formattedDuration}</p>
      </StyledAlignedItems>
    </StyledProgressBar>
  );
};
