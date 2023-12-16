import styled from 'styled-components';

export const PrincipalDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const Table = styled.table`
  width: 90%;
  margin-top: 20px;
  border-spacing: 0;
  border: 1px solid black;
  border-radius: 3px;
  thead {
    background-color: #b6ad90;
  }
  tbody {
    text-align: center;
  }
  th,
  td {
    padding: 10px;
  }
  td {
    border-top: 1px solid black;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: black;

  &:hover {
    color: #a4ac86;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      color: black;
    }
  }
`;

export const DeleteButton = styled.button`
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
