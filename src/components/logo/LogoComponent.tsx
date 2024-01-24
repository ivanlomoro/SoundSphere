import styled from "styled-components";

const StyledImage = styled.img`
  width: 100px;
  height: 110px;
  margin-bottom: var(--space-sm);
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-size: var(--fs-xlg);
  font-weight: 500;
  font-family: var(--ff-primary);
  color: var(--cl-text-secondary);
`;

const StyledSlogan = styled.h3`
  font-size: var(--fs-md);
  font-weight: 500;
  font-family: var(--ff-primary);
  color: var(--cl-text-secondary);
`;

const StyledLogoComponent = styled.div`
  margin-bottom: 3rem;
`;

type LogoComponentProps = {
  textTitle: string;
  textSlogan?: string;
};

export const LogoComponent = ({
  textTitle,
  textSlogan,
}: LogoComponentProps) => {
  return (
    <StyledLogoComponent>
      <StyledImage src="https://res.cloudinary.com/dnmoqsjh7/image/upload/v1706093829/assets/iconoSound_rsuiny.jpg" alt="Icono Page" />
      <StyledTitle>{textTitle}</StyledTitle>
      <StyledSlogan>{textSlogan}</StyledSlogan>
    </StyledLogoComponent>
  );
};
