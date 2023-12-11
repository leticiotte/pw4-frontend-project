import styled from 'styled-components';

export const PrincipalDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #582f0e;
  margin: 0;
`;

export const AddButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: black;

  &:hover {
    color: #cc0000;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      color: black;
    }
  }
`;

export const StudentsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  overflow-y: auto;
  flex: 1;
`;
