import styled from 'styled-components';

export const StudentDiv = styled.div`
  background-color: #a4ac86;
  display: flex;
  flex-direction: column;
  border: 1px solid #333d29;
  padding: 1.75rem;
  border-radius: 0.375rem;
  height: fit-content;
`;

export const StudentName = styled.p`
  text-align: center;
`;

export const DetailButton = styled.button`
  font-size: 1em;
  margin: 1em;
  color: white;
  padding: 0.25em 1em;
  border: 2px solid #582f0e;
  border-radius: 3px;
  background-color: #7f4f24;

  &:hover {
    color: #1d1e18;
    background-color: #a68a64;
  }
`;

export const DeleteButton = styled.button`
  font-size: 1em;
  margin: 1em;
  color: white;
  padding: 0.25em 1em;
  border: 2px solid #582f0e;
  border-radius: 3px;
  background-color: #7f4f24;

  &:hover {
    color: #1d1e18;
    background-color: #a68a64;
  }
`;
