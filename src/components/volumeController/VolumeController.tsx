import { Dispatch, FC, SetStateAction, useState } from "react";
import RangeSlider from "../rangeSlider/RangeSlider";
import { IoMdVolumeHigh, IoMdVolumeMute } from "react-icons/io";
import styled from "styled-components";

type VolumeControllerProps = {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
};

interface StyledMuteButtonType
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  volume: number;
}

const StyledVolumeController = styled.div`
  display: flex;
`;

const StyledVolumeButton = styled.button<StyledMuteButtonType>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.volume === 0 ? "var(--clr-text-primary)" : "var(--clr-accent)"};
`;

const VolumeController: FC<VolumeControllerProps> = ({ volume, setVolume }) => {
  const [lastVolume, setLastVolume] = useState(1);

  const handleMute = () => {
    if (volume === 0) {
      setVolume(lastVolume);
    }
    if (volume > 0) {
      setLastVolume(volume);
      setVolume(0);
    }
  };

  return (
    <StyledVolumeController>
      <StyledVolumeButton volume={volume} onClick={handleMute}>
        {volume == 0 ? (
          <IoMdVolumeMute size={20} />
        ) : (
          <IoMdVolumeHigh size={20} />
        )}
      </StyledVolumeButton>
      <RangeSlider
        minValue={0}
        maxValue={1}
        value={volume}
        handleChange={setVolume}
      />
    </StyledVolumeController>
  );
};
export default VolumeController;
