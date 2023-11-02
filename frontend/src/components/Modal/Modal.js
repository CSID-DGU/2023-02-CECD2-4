import React from 'react';
import styled from 'styled-components';

const ModalConatiner = styled.div`
display: ${(props) => props.$isOpen ? "block" : "none"};
font-family: "aggro";
color: #777;
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
border-radius: 5px;
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
const ModalTitle = styled.div`
justify-self:flex-start;
font-size:25px;
font-weight: 700;
color: #444;
`;
const CloseBtn = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:120px;
height:40px;
font-family: "aggro";
font-weight: 500;
font-size:20px;
color:#444;
background-color: #888888;
text-decoration:none;;
transition: all 0.2s ease-in-out;
border-radius:10px;
&:hover {
    background-color: #ccc;
    transition: all 0.2s ease-in-out;
}
`;

const Modal = (props) => {
    return (
        <ModalConatiner $isOpen={props.isOpen}>
            <ModalBackDrop onClick={props.closeModal}></ModalBackDrop>
            <ModalContent>
                <ModalTitle>{props.title}</ModalTitle>
                <div>{props.children}</div>
                <CloseBtn onClick={props.closeModal}>닫기</CloseBtn>
            </ModalContent>
        </ModalConatiner>
    );
};

export default Modal;