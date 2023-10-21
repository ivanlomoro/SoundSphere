import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 15rem;
    bottom: 0;
`;

type TermsContainerProps = {
    children: ReactNode;
}

export const TermsContainer = ({ children }: TermsContainerProps) => {
    return <Container>{children}</Container>;
};