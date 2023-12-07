import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const open_modal = keyframes`
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
`;
const close_modal = keyframes`
    0% {
        opacity:1;
    }
    100% {
        opacity:0;
    }
`;

const ModalConatiner = styled.div`
display: ${(props) => props.state ? "block" : "none"};
font-family: "aggro";
color: #777;
animation: ${(props) => props.$isOpen ? open_modal : close_modal} 0.2s ease-in-out;
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
background-color: rgba(0, 0, 0, 0.7);
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
margin:0 5px;
`;
const ModalBtnContainer = styled.div`
display: flex;
width:100%;
justify-content: center;
`;

const Modal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let timer;

        if(props.isOpen)
            setIsModalOpen(true);
        else
            timer = setTimeout(() => setIsModalOpen(false), 180);

        return () => { clearTimeout(timer); }
    }, [props.isOpen]);

    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape")
            props.closeModal();
    });

    if(!isModalOpen) return null;

    return (
        <ModalConatiner $isOpen={props.isOpen} state={isModalOpen.toString()}>
            <ModalBackDrop onClick={props.closeModal}></ModalBackDrop>
            <ModalContent>
                <ModalTitle>{props.title}</ModalTitle>
                {props.children}
                <ModalBtnContainer>
                    {Object.keys(props).includes('customBtn') ?
                        props.customBtn()
                        :
                        undefined
                    }
                    <CloseBtn onClick={props.closeModal}>닫기</CloseBtn>
                </ModalBtnContainer>
            </ModalContent>
        </ModalConatiner>
    );
};

export default Modal;