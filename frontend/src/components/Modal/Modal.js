import React from 'react';
import styled from 'styled-components';

const ModalConatiner = styled.div`
display: ${(props) => props.$isOpen ? "block" : "none"};
`;
const ModalContent = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 10px 20px;
maxWidth: 100%;
maxHeight: 90%;
overflowY: auto;
background-color: white;
`;
const ModalBackDrop = styled.div`
position: fixed;
top: 0;
left: 0;
right: 100vw;
bottom: 100vh;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.35);
`;

const Modal = (props) => {
    return (
        <ModalConatiner $isOpen={props.isOpen}>
            <ModalBackDrop onClick={props.closeModal}></ModalBackDrop>
            <ModalContent>
                <div>{props.children}</div>
                <button onClick={props.closeModal}>닫기</button>
            </ModalContent>
        </ModalConatiner>
    );
};

export default Modal;