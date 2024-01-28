import styled from "styled-components";
import RangeSlider from "../rangeSlider/RangeSlider";

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
  onChange: (position: number) => void;
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

const StyledAlignedItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-inline: auto;
`;

export const ProgressBar = ({
  progress,
  duration,
  onChange,
  mini,
}: ProgressBarPropsType) => {
  const SelectedProgressbar = mini ? StyledMiniProgressBar : StyledProgressBar;

  return (
    <SelectedProgressbar>
      <RangeSlider
        maxValue={1}
        minValue={0}
        value={progress.currentPercentage}
        handleChange={onChange}
        isMini={mini}
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
