import styled from "styled-components";

export const RecentGrid = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 45vw);
  grid-template-rows: repeat(2, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 0.2rem;
`;
