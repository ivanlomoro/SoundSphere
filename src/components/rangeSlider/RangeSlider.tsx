import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledRangeSliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 80%;
  margin-inline: auto;
`;

const StyledRangeSlider = styled.input.attrs<{ isMini?: boolean }>({
  type: "range",
})`
  -webkit-appearance: none;
  appearance: none;
  background-color: #535353;
  height: ${({ isMini }) => (isMini ? "2px" : "4px")};
  overflow: hidden;
  width: 100%;
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 4px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    z-index: 9;
    background: var(--clr-accent);
    border-radius: 50%;
    box-shadow: -800px 0 0 798px var(--clr-accent);
    cursor: pointer;
    height: 4px;
    width: 4px;
    border: 0;
  }

  &::-moz-range-thumb {
    background: #b3b3b3;
    border-radius: 50%;
    box-shadow: -410px 0 0 408px var(--clr-accent);
    cursor: pointer;
    height: 4px;
    width: 4px;
    border: 0;
  }

  &::-moz-range-track {
    background-color: #535353;
  }

  &::-moz-range-progress {
    background-color: #b3b3b3;
    height: 4px;
  }

  &::-ms-fill-upper {
    background-color: #535353;
  }

  &::-ms-fill-lower {
    background-color: #b3b3b3;
  }
`;

const StyledSpanThumb = styled.span<{
  thumbOffset: string;
  isMini?: boolean;
}>`
  position: absolute;
  left: ${({ thumbOffset }) => thumbOffset};
  width: ${({ isMini }) => (isMini ? "5px" : "10px")};
  height: ${({ isMini }) => (isMini ? "5px" : "10px")};
  transform: ${({ isMini }) => (isMini ? "translateY(-10%)" : "translateY(0)")};
  border-radius: 50px;
  z-index: 1;
  pointer-events: none;
  background: var(--clr-accent);
  opacity: 1;
`;

type RangeSliderProps = {
  maxValue: number;
  minValue: number;
  handleChange: (number: number) => void;
  value: number;
  isMini?: boolean;
};

const RangeSlider: FC<RangeSliderProps> = ({
  value,
  minValue,
  maxValue,
  handleChange,
  isMini,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [decimalValue, setDecimalValue] = useState<number>(0);
  const [inputRefWidth, setInputRefWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const inputWidth = window.getComputedStyle(inputRef.current).width;
    setInputRefWidth(parseInt(inputWidth.replace("px", "")));
  });

  useEffect(() => {
    if (maxValue > 1) {
      setDecimalValue((value * 1) / maxValue);
    } else {
      setDecimalValue(value);
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.value) handleChange(parseFloat(e.target.value));
  };

  const thumbOffset = isMini
    ? `${decimalValue * inputRefWidth!}px`
    : `${decimalValue * inputRefWidth! - 3}px`;

  return (
    <StyledRangeSliderContainer>
      <StyledRangeSlider
        ref={inputRef}
        type="range"
        onChange={handleInputChange}
        min={minValue}
        max={maxValue}
        step="0.01"
        value={value}
        isMini={isMini}
      />
      {inputRefWidth && (
        <StyledSpanThumb
          thumbOffset={thumbOffset}
          isMini={isMini}
        ></StyledSpanThumb>
      )}
    </StyledRangeSliderContainer>
  );
};

export default RangeSlider;
