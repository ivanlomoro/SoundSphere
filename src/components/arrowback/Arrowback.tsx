import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

const StyledArrowBackSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3em;
  position: absolute;
  left: 0;
`;

type Props = {
  onClick?: () => void;
};

export const ArrowBackSection = ({ onClick }: Props) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <StyledArrowBackSection>
      <Button
        content={<IoIosArrowBack />}
        onClick={onClick ? onClick : navigateBack}
        variant="StyledBackButton"
      />
    </StyledArrowBackSection>
  );
};
