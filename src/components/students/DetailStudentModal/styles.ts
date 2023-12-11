import styled from 'styled-components';

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

export const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  display: block;
  pointer-events: none;
`;

export const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  border-radius: 0.375rem;
  width: 60%;
  max-width: 600px;
  height: 70vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;

  &:hover {
    color: #a4ac86;
  }
`;

export const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

export const ModalContent = styled.div``;

export const SubjectsTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid black;
  thead {
    background-color: #a68a64;
  }
  tbody {
    text-align: center;
  }
`;

export const AddSubjectButton = styled.button`
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

export const DeleteSubjectButton = styled.button`
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
