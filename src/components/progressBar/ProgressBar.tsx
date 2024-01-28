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
  mini?: boolean;
};

const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--space-xl);
  width: var(--w-full);
  cursor: pointer;
`;

const StyledMiniProgressBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
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
    background-color: #826f88;
  }

  &::-webkit-progress-value {
    height: 5px;
    background-color: var(--clr-accent);
  }

  border-radius: 20px;
`;

const StyledMiniProgress = styled.progress`
  margin-inline: auto;
  width: 96%;
  height: 3px;
  border-radius: 6px;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #bb00ff1f;
  }

  &::-webkit-progress-value {
    height: 5px;
    background-color: var(--clr-accent);
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
  mini?: boolean;
};

const Progress = ({ onClick, value, mini }: ProgressPropsType) => {
  const SelectedProgress = mini ? StyledMiniProgress : StyledProgress;

  return <SelectedProgress value={value} onClick={onClick} />;
};

export const ProgressBar = ({
  progress,
  duration,
  onClick,
  mini,
}: ProgressBarPropsType) => {
  const SelectedProgressbar = mini ? StyledMiniProgressBar : StyledProgressBar;

  return (
    <SelectedProgressbar>
      <Progress
        value={progress.currentPercentage}
        onClick={onClick}
        mini={mini}
      />
      {!mini && (
        <StyledAlignedItems>
          <p>{progress.currentFormattedTime}</p>
          <p>{duration.formattedDuration}</p>
        </StyledAlignedItems>
      )}
    </SelectedProgressbar>
  );
};
