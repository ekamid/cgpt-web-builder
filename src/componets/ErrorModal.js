import React from 'react';
import styled from 'styled-components';

// Styled components for the modal
const ErrorModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ErrorModalContent = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ErrorModalTitle = styled.h2`
  color: #f00;
`;

const ErrorModalMessage = styled.p`
  color: #333;
`;

const CloseButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const ErrorModal = ({ title, message, onClose }) => {
    return (
        <ErrorModalWrapper>
            <ErrorModalContent>
                <ErrorModalTitle>{title}</ErrorModalTitle>
                <ErrorModalMessage>{message}</ErrorModalMessage>
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ErrorModalContent>
        </ErrorModalWrapper>
    );
};

export default ErrorModal;
