import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

type RangeSliderProps = {
  maxValue: number;
  minValue: number;
  handleChange: (number: number) => void;
  value: number;
};

const RangeSlider: FC<RangeSliderProps> = ({
  value,
  minValue,
  maxValue,
  handleChange,
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

  return (
    <div>
      <input
        ref={inputRef}
        type="range"
        onChange={handleInputChange}
        min={minValue}
        max={maxValue}
        step="0.01"
        value={value}
      />
      <span
        style={{
          left: `${inputRefWidth && decimalValue * inputRefWidth - 3}px`,
        }}
      ></span>
    </div>
  );
};

export default RangeSlider;
