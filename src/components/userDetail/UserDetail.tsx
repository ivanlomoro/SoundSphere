import styled from "styled-components";

type UserDetailPropsType = {
  label: string;
  info: string | undefined;
};

export const StyledUserDetailContainer = styled.div`
  position: relative;
`;

export const StyledDetailLabel = styled.p`
  font-weight: var(--weight-semibold);
`;

export const StyledDetailInfo = styled.p`
  font-weight: var(--weight-bold);
  color: var(--clr-text-secondary);
`;

export const UserDetail = ({ label, info }: UserDetailPropsType) => {
  if (!info) return null;
  return (
    <StyledUserDetailContainer>
      <StyledDetailLabel>{label}</StyledDetailLabel>
      <StyledDetailInfo>{info}</StyledDetailInfo>
    </StyledUserDetailContainer>
  );
};
