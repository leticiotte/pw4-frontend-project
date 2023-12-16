import styled from 'styled-components';

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  height: 100%;
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
  height: fit-content;
  max-height: 100vh;
  overflow: auto;
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

export const ModalContent = styled.div`
  max-height: 80vh;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
`;

export const FormLineDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  align-items: center;
`;

export const FormLabel = styled.label`
  padding-right: 10px;
  width: 250px;
`;

export const FormInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px 20px;
  margin: 8px 0;
`;

export const FormSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px 20px;
  margin: 8px 0;
`;

export const SelectOption = styled.option``;

export const FormInputSubmit = styled.input`
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      color: black;
      cursor: not-allowed;
    }
  }
`;
